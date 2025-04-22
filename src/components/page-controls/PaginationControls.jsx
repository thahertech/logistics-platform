const PaginationControls = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-between items-center w-1/3 mt-4 text-white">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
      >
        ← Edellinen
      </button>
      <span className="text-sm">Sivu {currentPage} / {totalPages}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
      >
        Seuraava →
      </button>
    </div>
  );
  
  export default PaginationControls;