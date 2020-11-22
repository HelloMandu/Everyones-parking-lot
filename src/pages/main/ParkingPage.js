import React from 'react';
import { Switch, Route,useHistory } from 'react-router-dom';
/* Library */

import ParkingManageContainer from '../../containers/main/parking/ParkingManageContainer';
import ParkingEnrollContainer from '../../containers/main/parking/ParkingEnrollContainer';
import ParkingPreviewContainer from '../../containers/main/parking/ParkingPreviewContainer';
/* Containers */

import { Paths } from '../../paths';
/* Paths */

const ParkingPage = () => {
    const history = useHistory();
    return (
        <div>
            <Switch>
                <Route path={Paths.main.parking.manage} component={ParkingManageContainer} />
                <Route path={Paths.main.parking.enrollment} component={ParkingEnrollContainer} />
                <Route path={Paths.main.parking.preview} component={ParkingPreviewContainer} />
                <Route render={() =>history.replace(Paths.main.parking.manage)} />
            </Switch>
        </div>
    );
};

export default ParkingPage;