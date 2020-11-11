import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import FindPage from './auth/find/FindPage';

const { Paths } = require('../paths');

const AuthPage = () => {
    const history = useHistory();
    return (
        <div>
            <Switch>
                <Route path={Paths.auth.login}  render={() => <h1>로그인 렌딩페이지</h1>}  />
                <Route path={Paths.auth.signin}  render={() => <h1>로그인 페이지</h1>}  />
                <Route path={Paths.auth.signup}  render={() => <h1>회원가입 페이지</h1>}  />
                <Route path={Paths.auth.enrollment}  render={() => <h1>차량등록 페이지</h1>}  />
                <Route path={Paths.auth.sign_complete}  render={() => <h1>회원가입 완료 페이지</h1>}  />
                <Route path={Paths.auth.find.index + '/:type'}  component={FindPage}  />
                <Route render={({ history }) => history.push(Paths.auth.login)} />
            </Switch>
        </div>
    );
};

export default AuthPage;
