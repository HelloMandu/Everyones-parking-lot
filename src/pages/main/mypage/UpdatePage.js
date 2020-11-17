import React from 'react';
import { Switch, Route } from 'react-router-dom';

/* Components */
import UpdateNameContainer from '../../../containers/main/mypage/update/UpdateNameContainer';
import UpdateBirthdayContainer from '../../../containers/main/mypage/update/UpdateBirthdayContainer';
import UpdateHpContainer from '../../../containers/main/mypage/update/UpdateHpContainer';
import UpdateCarContainer from '../../../containers/main/mypage/update/UpdateCarContainer';
import UpdatePasswordContainer from '../../../containers/main/mypage/update/UpdatePasswordContainer';
import UpdateProfileContainer from '../../../containers/main/mypage/update/UpdateProfileContainer';

import { Paths } from '../../../paths';
/* Paths */

const UpdatePage = () => {

    return (
        <div>
            <Switch>
                <Route path={Paths.main.mypage.update.name} component={UpdateNameContainer} />
                <Route path={Paths.main.mypage.update.password} component={UpdatePasswordContainer} />
                <Route path={Paths.main.mypage.update.hp} component={UpdateHpContainer} />
                <Route path={Paths.main.mypage.update.enrollment} component={UpdateCarContainer} />
                <Route path={Paths.main.mypage.update.birthday} component={UpdateBirthdayContainer} />
                <Route path={Paths.main.mypage.update.profile} component={UpdateProfileContainer} />
                <Route render={() => <h1>업데이트 페이지 에러</h1>} />
            </Switch>
        </div>
    );
}
export default UpdatePage;