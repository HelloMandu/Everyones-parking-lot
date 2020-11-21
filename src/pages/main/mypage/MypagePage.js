import React from 'react';
import { Switch, Route } from 'react-router-dom';
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

    return (
        <div>
            <Switch>
                <Route exact path={Paths.main.mypage.index} component={MyPageContainer} />
                <Route path={Paths.main.mypage.point} component={MyPointContainer} />
                <Route path={Paths.main.mypage.update.index + '/:type'} component={UpdatePage} />
                <Route path={Paths.main.mypage.withdraw} component={WithdrawContainer} />
                <Route render={() => <h1>마이페이지 에러</h1>} />
            </Switch>
        </div>
    );
}
export default MypagePage;