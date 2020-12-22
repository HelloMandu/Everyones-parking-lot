import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
/* Library */

import FindPage from './auth/find/FindPage';
/* Pages */

import LoginContainer from '../containers/auth/LoginContainer';
import SignInContainer from '../containers/auth/SignInContainer';
import SignUpContainer from '../containers/auth/SignUpContainer';
import EnrollCarContainer from '../containers/auth/EnrollCarContainer';
import SignCompleteContainer from '../containers/auth/SignCompleteContainer';

/* Containers */

/* Components */

import { Paths } from '../paths'

const AuthPage = () => {
    const history = useHistory()
    const token = localStorage.getItem('user_id')
    if(token !== null) history.replace(Paths.main.index)

    return (
        <div>
            <Switch>
                <Route path={Paths.auth.login} component={LoginContainer} />
                <Route path={Paths.auth.signin} component={SignInContainer} />
                <Route path={Paths.auth.signup + '/:modal?'} component={SignUpContainer} />
                <Route path={Paths.auth.enrollment} component={EnrollCarContainer} />
                <Route path={Paths.auth.sign_complete} component={SignCompleteContainer} />
                <Route path={Paths.auth.find.index + '/:type?'} component={FindPage} />
                <Route render={({ history }) => history.replace(Paths.auth.login)} />
            </Switch>
        </div>
    );
};

export default AuthPage;
