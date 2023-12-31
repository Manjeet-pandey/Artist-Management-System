const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center my-4">
      <ul className="inline-flex space-x-2">
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {page}
            </button>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
