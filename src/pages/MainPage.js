import React from 'react';
import {useHistory} from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { Map, Detail, Payment, PaymentComplete, Use, Review, Mypage, Parking, Coupon, Notification, Event, Support, Setting } from './main';

const { Paths } = require('../paths');

const MainPage = () => {

    const history=  useHistory();

    return (
        <Switch>
            <Route path={Paths.main.index + '/:modal?'} component={Map} />
            <Route path={Paths.main.detail + '/:modal?'} component={Detail} />
            <Route path={Paths.main.payment + '/:modal?/:modal2?'} component={Payment} />
            <Route path={Paths.main.payment_complete} component={PaymentComplete} />
            <Route path={Paths.main.use.index} component={Use} />
            <Route path={Paths.main.review.index} component={Review} />
            <Route path={Paths.main.mypage.index} component={Mypage} />
            <Route path={Paths.main.parking.index} component={Parking} />
            <Route path={Paths.main.event.index} component={Event} />
            <Route path={Paths.main.notification} component={Notification} />
            <Route path={Paths.main.coupon + '/:modal?'} component={Coupon} />
            <Route path={Paths.main.support.index} component={Support} />
            <Route path={Paths.main.setting} component={Setting} />
            <Route render={()=> history.replace(Paths.main.index)} />
        </Switch>
    );
};

export default MainPage;
