import React, { useState, useEffect } from 'react';
import './sidebar.css';

const Sidebar = () => {
  const [resume, setResume] = useState('');

  useEffect(() => {
    fetch('/api/parties/resume')
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setResume(data.resume);
        }
      })
      .catch((err) => console.log('no answer from server', err));
  }, []);
  return (
    <aside className="sidebarConteiner">
      <div className="asideContent">{resume}</div>
    </aside>
  );
};

export default Sidebar;
