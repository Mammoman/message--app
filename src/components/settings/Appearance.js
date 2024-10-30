
import React from 'react';

const Appearance = () => {
  return (
    <div className="appearance-settings">
      <h3>Appearance Settings</h3>
      <label>Theme</label>
      <select>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <label>Font Size</label>
      <select>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <button>Save changes</button>
    </div>
  );
};

export default Appearance;