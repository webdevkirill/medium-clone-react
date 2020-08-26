import React from 'react';
import { Routes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { TopBar } from './components/TopBar/TopBar';
import { CurrentUserPrivider } from './context/currentUser';
import { CurrentUserChecker } from './components/CurrentUserChecker/CurrentUserChecker';

function App() {
    return (
        <CurrentUserPrivider>
            <CurrentUserChecker>
                <BrowserRouter basename='medium-clone-react' >
                    <TopBar/>
                    <Routes/>
                </BrowserRouter>
            </CurrentUserChecker>
        </CurrentUserPrivider>
    );
}

export default App;
