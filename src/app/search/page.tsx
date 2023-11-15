import { Suspense } from "react";

import SearchPageComponent from "@/components/search-page";

const SearchPage = () => {
  const Loading = () => {
    return <div>Loading</div>;
  };
  return (
    <Suspense fallback={<Loading />}>
      <SearchPageComponent />
    </Suspense>
  );
};

export default SearchPage;
