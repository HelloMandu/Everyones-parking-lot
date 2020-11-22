import React from 'react';

import Ad from '../../static/asset/svg/notification/Ad';
import Heart from '../../static/asset/svg/notification/Heart';

import styles from './NotificationContainer.module.scss';

const NotificationItem = ({ type, description, date }) => {
    return (
        <>
            <div className={styles["icon"]}>
                {type ? <Ad/> : <Heart/>}
            </div>
            <div className={styles["content"]}>
                <div className={styles["description"]}>{description}</div>
                <div className={styles["date"]}>{date}</div>
            </div>
        </>
    );
};

const notification = [
    {
        id: 1,
        type: true,
        description: '(광고) 이번주 10% 쿠폰 받아봐요!',
        date: '2020-00-00 00:00:00'
    },
    {
        id: 2,
        type: false,
        description: '(광고) 이번주 10% 쿠폰 받아봐요!',
        date: '2020-00-00 00:00:00'
    },
    {
        id: 3,
        type: false,
        description: '(광고) 이번주 10% 쿠폰 받아봐요!',
        date: '2020-00-00 00:00:00'
    },
    {
        id: 4,
        type: false,
        description: '(광고) 이번주 10% 쿠폰 받아봐요!',
        date: '2020-00-00 00:00:00'
    },
    {
        id: 5,
        type: false,
        description: '(광고) 이번주 10% 쿠폰 받아봐요!',
        date: '2020-00-00 00:00:00'
    },
    {
        id: 6,
        type: true,
        description: '(광고) 이번주 10% 쿠폰 받아봐요!',
        date: '2020-00-00 00:00:00'
    },
    {
        id: 7,
        type: false,
        description: '(광고) 이번주 10% 쿠폰 받아봐요!',
        date: '2020-00-00 00:00:00'
    },
    {
        id: 8,
        type: false,
        description: '(광고) 이번주 10% 쿠폰 받아봐요!',
        date: '2020-00-00 00:00:00'
    },
];

const NotificationContainer = () => {
    return <div className={styles['notification-container']}>
        <ul className={styles["notification-list"]}>
            {notification.map(({id, type, description, date})=>(
                <li className={styles['notification-item']} key={id}>
                    <NotificationItem
                        type={type}
                        description={description}
                        date={date}
                    />
                </li>
            ))}
        </ul>
    </div>;
};

export default NotificationContainer;
