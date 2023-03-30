import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  handleClear
}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-medium to-gray-900'>
          {labelName}
        </label>
        {isSurpriseMe && (
          <>
          <button
            type='button'
            onClick={handleSurpriseMe}
            className='font-semibold text-xs text-white bg-[#6339ff] bg-opacity-90 py-1 px-2 rounded-lg'
          >
            Surprise Me
          </button>
        <button
        className='font-semibold text-xs text-gray-900 bg-[#e7e7e7] bg-opacity-90 py-1 px-2 rounded-lg'
        onClick={handleClear}
        >
          Clear
        </button>
          
          </>
        )}
      </div>
      <input
        className='input-primary'
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default FormField;
