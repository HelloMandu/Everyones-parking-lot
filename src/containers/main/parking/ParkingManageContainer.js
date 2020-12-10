import React, { lazy, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
import useSWR from 'swr';

import { requestGetMyParkingList } from '../../../api/place';
import { getFormatDateTime } from '../../../lib/calculateDate';

import { Paths } from '../../../paths';

import styles from './ParkingManageContainer.module.scss';

const cx = cn.bind(styles);

const ParkingItem = ({ status, image, title, start, end, price }) => {
    const lazyImage = lazy(() => import(`${Paths.storage}${image}`));
    return (
        <>
            <div
                className={styles['parking-image']}
                style={{ backgroundImage: `${lazyImage}` }}
            />
            <div className={styles['parking-info']}>
                <div className={styles['subject']}>
                    <div className={cx('status', { status })}>
                        {status === 0 ? '대여중' : '대여종료'}
                    </div>
                    <div className={styles['title']}>{title}</div>
                </div>
                <div className={styles['description']}>
                    <div className={styles['schedule']}>
                        {getFormatDateTime(start)}
                        <span>부터</span>
                        <br />
                        {getFormatDateTime(end)}
                        <span>까지 운영</span>
                    </div>
                    <div className={styles['per-price']}>
                        <div className={styles['per']}>30분당</div>
                        <div className={styles['price']}>{price}원</div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ParkingManageContainer = () => {
    const history = useHistory();
    const { data, error } = useSWR(
        localStorage.getItem('user_id'),
        requestGetMyParkingList,
    );
    useEffect(() => {
        const handleScroll = () => {
            if (
                Math.ceil(
                    window.innerHeight + document.documentElement.scrollTop,
                ) === document.documentElement.offsetHeight
            ) {
                console.log('endpoint');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    if (error) {
        history.goBack(); // 에러페이지
        return null;
    } else if (!data) {
        return null;
    }
    const parkingList = data.data.places;
    return (
        <div className={styles['parking-management-container']}>
            <Link to={Paths.main.parking.enrollment}>
                <ButtonBase className={styles['enroll-button']}>
                    <span className={styles['plus']}>+</span>주차공간 등록하기
                </ButtonBase>
            </Link>
            <ul className={styles['parking-list']}>
                {parkingList.map(
                    ({
                        place_id,
                        place_status,
                        place_images,
                        place_name,
                        oper_start_time,
                        oper_end_time,
                        place_fee,
                    }) => (
                        <ButtonBase
                            className={styles['parking-item']}
                            component="li"
                            key={place_id}
                        >
                            <ParkingItem
                                status={place_status}
                                image={
                                    Array.isArray(place_images)
                                        ? place_images[0].split('\\')[1]
                                        : ''
                                }
                                title={place_name}
                                start={oper_start_time}
                                end={oper_end_time}
                                price={place_fee}
                            ></ParkingItem>
                        </ButtonBase>
                    ),
                )}
            </ul>
        </div>
    );
};

export default ParkingManageContainer;
