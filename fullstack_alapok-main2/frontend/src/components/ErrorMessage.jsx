import React from 'react';

function ErrorMessage({ error }) {
  return <p style={{ color: 'red' }}>{error}</p>;
}

export default ErrorMessage;
