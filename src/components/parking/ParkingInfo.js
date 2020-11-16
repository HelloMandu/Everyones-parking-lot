import React from 'react';

import parkingImage from '../../static/asset/png/parking.png';

import Information from './Information';

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
                <ul className={styles['infolist']}>
                    {infos.map(({ id, title, description }) => (
                        <li className={styles['info']} key={id}>
                            <div className={styles['info-title']}>{title}</div>
                            <div className={styles['description']}>
                                {description}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={styles['information']}>
                    <div className={styles['title']}>
                        <Information></Information>
                        <span className={styles['explain']}>꼭 읽어주세요</span>
                    </div>
                    <div className={styles['description']}>
                        보증금은 주차시간을 어기고 초과로 주차하시는 대여자에게
                        다시 환급이 불가합니다. 주차시간을 준수하신다면 보증금을
                        환급 받으실 수 있습니다. 주차시간을 초과할 경우 대여자의
                        차량이 견인 조치 될 수 있음을 미리 알려드립니다.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParkingInfo;
