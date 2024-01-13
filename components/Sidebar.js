import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Sidebar.module.scss';

const Sidebar = ({ changeComponent }) => {
  // Initialize isVisible to false since we can't determine the window width on the server
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Update the state to reflect the current window width
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 768);
    };
    
    // Set the initial state based on the window width
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleItemClick = (component) => {
    changeComponent(component);
    // Since this function will only be called from the client-side, it's safe to use window here
    if (window.innerWidth < 768) {
      setIsVisible(false);
    }
  };

  // Use a className to control the visibility of the sidebar
  const sidebarClass = isVisible ? styles.visible : '';

  return (
    <>
      <button className={styles['sidebar-button']} onClick={toggleVisibility}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`${styles.sidebar} ${sidebarClass}`}>
        <ul>
          <li onClick={() => handleItemClick('list')}>
            <FontAwesomeIcon icon={faList} />
            Campaign Listing
          </li>
          <li onClick={() => handleItemClick('create')}>
            <FontAwesomeIcon icon={faPlus} />
            Create Campaign
          </li>
          {/* Add more items as needed */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
