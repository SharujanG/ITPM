import React from 'react';
import {Link} from 'react-router-dom';
import css from '../styles/NavBar.module.css';

function NavBar() {
    return (
        <div className={css.body}>
            <Link to='/' className={css.logo}>Smart City</Link>
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button> */}
           <nav className={css.navigation}>
    <Link to='/'>Home</Link>                       
  <Link to='/pets'>Pets</Link>
  
  
  <Link to='/register' className={`${css.blinkButton} ${css.outlineButton} `}>Register</Link> 
  <Link to='/login' className={`${css.blinkButton} ${css.outlineButton} `}>Login</Link>  
</nav>
</div>
    )
}

export default NavBar;