import React, { lazy, useCallback, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

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
                    <span className={cx('status', { status })}>
                        {status === 0 ? '대여중' : '대여종료'}
                    </span>
                    <h3 className={styles['title']}>{title}</h3>
                </div>
                <div className={styles['description']}>
                    <span className={styles['schedule']}>
                        {getFormatDateTime(start)}
                        <span>부터</span>
                        <br />
                        {getFormatDateTime(end)}
                        <span>까지 운영</span>
                    </span>
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
    const allParkingList = useRef(null);
    const dataLength = useRef(0);
    const [parkingList, setParkingList] = useState([]);
    const fetchParkingList = useCallback(() => {
        const allLength = allParkingList.current.length;
        const length = dataLength.current;
        if (length >= allLength) {
            return;
        }
        const fetchData = allParkingList.current.slice(length, length + 3);
        setParkingList((parkingList) => parkingList.concat(fetchData));
        dataLength.current += 3;
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const endPoint =
                Math.ceil(
                    window.innerHeight + document.documentElement.scrollTop,
                ) === document.documentElement.offsetHeight;
            if (endPoint) {
                fetchParkingList();
            }
        };
        window.addEventListener('scroll', handleScroll);
        const getParkingList = async () => {
            const JWT_TOKEN = localStorage.getItem('user_id');
            const { places } = await requestGetMyParkingList(JWT_TOKEN);
            allParkingList.current = places;
            fetchParkingList();
        };
        getParkingList();
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <main className={styles['parking-management-container']}>
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
        </main>
    );
};

export default ParkingManageContainer;
