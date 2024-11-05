// src/components/common/ErrorMessage.tsx
import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="error-message" role="alert">
    {message}
  </div>
);

export default ErrorMessage;