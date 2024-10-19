import React from "react";

const InputGroup = ({
  iconSrc,
  placeholder,
  value,
  onChange,
  type = "text",
  className,
  name,
}) => {
  return (
    <>
      <img src={iconSrc} alt={`${placeholder} Icon`} className={className} />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default InputGroup;
