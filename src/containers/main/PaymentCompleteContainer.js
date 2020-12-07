import React from 'react';
import { Link } from 'react-router-dom';

import { Paths } from '../../paths';

import PleaseRead from '../../components/parking/PleaseRead';

import parkingImage from '../../static/asset/png/parking.png';
import CloseButton from '../../static/asset/svg/payment/CloseButton';

import styles from './PaymentCompleteContainer.module.scss';

const infos = [
    {
        id: 1,
        title: '대여시간',
        description: '10/5(수)14:00 ~ 10/5(수)16:00',
    },
    {
        id: 2,
        title: '주차요금',
        description: '30분당 3,000원',
    },
    {
        id: 3,
        title: '제공자 연락처',
        description: '0504-123-1234',
    },
];

const PaymentCompleteContainer = () => {
    return (
        <>
            <div className={styles['gradient']}></div>
            <div className={styles['payment-complete-container']}>
                <div className={styles['close']}>
                    <Link to={Paths.main.index}>
                        <CloseButton></CloseButton>
                    </Link>
                </div>
                <div className={styles['title']}>
                    <div className={styles['explain']}>
                        대여 결제가 완료되었습니다
                    </div>
                    <div className={styles['parking-status']}>
                        <div className={styles['title']}>길동이 주차공간</div>
                        <div className={styles['status']}>이용대기</div>
                    </div>
                </div>
                <div className={styles['parking-info-wrapper']}>
                    <img
                        className={styles['image']}
                        src={parkingImage}
                        alt="주차공간이미지"
                    />
                    <div className={styles['parking-info']}>
                        <div className={styles['schedule']}>
                            <div className={styles['time-title']}>
                                주차장 대여시간
                            </div>
                            <div className={styles['rental-schedule']}>
                                <div className={styles['time-wrapper']}>
                                    <div className={styles['date']}>
                                        10/05(수)
                                    </div>
                                    <div className={styles['time']}>14:00</div>
                                </div>
                                <div className={styles['time-wrapper']}>
                                    <div className={styles['date']}>
                                        10/05(수)
                                    </div>
                                    <div className={styles['time']}>16:00</div>
                                </div>
                            </div>
                        </div>
                        <ul className={styles['infolist']}>
                            {infos.map(({ id, title, description }) => (
                                <li className={styles['info']} key={id}>
                                    <div className={styles['info-title']}>
                                        {title}
                                    </div>
                                    <div className={styles['description']}>
                                        {description}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <PleaseRead fill={'#1F8395'}></PleaseRead>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentCompleteContainer;
