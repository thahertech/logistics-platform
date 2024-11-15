import React from 'react';

const TextInput = ({ label, value, onChange }) => (
  <div>
    <label>{label}</label>
    <input
      type="text"
      className="w-full p-2 mb-4 border rounded"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextInput;
