import React from 'react';
import './checkbox.css'; 

const Checkbox = ({ checked }) => {
  return (
    <div className={`checkbox ${checked ? 'checked' : 'unchecked'}`}>
      {checked ? <span style={{ color: 'black', fontSize: '16px' }}>✔️</span> : ''}
    </div>
  );
};

export default Checkbox;
