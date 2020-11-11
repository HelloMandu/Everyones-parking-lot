import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

import DialogContainer from './containers/assets/DialogContainer';
import LoadingContainer from './containers/assets/LoadingContainer';

import { Paths } from './paths';

const App = () => {
    return (
        <>
            <Switch>
                <Route exact path={Paths.main.index} component={MainPage} />
                <Route path={Paths.auth.index} component={AuthPage} />
                <Route component={ErrorPage} />
            </Switch>
            <DialogContainer />
            <LoadingContainer />
        </>
    );
};

export default App;
