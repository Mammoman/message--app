import React, { useState, useEffect } from 'react';

const Appearance = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="appearance-settings">
      <h3>Appearance Settings</h3>
      <label>Theme</label>
      <select value={theme} onChange={toggleTheme}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <label>Font Size</label>
      <select>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <button onClick={toggleTheme}>Save changes</button>
    </div>
  );
};

export default Appearance;