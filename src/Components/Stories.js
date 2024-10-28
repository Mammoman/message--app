import React from 'react';
import '../Styles/Stories.css';

function Stories({ users }) {
  return (
    <div className="stories-container">
      {users.map((user, index) => (
        <div className="story" key={index}>
          <div className="story-image"></div>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Stories;
