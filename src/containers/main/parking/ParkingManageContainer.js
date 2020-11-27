import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

import useLoading from '../../../hooks/useLoading';
import { useDialog } from '../../../hooks/useDialog';
import { requestGetMyParkingList } from '../../../api/place';
import {getFormatDateTime} from '../../../lib/calculateDate';

import { Paths } from '../../../paths';

// import parkingImage from '../../../static/asset/png/parking.png';

import styles from './ParkingManageContainer.module.scss';

const cx = cn.bind(styles);

const ParkingItem = ({ status, image, title, start, end, price }) => {
    //이미지 수정해야함
    return (
        <>
            <img src={`../../../../../parking-server/uploads/${image}`} alt="parking" />
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
    const [parkingList, setParkingList] = useState([]);
    const [onLoading, offLoading] = useLoading();
    const openModal = useDialog();
    useEffect(() => {
        const getParkingList = async () => {
            onLoading('parking/manage');
            const JWT_TOKEN = localStorage.getItem('user_id');
            const { data } = await requestGetMyParkingList(JWT_TOKEN);
            console.log(data.places);
            if (data.msg === 'success') {
                setParkingList(data.places);
            } else {
                openModal('요청 실패', '정보를 불러오는데 실패했습니다');
            }
            offLoading('parking/manage');
        };
        getParkingList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={styles['parking-management-container']}>
            <Link to={Paths.main.parking.enrollment}>
                <ButtonBase className={styles['enroll-button']}>
                    <span className={styles['plus']}>+</span>주차공간 등록하기
                </ButtonBase>
            </Link>
            <ul className={styles['parking-list']}>
                {parkingList.map(
                    (
                        { place_id, place_status, place_images, place_name, oper_start_time, oper_end_time, per, place_fee },
                    ) => (
                        <ButtonBase
                            className={styles['parking-item']}
                            component="li"
                            key={place_id}
                        >
                            <ParkingItem
                                status={place_status}
                                image={place_images[0].split('\\')[1]}
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
