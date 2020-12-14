import React from 'react';
import {useSelector} from 'react-redux'; 
import { ButtonBase} from '@material-ui/core';
import styles from './AddressList.module.scss';

import address_icon from '../../static/asset/svg/main/address.svg';

import { getDistanceFromLatLonInKm } from '../../lib/distance';


/* 주소 아이템
    jibunAddr : 지번
    roadAddr : 도로명 혹은 상세주소
    distance : 현재위치와의 거리
    onClick : 클릭 이벤트
*/
const AddressItem = ({ jibunAddr, roadAddr, distance, onClick }) => {
    return (
        <ButtonBase className={styles['address-item']} onClick={onClick}>
            <div className={styles['icon']}>
                <img src={address_icon} alt={jibunAddr} />
            </div>
            <div className={styles['pd-box']}>
                <div className={styles['item-info']}>
                    <div className={styles['jibun-addr']}>{jibunAddr}</div>
                    <div className={styles['road-addr']}>
                        {roadAddr}
                    </div>
                </div>
            </div>
            {distance &&<div className={styles['distance']}>12.24km</div>}
        </ButtonBase>
    );
};

const BookmarkItem = ({notification_id,place, onClick }) => {
    const {addr,addr_detail,place_name,lat,lng} = place;
    const { position } = useSelector(
        (state) => state.position,
    ); //마지막 좌표 및 레벨
    const distance = getDistanceFromLatLonInKm(
        lat,
        lng,
        position.lat,
        position.lng,
    );
    console.log(lat);
    console.log(lng);
    console.log(position.lat);
    console.log(position.lng);
    console.log(distance);
    return (
        <ButtonBase className={styles['address-item']} onClick={onClick}>
            <div className={styles['icon']}>
                <img src={address_icon} alt={place_name} />
            </div>
            <div className={styles['pd-box']}>
                <div className={styles['item-info']}>
                    <div className={styles['jibun-addr']}>{place_name}</div>
                    <div className={styles['road-addr']}>
                        {addr}
                    </div>
                </div>
            </div>
            {distance &&<div className={styles['distance']}>{distance}km</div>}
        </ButtonBase>
    );
};

export default ({addr_list,onClick,type=1})=>{
    let list =null;
    if(type===1){
        list = addr_list.map((addr,index)=>(
            <AddressItem
                key={index}
                index={index}
                jibunAddr={addr.jibunAddr}
                roadAddr={addr.roadAddr}
                post_num={addr.zipNo}
                distance={addr.distance}
                onClick={() => onClick(addr.jibunAddr)}
            />
        ))
    }
    else if (type===2){
        list = addr_list.map((item)=>(
            <BookmarkItem
                key={item.id}
                notification_id={item.notification_id}
                place={item.place}
                onClick={() => onClick(item.place_id)}
            />
        ))
    }
    else if(type===3){

    }

    return(
        <>
        {list}
        </>
    )
}

