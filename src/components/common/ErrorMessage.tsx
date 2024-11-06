import React from 'react';
import './ErrorMessage.css';
import { MessageProps } from '../../types/satellite';

const ErrorMessage: React.FC<MessageProps> = React.memo(({ message }) => (
  <div className="error-message" role="alert">
    {message}
  </div>
));

export default ErrorMessage;