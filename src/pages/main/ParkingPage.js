import React from 'react';
import { Switch, Route } from 'react-router-dom';
/* Library */

import ParkingManageContainer from '../../containers/main/parking/ParkingManageContainer';
import ParkingEnrollContainer from '../../containers/main/parking/ParkingEnrollContainer';
import ParkingPreviewContainer from '../../containers/main/parking/ParkingPreviewContainer';
/* Containers */

import { Paths } from '../../paths';
/* Paths */

const ParkingPage = () => {

    return (
        <div>
            <Switch>
                <Route path={Paths.main.parking.manage} component={ParkingManageContainer} />
                <Route path={Paths.main.parking.enrollment.index} component={ParkingEnrollContainer} />
                <Route path={Paths.main.parking.preview} component={ParkingPreviewContainer} />
                <Route render={() => <h1>주차관리 404</h1>} />
            </Switch>
        </div>
    );
};

export default ParkingPage;