import React from "react";
import PropTypes from "prop-types";

const SecondaryButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        "bg-blue-500 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"}>
      {children}
    </button>
  );
};

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SecondaryButton;