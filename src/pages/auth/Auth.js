import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CurrentUserContext } from '../../context/currentUser';
import { BackendErrorMessages } from '../../components/BackendErrorMessages/BackendErrorMessages';
import { SET_AUTORIZED } from '../../context/types';

export const Auth = (props) => {

    

    const isLogin = props.match.path === '/login';

    const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
    const descrLink = isLogin ? '/register' : '/login';
    const descrText = isLogin ? 'Need an account?' : 'Have an account?';
    const apiUrl = isLogin ? '/users/login' : '/users';
    
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);
    const [, setToken] = useLocalStorage('token');

    const [, dispatch] = useContext(CurrentUserContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = isLogin ? {email, password} : {email, password, username}
        doFetch({
            method: 'post',
            data: {
                user
            }
        });
    }

    useEffect(() => {
        if (!response) {
            return 
        }

        setToken(response.user.token);
        setIsSuccessfulSubmit(true);
        dispatch({
            type: SET_AUTORIZED,
            payload: response.user
        })
    }, [response, setToken, dispatch])


    if (isSuccessfulSubmit) {
        return <Redirect to='/' />
    }

    return (
        <div className='auth-page'>
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1 className='text-xs-center'>{pageTitle}</h1>
                        <p className='text-xs-center'>
                            <Link to={descrLink}>{descrText}</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            {error ? <BackendErrorMessages backendErrors={error.errors} /> : null}
                            <fieldset>
                                {
                                    !isLogin ? 
                                    <fieldset className='form-group'>
                                        <input 
                                            type='text' 
                                            className='form-control form-control-lg' 
                                            placeholder='Username' 
                                            value={username}
                                            onChange={(event) => setUserName(event.target.value)}
                                        />
                                    </fieldset> : null
                                }
                                <fieldset className='form-group'>
                                    <input 
                                        type='email' 
                                        className='form-control form-control-lg' 
                                        placeholder='Email' 
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input 
                                        type='password' 
                                        className='form-control form-control-lg' 
                                        placeholder='Password' 
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </fieldset>
                                <button 
                                className='btn btn-lg btn-primary pull-xs-right' 
                                type='submit'
                                disabled={isLoading}
                                >{pageTitle}</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}