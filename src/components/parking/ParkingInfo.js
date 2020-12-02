import React from 'react';

import ParkingInfoList from './ParkingInfoList';
import PleaseRead from './PleaseRead';

import parkingImage from '../../static/asset/png/parking.png';

import styles from './ParkingInfo.module.scss';

const infos = [
    {
        id: 1,
        title: '대여시간',
        description: '10/5(수)14:00 ~ 10/5(수)16:00',
    },
    {
        id: 2,
        title: '주차요금',
        description: '60,000원',
    },
    {
        id: 3,
        title: '보증금',
        description: '10,000원',
    },
];

const ParkingInfo = () => {
    return (
        <div className={styles['parkinginfo']}>
            <img
                className={styles['image']}
                src={parkingImage}
                alt="주차공간이미지"
            />
            <div className={styles['wrapper']}>
                <div className={styles['title']}>길동이 주차공간</div>
                <ParkingInfoList list={infos}></ParkingInfoList>
                <PleaseRead></PleaseRead>
            </div>
        </div>
    );
};

export default ParkingInfo;
