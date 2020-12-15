import React, { useCallback, useEffect, useState, useRef, memo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

import useScrollEnd from '../../../hooks/useScrollEnd';
import useToken from '../../../hooks/useToken';
import { requestGetMyParkingList } from '../../../api/place';
import { numberFormat } from '../../../lib/formatter';
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

const ParkingItem = memo(({ status, image, title, start, end, price }) => {
    return (
        <>
            <Image src={`${Paths.storage}${image}`} threshold={0.3}></Image>
            <div className={styles['parking-info']}>
                <div className={styles['subject']}>
                    <span className={cx('status', { status })}>
                        {status === 0 ? '대여중' : '대여종료'}
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

//TODO: 주차공간 클릭시 상세보기 페이지가 나오며, 수정하기 버튼생성
const ParkingManageContainer = () => {
    const JWT_TOKEN = useToken();
    const history = useHistory();
    const allParkingList = useRef([]);
    const dataLength = useRef(0);
    const [parkingList, setParkingList] = useState([]);
    const fetchParkingList = useCallback(() => {
        const LIMIT = 3;
        const allLength = allParkingList.current.length;
        const length = dataLength.current;
        if (length >= allLength) {
            return;
        }
        const fetchData = allParkingList.current.slice(length, length + LIMIT);
        setParkingList((parkingList) => parkingList.concat(fetchData));
        dataLength.current += LIMIT;
    }, []);
    useScrollEnd(fetchParkingList);
    useEffect(() => {
        const getParkingList = async () => {
            const { places } = await requestGetMyParkingList(JWT_TOKEN);
            allParkingList.current = places;
            console.log(places);
            fetchParkingList();
        };
        getParkingList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JWT_TOKEN]);
    return (
        <main className={styles['parking-management-container']}>
            <Link to={Paths.main.parking.enrollment}>
                <ButtonBase className={styles['enroll-button']}>
                    <span className={styles['plus']}>+</span>주차공간 등록하기
                </ButtonBase>
            </Link>
            {parkingList.length ? (
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
                                onClick={() =>
                                    history.push(
                                        Paths.main.detail +
                                            `?place_id=${place_id}`,
                                    )
                                }
                            >
                                <ParkingItem
                                    status={place_status}
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
            )}
        </main>
    );
};

export default ParkingManageContainer;
