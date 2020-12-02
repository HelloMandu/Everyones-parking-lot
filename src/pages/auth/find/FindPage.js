import React from 'react';
import { Switch, Route } from 'react-router-dom';
/* Library */

import FindContainer from '../../../containers/auth/find/FindContainer'
import FindEmailContainer from '../../../containers/auth/find/FindEmailContainer';
import FindPasswordContainer from '../../../containers/auth/find/FindPasswordContainer';
import FindEmailCompleteContainer from '../../../containers/auth/find/FindEmailCompleteContainer';
import FindPasswordCompleteContainer from '../../../containers/auth/find/FindPasswordCompleteContainer';
/* Components */

import { Paths } from '../../../paths';
/* Paths */

const FindPage = () => {

    // XD => 아이디/비밀번호 찾기 어디서 부르나요..?
    return (
        <div>
            <Switch>
                <Route path={Paths.auth.find.index} component={FindContainer} exact />
                <Route path={Paths.auth.find.email} component={FindEmailContainer} />
                <Route path={Paths.auth.find.password} component={FindPasswordContainer} />
                <Route path={Paths.auth.find.email_complete} component={FindEmailCompleteContainer} />
                <Route path={Paths.auth.find.password_complete} component={FindPasswordCompleteContainer} />
                <Route render={({history}) => history.replace(Paths.auth.find.index)} />
            </Switch>
        </div>
    );
}
export default FindPage;