import React from "react";

const Pagination = (props) => {
  let { pageNumProp, onNextProp, onPrevProp } = props;

  return (
    <div className="flex justify-center items-center my-4 space-x-2">
      {/* Previous Button */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-l-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200 disabled:opacity-50"
        onClick={onPrevProp}
        disabled={pageNumProp === 1} // Disable if on the first page
      >
        Prev
      </button>

      {/* Current Page Number */}
      <div className="bg-blue-400 text-white py-2 px-4 rounded-md text-center">
        {pageNumProp}
      </div>

      {/* Next Button */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
        onClick={onNextProp}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;