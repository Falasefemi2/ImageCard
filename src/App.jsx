import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";
import { ClipLoader } from "react-spinners";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=${
          import.meta.env.VITE_PIXABAY_API_KEY
        }&q=${term}&image_type=photo&pretty=true`
      )
      .then(({ data }) => {
        setImages(data.hits);
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [term]);

  return (
    <div className="container mx-auto">
    <ImageSearch searchText={(text) => setTerm(text)} />
    {isLoading && images.length === 0 && (
      <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>
    )}
    {isLoading ? (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#36D7B7" loading={isLoading} size={150} />
      </div>
    ) : (
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    )}
  </div>
  );
};

export default App;
