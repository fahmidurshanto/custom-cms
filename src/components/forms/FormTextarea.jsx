import React from 'react';

const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  rows = 3,
  error,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-2 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500'
        } focus:ring-2 focus:ring-indigo-200 outline-none transition duration-200 resize-none`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormTextarea;
