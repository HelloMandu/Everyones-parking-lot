import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

import DialogContainer from './containers/assets/DialogContainer';
import LoadingContainer from './containers/assets/LoadingContainer';
import BasicButton from './components/button/BasicButton';

import { Paths } from './paths';

const App = () => {
    return (
        <>
            <Switch>
                <Route path={Paths.auth.index} component={AuthPage} />
                <Route path={Paths.main.index} component={MainPage} />
                <Route component={ErrorPage} />
            </Switch>
            <DialogContainer />
            <LoadingContainer />
            <BasicButton/>
        </>
    );
};

export default App;
