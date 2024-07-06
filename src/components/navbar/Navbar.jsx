// src/components/Navbar/Navbar.jsx
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const handleClear = () => {
    localStorage.removeItem('userData');
    window.location.reload();
  }


  return (
    <>
      <div className={styles.navbarParent}>
        <div className={styles.navbarLogo} >🎬🎥</div>
        <a className={styles.area} href={"/"}> <div className={styles.navbarTitle} >THE MOVIE CATALOG</div></a>
        <div className={styles.bDiv}>
          <button className={styles.navbarButton} onClick={handleClear}>LogOut</button>
          <div className={styles.navbarLinks}>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};



export default Navbar;
