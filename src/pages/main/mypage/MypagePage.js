import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
/* Library */

import UpdatePage from './UpdatePage';
/* Pages */

import MyPageContainer from '../../../containers/main/mypage/MyPageContainer';
import MyPointContainer from '../../../containers/main/mypage/MyPointContainer';
import WithdrawContainer from '../../../containers/main/mypage/WithdrawContainer';
/* Containers */

import { Paths } from '../../../paths';
/* Paths */

const MypagePage = () => {

    const history = useHistory();

    return (
        <div>
            <Switch>
                <Route path={Paths.main.mypage.myinfo + '/:modal?'} component={MyPageContainer} />
                <Route path={Paths.main.mypage.point} component={MyPointContainer} />
                <Route path={Paths.main.mypage.update.index + '/:type'} component={UpdatePage} />
                <Route path={Paths.main.mypage.withdraw} component={WithdrawContainer} />
                <Route render={() => history.replace(Paths.main.mypage.myinfo)} />
            </Switch>
        </div>
    );
}
export default MypagePage;