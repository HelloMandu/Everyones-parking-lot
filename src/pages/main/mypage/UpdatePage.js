import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
/* Library */

import UpdateNameContainer from '../../../containers/main/mypage/update/UpdateNameContainer';
import UpdateBirthdayContainer from '../../../containers/main/mypage/update/UpdateBirthdayContainer';
import UpdateHpContainer from '../../../containers/main/mypage/update/UpdateHpContainer';
import UpdateCarContainer from '../../../containers/main/mypage/update/UpdateCarContainer';
import UpdatePasswordContainer from '../../../containers/main/mypage/update/UpdatePasswordContainer';
/* Container */

import { Paths } from '../../../paths';
/* Paths */

const UpdatePage = () => {

    const history = useHistory();

    return (
        <div>
            <Switch>
                <Route path={Paths.main.mypage.update.name} component={UpdateNameContainer} />
                <Route path={Paths.main.mypage.update.password} component={UpdatePasswordContainer} />
                <Route path={Paths.main.mypage.update.hp} component={UpdateHpContainer} />
                <Route path={Paths.main.mypage.update.enrollment} component={UpdateCarContainer} />
                <Route path={Paths.main.mypage.update.birthday} component={UpdateBirthdayContainer} />
                <Route render={() => history.replace(Paths.main.mypage.myinfo)} />
            </Switch>
        </div>
    );
}
export default UpdatePage;