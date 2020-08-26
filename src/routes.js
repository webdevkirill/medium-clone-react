import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { GlobalFeed } from './pages/globalFeed/GlobalFeed';
import { Article } from './pages/article/Article';
import { Auth } from './pages/auth/Auth';
import { TagFeed } from './pages/tagFeed/TagFeed';
import { YourFeed } from './pages/YourFeed/YourFeed';
import { CreateArticle } from './pages/CreateArticle/CreateArticle';
import { EditArticle } from './pages/EditArticle/EditArticle';
import { Settings } from './pages/settings/Settings';
import { UserProfile } from './pages/UserProfile/UserProfile';

export const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={GlobalFeed} />
            <Route path='/settings'  component={Settings} />
            <Route path='/articles/new' component={CreateArticle} />
            <Route path='/articles/:slug/edit' component={EditArticle} />
            <Route path='/login' component={Auth} />
            <Route path='/register' component={Auth} />
            <Route path='/tags/:slug' component={TagFeed} />
            <Route path='/feed' component={YourFeed} />
            <Route path='/articles/:slug' component={Article} />
            <Route path='/profiles/:slug' component={UserProfile} />
            <Route path='/profiles/:slug/favorites' component={UserProfile} />
        </Switch>
    )
}