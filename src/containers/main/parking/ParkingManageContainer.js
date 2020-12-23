import React, { useCallback, useEffect, useState, useRef, memo } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

import { useScrollEnd, useScrollRemember } from '../../../hooks/useScroll';
import useToken from '../../../hooks/useToken';

import { fetchMyParkingList, getMyParkingList } from '../../../store/myParking';
import { imageFormat, numberFormat } from '../../../lib/formatter';
import { getFormatDateTime } from '../../../lib/calculateDate';

import { Paths } from '../../../paths';

import Notice from '../../../static/asset/svg/Notice';

import styles from './ParkingManageContainer.module.scss';

const cx = cn.bind(styles);

const Image = ({ src, threshold = 0.5 }) => {
    const imgRef = useRef(null);
    const observerRef = useRef(null);
    const [isLoad, setIsLoad] = useState(false);
    const onIntersection = (entries, io) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                io.unobserve(entry.target);
                setIsLoad(true);
            }
        });
    };
    useEffect(() => {
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver(onIntersection, {
                threshold: threshold,
            });
        }
        imgRef.current && observerRef.current.observe(imgRef.current);
    }, [threshold]);
    return (
        <div
            className={cx('parking-image', { isLoad })}
            ref={imgRef}
            style={{ backgroundImage: `url(${src})` }}
        />
    );
};

const getStatus = (rentalOrders, operEndDate) => {
    const today = new Date();
    const endDate = new Date(operEndDate);
    if (today < endDate) {
        if (rentalOrders.length) {
            return 2; // 대여중
        }
        return 1; // 대여가능
    }
    return 0; //대여종료
};

const ParkingItem = memo(({ status, image, title, start, end, price }) => {
    return (
        <>
            <Image src={`${imageFormat(image)}`} threshold={0.3}></Image>
            <div className={styles['parking-info']}>
                <div className={styles['subject']}>
                    <span className={cx('status', { finished: !status })}>
                        {status ? (1 ? '대여가능' : '대여중') : '대여종료'}
                    </span>
                    <h2 className={styles['title']}>{title}</h2>
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
                        <div className={styles['price']}>
                            {numberFormat(price)}원
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

const ParkingManageContainer = () => {
    const JWT_TOKEN = useToken();
    const history = useHistory();
    const location = useLocation();
    const loading = useSelector((state) => state.loading);
    const { myAllParkingList, myParkingList } = useSelector(
        (state) => state.myParking,
    );
    const dispatch = useDispatch();
    const fetchParkingList = useCallback(() => {
        const LIMIT = 3;
        const length = myParkingList.length;
        const fetchData = myAllParkingList.slice(length, length + LIMIT);
        if (fetchData.length > 0) {
            dispatch(fetchMyParkingList(fetchData));
        }
    }, [dispatch, myAllParkingList, myParkingList.length]);
    useScrollEnd(fetchParkingList);
    useScrollRemember(location.pathname);
    useEffect(() => {
        if (!myAllParkingList.length) {
            dispatch(getMyParkingList(JWT_TOKEN));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <main className={styles['parking-management-container']}>
            <Link to={Paths.main.parking.enrollment}>
                <ButtonBase className={styles['enroll-button']}>
                    <span className={styles['plus']}>+</span>주차공간 등록하기
                </ButtonBase>
            </Link>
            {!loading['myParking/GET_LIST'] &&
                (myParkingList.length ? (
                    <ul className={styles['parking-list']}>
                        {myParkingList.map(
                            ({
                                place_id,
                                place_images,
                                place_name,
                                oper_start_time,
                                oper_end_time,
                                place_fee,
                                rental_orders,
                            }) => (
                                <ButtonBase
                                    className={styles['parking-item']}
                                    component="li"
                                    key={place_id}
                                    onClick={() =>
                                        history.push(
                                            Paths.main.detail +
                                                `?place_id=${place_id}`,
                                        )
                                    }
                                >
                                    <ParkingItem
                                        status={getStatus(
                                            rental_orders,
                                            oper_end_time,
                                        )}
                                        image={
                                            Array.isArray(place_images)
                                                ? place_images[0].replace(
                                                      'uploads/',
                                                      '',
                                                  )
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
                ) : (
                    <div className={styles['non-qna']}>
                        <div className={styles['non-container']}>
                            <Notice />
                            <div className={styles['explain']}>
                                등록된 주차공간이 없습니다.
                            </div>
                        </div>
                    </div>
                ))}
        </main>
    );
};

export default ParkingManageContainer;
