import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';

import { ButtonBase } from '@material-ui/core';

import { Paths } from '../../../paths';
import { requestGetMyParkingList } from '../../../api/place';

import parkingImage from '../../../static/asset/png/parking.png';

import styles from './ParkingManageContainer.module.scss';

const cx = cn.bind(styles);

const ParkingItem = ({ place_status, title, start, end, per, price }) => {
    return (
        <>
            <img src={parkingImage} alt="parking" />
            <div className={styles['parking-info']}>
                <div className={styles['subject']}>
                    <div className={cx('status', { place_status })}>
                        {place_status === 0 ? '대여중' : '대여종료'}
                    </div>
                    <div className={styles['title']}>{title}</div>
                </div>
                <div className={styles['description']}>
                    <div className={styles['schedule']}>
                        {start}
                        <span>부터</span>
                        <br />
                        {end}
                        <span>까지 운영</span>
                    </div>
                    <div className={styles['per-price']}>
                        <div className={styles['per']}>{per}분당</div>
                        <div className={styles['price']}>{price}원</div>
                    </div>
                </div>
            </div>
        </>
    );
};

const parkingList = [
    {
        id: 1,
        place_status: 0,
        title: '길동이 주차공간',
        start: '10/05(수) 09:00',
        end: '10/05(수) 20:00',
        per: 30,
        price: '3,000',
    },
    {
        id: 2,
        place_status: 0,
        title: '길동이 주차공간',
        start: '10/05(수) 09:00',
        end: '10/05(수) 20:00',
        per: 30,
        price: '3,000',
    },
    {
        id: 3,
        place_status: 1,
        title: '길동이 주차공간',
        start: '10/05(수) 09:00',
        end: '10/05(수) 20:00',
        per: 30,
        price: '3,000',
    },
    {
        id: 4,
        place_status: 1,
        title: '길동이 주차공간',
        start: '10/05(수) 09:00',
        end: '10/05(수) 20:00',
        per: 30,
        price: '3,000',
    },
];

const ParkingManageContainer = () => {
    useEffect(()=>{
        const getParkingList = async () =>{
            const JWT_TOKEN = localStorage.getItem('user_id');
            const response = await requestGetMyParkingList(JWT_TOKEN);
            console.log(response);
        }
        getParkingList();
    }, [])
    return (
        <div className={styles['parking-management-container']}>
            <Link to={Paths.main.parking.enrollment}>
                <ButtonBase className={styles['enroll-button']}>
                    <span className={styles['plus']}>+</span>주차공간 등록하기
                </ButtonBase>
            </Link>
            <ul className={styles['parking-list']}>
                {parkingList.map(
                    ({ id, place_status, title, start, end, per, price }) => (
                        <ButtonBase
                            className={styles['parking-item']}
                            component="li"
                            key={id}
                        >
                            <ParkingItem
                                place_status={place_status}
                                title={title}
                                start={start}
                                end={end}
                                per={per}
                                price={price}
                            ></ParkingItem>
                        </ButtonBase>
                    ),
                )}
            </ul>
        </div>
    );
};

export default ParkingManageContainer;
