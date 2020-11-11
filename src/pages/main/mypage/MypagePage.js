import React from 'react';
import { Paths } from '../../../paths';
import { Switch, Route } from 'react-router-dom';
import UpdatePage from './UpdatePage';

const MypagePage = () => {

    return (
        <div>
            <Switch>
                <Route exact path = {Paths.main.mypage.index} render={()=><h1>마이페이지</h1>}/>
                <Route path={Paths.main.mypage.point} render={() => <h1>내 수익금</h1>} />
                <Route path={Paths.main.mypage.update.index + '/:type'} component={UpdatePage} />
                <Route render={() => <h1>마이페이지 에러</h1>} />
            </Switch>
        </div>
    );
}
export default MypagePage;