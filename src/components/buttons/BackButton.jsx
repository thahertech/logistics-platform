import { ArrowLeft } from "lucide-react";

const BackButton = ({ label = "Takaisin", className = "", onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 
        font-medium py-2 px-4 rounded transition duration-200
        ${disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-black hover:text-white text-black'}
        ${className}
      `}
    >
      <ArrowLeft size={18} />
      {label}
    </button>
  );
};

export default BackButton;