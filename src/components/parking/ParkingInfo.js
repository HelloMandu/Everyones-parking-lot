import React from 'react';

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
            {/* <div className={styles['info']}>
                <div className={styles['title']}>길동이 주차공간</div>
                <div className={styles['rental-time']}>
                    <div className={styles['rental']}>대여시간</div>
                    <div className={styles['time']}>
                        10/5(수)14:00 ~ 10/5(수)16:00
                    </div>
                </div>
                <div className={styles['parking-price']}>
                    <div className={styles['parking']}>주차요금</div>
                    <div className={styles['price']}>60,000원</div>
                </div>
                <div className={styles['deposit-price']}>
                    <div className={styles['deposit']}>보증금</div>
                    <div className={styles['price']}>10,000원</div>
                </div>
            </div> */}
            <ul className={styles['infolist']}>
                {infos.map(({ id, title, description }) => (
                    <li className={styles['info']} key={id}>
                        <div className={styles['title']}>{title}</div>
                        <div className={styles['description']}>{description}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParkingInfo;
