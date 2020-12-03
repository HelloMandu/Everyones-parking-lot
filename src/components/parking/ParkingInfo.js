import React from 'react';

import { getFormatDateTime } from '../../lib/calculateDate';
import { numberFormat } from '../../lib/formatter';

import { Paths } from '../../paths';

import PleaseRead from './PleaseRead';

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

const ParkingInfo = ({ parkingInfo }) => {
    if (!parkingInfo) {
        return null;
    }
    const { title, image, price, deposit, start_time, end_time } = parkingInfo;
    infos[0].description = `${getFormatDateTime(
        start_time,
    )} ~ ${getFormatDateTime(end_time)}`;
    infos[1].description = `${numberFormat(price)}원`;
    infos[2].description = `${numberFormat(deposit)}원`;
    return (
        <div className={styles['parkinginfo']}>
            <div
                className={styles['image']}
                style={{
                    backgroundImage: `url(${Paths.storage}${image})`,
                }}
            />
            <div className={styles['wrapper']}>
                <div className={styles['title']}>{title}</div>
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
                <PleaseRead></PleaseRead>
            </div>
        </div>
    );
};

export default ParkingInfo;
