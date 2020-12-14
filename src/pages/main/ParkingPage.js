import React from 'react';
import { Switch, Route,useHistory } from 'react-router-dom';
/* Library */

import ParkingManageContainer from '../../containers/main/parking/ParkingManageContainer';
import ParkingEnrollContainer from '../../containers/main/parking/ParkingEnrollContainer';
/* Containers */

import { Paths } from '../../paths';
/* Paths */

const ParkingPage = () => {
    const history = useHistory();
    return (
        <div>
            <Switch>
                <Route path={Paths.main.parking.manage + '/:modal?'} component={ParkingManageContainer} />
                <Route path={Paths.main.parking.enrollment + '/:modal?'} component={ParkingEnrollContainer} />
                <Route render={() =>history.replace(Paths.main.parking.manage)} />
            </Switch>
        </div>
    );
};

export default ParkingPage;