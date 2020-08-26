import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../context/currentUser';

export const TopBar = () => {

    const [currentUserState] = useContext(CurrentUserContext);

    return (
        <nav className='navbar navbar-light'>
            <div className='container'>
                <Link to='/' className='navbar-brand'>
                    Medium
                </Link>
                <ul className='nav navbar-nav pull-xs-right'>
                    <li className='nav-item'>
                        <NavLink to='/' className='nav-link' exact>
                            Home
                        </NavLink>
                    </li>
                    {
                        !currentUserState.isLoggenIn ? 
                        <>
                            <li className='nav-item'>
                                <NavLink to='/login' className='nav-link'>
                                    Sign In
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/register' className='nav-link'>
                                    Sign Up
                                </NavLink>
                            </li>
                        </> : 
                        <>
                            <li className='nav-item'>
                                <NavLink to='/articles/new' className='nav-link'>
                                    <i className='ion-compose'/>&nbsp;New Post
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/settings' className='nav-link'>
                                    <i className='ion-gear-a'/>&nbsp;Settings
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to={`/profiles/${currentUserState.currentUser.username}`} className='nav-link'>
                                    <img 
                                    className='user-pic' 
                                    src={currentUserState.currentUser.image}
                                    alt='' />
                                    &nbsp; {currentUserState.currentUser.username}
                                </NavLink>
                            </li>
                        </>
                    }
                    
                </ul>
            </div>
        </nav>
    )
}