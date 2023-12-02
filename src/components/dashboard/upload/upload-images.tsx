import { storage } from "@/config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { useState } from "react";
import { Button, Form, Image, ProgressBar } from "react-bootstrap";

const UploadBannerImage = () => {
  const [imgFile, setImgFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  //   console.log(imgFile);

  const handleSelectedFile = (files: any) => {
    if (files[0].size < 1000000000) {
      setImgFile(files[0]);
    } else {
      console.log("File too large");
    }
  };

  const handleUploadFile = () => {
    setIsUploading(true);
    if (imgFile) {
      try {
        const name = imgFile.name;
        const imgRef = ref(storage, `/images/banners/${name}`);
        const uploadTask = uploadBytesResumable(imgRef, imgFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressUpload(progress);
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setDownloadURL(url);
              setIsUploading(false);
            });
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="upload-div">
      <Form.Label>Upload Banner Image</Form.Label>
      <Form.Control
        type="file"
        id="myFile"
        accept="image/png/jpg"
        placeholder="Select file to upload"
        onChange={(files: any) => handleSelectedFile(files.target.files)}
      />
      <Button onClick={handleUploadFile}>Upload</Button>

      {isUploading ? (
        <ProgressBar
          now={progressUpload}
          label={`${progressUpload}%`}
          style={{ marginTop: "10px" }}
        />
      ) : (
        downloadURL && (
          <div className="upload-success-div">
            <Image
              alt={downloadURL}
              src={downloadURL}
              style={{
                minWidth: "200px",
                maxWidth: "30vw",
                minHeight: "200px",
                maxHeight: "30vh",
              }}
            />
            <div>{downloadURL}</div>
          </div>
        )
      )}
    </div>
  );
};

export default UploadBannerImage;
