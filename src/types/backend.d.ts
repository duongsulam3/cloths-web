import { Key } from "readline";

interface Banner {
  idBanner: string;
  img: string;
  caption: string;
}

interface Cloth {
  idCloth: string;
  name: string;
  img: Array[string];
  price: number;
  oldPrice: number;
  sale: string;
  sold: number;
  description: string;
  currency: string;
  category: string;
}

interface SizesCloth {
  idSize: number;
  isSelected: boolean;
  size: string;
}

interface User {
  userID: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  phoneNumber: number;
  email: string;
  password: string;
  city: string;
  address: string;
  favoriteCloth: Array[];
}
