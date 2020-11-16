import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

import DialogContainer from './containers/assets/DialogContainer';
import LoadingContainer from './containers/assets/LoadingContainer';

// import Header from './components/header/Header';

import { Paths } from './paths';


//  develop 브런치 (테스트 브런치);
const App = () => {

    // const location = useLocation();

    // const renderHeader =()=>{

    // }
    // const getHeaderTitle =()=>{
 
    // }

    return (
        <div className="App">
            <Switch className="test">
                <Route path={Paths.auth.index} component={AuthPage} />
                <Route path={Paths.main.index} component={MainPage} />
                <Route component={ErrorPage} />
            </Switch>
        </div>
    );
};

export default App;
