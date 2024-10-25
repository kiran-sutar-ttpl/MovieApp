import React from 'react';
import './input.scss';

interface InputProps {
  id:string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // For additional custom styles
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ id ,type = 'text', placeholder, value, onChange, className, required = false }) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input ${className}`}
      required={required}
      autoComplete={'off'} 
    />
  );
};

export default Input;
