import React from 'react';
import { Switch, Route } from 'react-router-dom';
/* Library */

import FindEmail from '../../../components/auth/FindEmail';
import FinddPassword from '../../../components/auth/FindPassword';
import FindEmailComplete from '../../../components/auth/FindEmailComplete';
import FindPasswordComplete from '../../../components/auth/FindPasswordComplete';
/* Components */

import { Paths } from '../../../paths';
/* Paths */

const FindPage = () => {

    // XD => 아이디/비밀번호 찾기 어디서 부르나요..?

    return (
        <div>
            <Switch>
                <Route path={Paths.auth.find.email} component={FindEmail} />
                <Route path={Paths.auth.find.password} component={FinddPassword} />
                <Route path={Paths.auth.find.email_complete} component={FindEmailComplete} />
                <Route path={Paths.auth.find.password_complete} component={FindPasswordComplete} />
                <Route render={() => <h1>찾기페이지 404</h1>} />
            </Switch>
        </div>
    );
}
export default FindPage;