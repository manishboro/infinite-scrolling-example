import React from "react";

const CustomButton = ({ handleClick, logo, children }) => {
  return (
    <button onClick={handleClick}>
      {logo} {children}
    </button>
  );
};

export default CustomButton;
