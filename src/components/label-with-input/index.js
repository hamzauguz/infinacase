import React from "react";
import "./Styles.LabelWithInput.css";

const LabelWithInput = ({ labelTitle, value, onChange, type, name }) => {
  return (
    <div className="label-with-input-container">
      <span className="label-lwic">{labelTitle}</span>
      <input
        name={name}
        type={type}
        className="input-style"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default LabelWithInput;
