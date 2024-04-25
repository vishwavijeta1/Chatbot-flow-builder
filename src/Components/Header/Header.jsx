import React from 'react';

const Header = ({ onSaveChanges }) => {
  return (
    <div className='header'>
      <h1>Chatbot flow builder</h1>
      <button className='save-node-button' onClick={onSaveChanges}>Save Changes</button>
    </div>
  );
};

export default Header;
