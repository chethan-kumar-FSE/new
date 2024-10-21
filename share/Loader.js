const Loader = () => {
  const loaderStyle = {
    display: 'inline-block',
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    borderTopColor: '#3498db',
    animation: 'spin 1s ease-in-out infinite',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  return (
    <div style={containerStyle}>
      <div style={loaderStyle}></div>
      <style>
        {`
            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}
      </style>
    </div>
  );
};

export default Loader;
