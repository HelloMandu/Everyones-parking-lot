import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
    Map,
    Detail,
    Payment,
    PaymentComplete,
    Use,
    Review,
    Mypage,
    Parking,
    Coupon,
    Notice,
    Event,
    Support
} from './main';

const { Paths } = require('../paths');

const MainPage = () => {
    return (
        <div>
            <Switch>
                <Route exact path={Paths.main.index} component={Map} />
                <Route path={Paths.main.detail} component={Detail} />
                <Route path={Paths.main.payment} component={Payment} />
                <Route
                    path={Paths.main.payment_complete}
                    component={PaymentComplete}
                />
                <Route
                    path={Paths.main.use.index}
                    component={Use}
                />
                <Route
                    path={Paths.main.review.index + '/:type?'}
                    component={Review}
                />
                <Route
                    path={Paths.main.mypage.index + '/:type'}
                    component={Mypage}
                />
                <Route
                    path={Paths.main.parking.index + '/:type?'}
                    component={Parking}
                />
                <Route
                    path={Paths.main.event.index + '/:type?'}
                    component={Event}
                />
                <Route path={Paths.main.notice} component={Notice} />
                <Route path={Paths.main.coupon} component={Coupon} />
                <Route path={Paths.main.support} component={Support} />
                <Route render={() => <h1>없음</h1>} />
            </Switch>
        </div>
    );
};

export default MainPage;
