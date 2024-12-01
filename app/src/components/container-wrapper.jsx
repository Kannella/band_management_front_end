import React from 'react';

const ContainerWrapper = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
};

export default ContainerWrapper;
