/*global Kakao*/
import React, { useEffect, useCallback } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import dotenv from 'dotenv';

import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

import RenderHeader from './components/header/RenderHeader';
import DialogContainer from './containers/assets/DialogContainer';
import LoadingContainer from './containers/assets/LoadingContainer';
import IntroContainer from './containers/main/IntroContainer';

import { Paths } from './paths';
import { useDispatch } from 'react-redux';
import { getUser } from './store/user';
import { getCompany } from './store/company';

import SnackBar from './components/assets/SnackBar';
import './App.scss';
dotenv.config();

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { pathname } = location;

    const judgementLogin = useCallback(() => {
        const token = localStorage.getItem('user_id');
        if (token) {
            dispatch(getUser(token));
        }
    }, [dispatch]);

    const callAppInfo = useCallback(() => {
        dispatch(getCompany());
    }, [dispatch]);

    useEffect(() => {
        if(!Kakao.isInitialized()){
            Kakao.init(process.env.REACT_APP_KAKAO_REST);
        }
        judgementLogin();
        callAppInfo();
    }, [callAppInfo, judgementLogin]);

    const visited = localStorage.getItem('SpaceStation_visited');

    return visited ? (
        <div className="App">
            <RenderHeader pathname={pathname}/>
            <Switch>
                <Route path={Paths.auth.index} component={AuthPage} />
                <Route path={Paths.index} component={MainPage} />
                <Route component={ErrorPage} />
            </Switch>
            <DialogContainer />
            <LoadingContainer />
            <SnackBar/>
        </div>
    ) : (
            <IntroContainer />
        );
};

export default App;
