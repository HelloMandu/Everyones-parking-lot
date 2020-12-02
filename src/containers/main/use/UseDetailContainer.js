import React from 'react';
import qs from 'qs';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { Paths } from '../../../paths';

import styles from './UseDetailContainer.module.scss';

import Parking from '../../../static/asset/png/parking.png';

const cx = classNames.bind(styles);

const UseDetailContainer = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const { id } = query;

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>길동이의 주차 공간</div>
            <div className={cx('card')}>
                <img src={Parking} alt="" />

                <div className={cx('card-title')}>주차 대여 정보</div>
                
                <div className={cx('content-area')}>
                    <div className={cx('attribute-wrapper')}>
                        <div className={cx('attribute')}>주차공간이름</div>
                        <div className={cx('value')}>길동이 주차공간</div>
                    </div>

                    <div className={cx('attribute-wrapper')}>
                        <div className={cx('attribute')}>대여시간</div>
                        <div className={cx('value')}>
                            10/05(수) 14:00 ~ 10/05(수) 16:00
                        </div>
                    </div>

                    <div className={cx('attribute-wrapper')}>
                        <div className={cx('attribute')}>운영시간</div>
                        <div className={cx('value')}>
                            10/05(수) 09:00 ~ 10/05(수) 16:00
                        </div>
                    </div>

                    <div className={cx('attribute-wrapper')}>
                        <div className={cx('attribute')}>주차요금</div>
                        <div className={cx('value')}>30분당 3,000원</div>
                    </div>

                    <div className={cx('attribute-wrapper')}>
                        <div className={cx('attribute')}>제공자 연락처</div>
                        <div className={cx('value')}>0504-123-1234</div>
                    </div>

                    <div className={cx('attribute-wrapper')}>
                        <div className={cx('attribute')}>
                            이전 대여자 연락처
                        </div>
                        <div className={cx('value')}>0504-123-1234</div>
                    </div>
                </div>
            </div>
            이용내역서_{id}
            <div>
                <Link to={Paths.main.use.cancel + `?id=${id}`}>
                    대여 취소하기
                </Link>
            </div>
            <div>
                <Link to={Paths.main.use.extend + `?id=${id}`}>연장하기</Link>
            </div>
        </div>
    );
};

export default UseDetailContainer;
