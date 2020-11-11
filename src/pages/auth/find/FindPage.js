import React from 'react';
import {useLocation} from 'react-router-dom';
import { Paths } from '../../../paths';
import { Switch, Route } from 'react-router-dom';
const FindPage = () => {

    return (
        <div>
            <Switch>
                <Route path={Paths.auth.find.email} render={() => <h1>이메일 찾기</h1>} />
                <Route path={Paths.auth.find.password} render={() => <h1>비번 찾기</h1>} />
                <Route path={Paths.auth.find.email_complete} render={() => <h1>이메일 찾기 완료</h1>} />
                <Route path={Paths.auth.find.password_complete} render={() => <h1>비번 찾기 완료</h1>} />
                <Route render={() => <h1>찾기페이지 404</h1>} />
            </Switch>
        </div>
    );
}
export default FindPage;