
import React from 'react';
import '../../styles/settings/Profile.css';

const Profile = () => {
  return (
    <div className="profile-settings">
      <h3>Profile picture</h3>
      <div className="profile-picture">
        <img src="/path/to/profile.jpg" alt="Profile" />
        <button>Change picture</button>
        <button>Delete picture</button>
      </div>
      <label>Profile name</label>
      <input type="text" defaultValue="Dayniel" />
      <label>Username</label>
      <input type="text" defaultValue="@ddd" />
      <label>Available change in</label>
      <input type="text" defaultValue="25/04/2024" disabled />
      <label>Status recently</label>
      <input type="text" defaultValue="On duty" />
      <label>About me</label>
      <textarea defaultValue="What can I say? bllh bllh" />
      <button>Save changes</button>
    </div>
  );
};

export default Profile;