import React from 'react';
import { Switch, Route } from 'react-router-dom';
/* Library */

import UpdateName from '../../../components/main/update/UpdateName';
import UpdateHp from '../../../components/main/update/UpdateHp';
import UpdatePassword from '../../../components/main/update/UpdatePassword';
import UpdateCar from '../../../components/main/update/UpdateCar';
import UpdateBirthday from '../../../components/main/update/UpdateBirthday';
import UpdateProfile from '../../../components/main/update/UpdateProfile';
/* Components */

import { Paths } from '../../../paths';
/* Paths */

const UpdatePage = () => {

    return (
        <div>
            <Switch>
                <Route path={Paths.main.mypage.update.name} component={UpdateName} />
                <Route path={Paths.main.mypage.update.password} component={UpdatePassword} />
                <Route path={Paths.main.mypage.update.hp} component={UpdateHp} />
                <Route path={Paths.main.mypage.update.enrollment} component={UpdateCar} />
                <Route path={Paths.main.mypage.update.birthday} component={UpdateBirthday} />
                <Route path={Paths.main.mypage.update.profile} component={UpdateProfile} />
                <Route render={() => <h1>업데이트 페이지 에러</h1>} />
            </Switch>
        </div>
    );
}
export default UpdatePage;