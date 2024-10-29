import React from 'react';

const QuickAccess = ({ users }) => {
  return (
    <div className="quick-access">
      {users.map(user => (
        <div key={user.id} className="quick-access-item">
          <div className="avatar">
            <div className={`status ${user.isOnline ? 'online' : ''}`}></div>
          </div>
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default QuickAccess;