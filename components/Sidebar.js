import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Sidebar.module.scss';

const Sidebar = ({ changeComponent }) => {
  const handleItemClick = (component) => {
    changeComponent(component);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.mobileIcons}> 
  <div className={styles.iconTextWrapper}onClick={() => handleItemClick('list')}>
    <FontAwesomeIcon icon={faList} className={styles.mobileIcon}  />
    <span className={styles.itemText2}>Liste</span>
  </div>
  
  <div className={styles.iconTextWrapper}onClick={() => handleItemClick('create')}>
    <FontAwesomeIcon icon={faPlus} className={styles.mobileIcon}  />
    <span className={styles.itemText2}>Yeni</span>
  </div>
</div>
      <nav className={styles.myNav}>
        <ul>
          <li className={styles.myHome} onClick={() => handleItemClick('list')}>
            <a>
            <span className={styles.itemText}>Kampanya Listesi</span>
              <FontAwesomeIcon icon={faList} className={styles.icon} />
            </a>
          </li>
          <li className={styles.myEvent} onClick={() => handleItemClick('create')}>
            <a>
            <span className={styles.itemText}>Yeni Kampanya</span>
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
