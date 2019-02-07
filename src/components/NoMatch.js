import React from 'react';

export default function NoMatch() {
  const styleOfNoMatch = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#789EFE',
    width: '340px',
    height: '538px',
    fontSize: '30px',
  }

  return (
    <div style={styleOfNoMatch}>
      404 NOT FOUND
    </div>
  );
}
