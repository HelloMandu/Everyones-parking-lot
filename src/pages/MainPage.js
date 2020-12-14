import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Map, Detail, Payment, PaymentComplete, Use, Review, Mypage, Parking, Coupon, Notification, Event, Support, Setting } from './main';
import OAuthPage from './OAuthPage';

import {set_filters} from '../store/main/filters';
const { Paths } = require('../paths');

const MainPage = ({ history }) => {

    const dispatch = useDispatch();
    useEffect(()=>{

        const filter_data = JSON.parse(localStorage.getItem('filter_data'));
        if(filter_data){
            const {parking_town,underground_parking,ground_parking,stated_parking} = filter_data
            dispatch(set_filters({type:'parking_town', value:parking_town}));
            dispatch(set_filters({type:'underground_parking', value:underground_parking}));
            dispatch(set_filters({type:'ground_parking', value:ground_parking}));
            dispatch(set_filters({type:'stated_parking', value:stated_parking}));
        }
        else{
            const init = {
                parking_town: true,
                underground_parking: true,
                ground_parking: true,
                stated_parking: true,
            }
            localStorage.setItem('filter_data',JSON.stringify(init));
        }

    },[])
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
            <Route path={Paths.Oauth} component={OAuthPage} />
            <Route render={()=> history.replace(Paths.main.index)} />
        </Switch>
    );
};

export default MainPage;
