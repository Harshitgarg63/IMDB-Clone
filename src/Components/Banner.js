import React from "react";

const Banner = () => {
  return (
    <div
      className="h-[60vh] md:h-[80vh] lg:h-[90vh] bg-center bg-cover flex flex-col justify-end p-6 bg-no-repeat transition-all duration-300"
      style={{
        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaVSWCaGAWiUF0P3OPwKFomwBtcc77AGc35w&s)`,
      }}
    >
      <div className="bg-black bg-opacity-50 p-4 rounded-lg text-white text-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          Welcome to Our Movie Collection
        </h1>
        <p className="text-sm md:text-lg mt-2">
          Discover amazing movies and add to your watchlist!
        </p>
      </div>
    </div>
  );
};

export default Banner;
