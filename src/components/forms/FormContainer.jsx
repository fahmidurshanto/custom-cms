import React from 'react';

const FormContainer = ({
  title,
  subtitle,
  children,
  className = '',
  onSubmit = (e) => e.preventDefault(),
  ...props
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-100">
          {title && (
            <h2 className="text-xl font-semibold text-gray-800">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={`p-6 ${className}`} {...props}>
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
