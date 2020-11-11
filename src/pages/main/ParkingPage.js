import React from 'react';
import {useLocation} from 'react-router-dom';
import { Paths } from '../../paths';
import { Switch, Route } from 'react-router-dom';
const ParkingPage = () => {

    return (
        <div>
            <Switch>
                <Route path={Paths.main.parking.manage} render={() => <h1>내 주차 관리</h1>} />
                <Route path={Paths.main.parking.enrollment} render={() => <h1>주차 공간 등록</h1>} />
                <Route path={Paths.main.parking.preview} render={() => <h1>주차공간 미리보기</h1>} />
                <Route render={() => <h1>주차관리 404</h1>} />
            </Switch>
        </div>
    );
}
export default ParkingPage;