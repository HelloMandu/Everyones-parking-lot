import React from 'react';
import {useLocation} from 'react-router-dom';
import { Paths } from '../../paths';
import { Switch, Route } from 'react-router-dom';
const UsePage = () => {

    return (
        <div>
            <Switch>
                <Route path={Paths.main.use.list} render={() => <h1>이용 내역</h1>} />
                <Route path={Paths.main.use.detail} render={() => <h1>이용 상세 내역</h1>} />
                <Route path={Paths.main.use.cancle} render={() => <h1>이용 취소</h1>} />
                <Route path={Paths.main.use.extend} render={() => <h1>이용연장</h1>} />
                <Route render={() => <h1>이용 내역 404</h1>} />
            </Switch>
        </div>
    );
}
export default UsePage;