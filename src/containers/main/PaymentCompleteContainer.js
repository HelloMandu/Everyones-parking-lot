import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import qs from 'qs';
import useSWR from 'swr';

import { Paths } from '../../paths';

import { requestGetDetailUseRental } from '../../api/rental';
import { useDialog } from '../../hooks/useDialog';
import {
    getFormatDateTime,
    getFormatNewDate,
    getFormatNewTime,
} from '../../lib/calculateDate';
import { numberFormat, stringToTel } from '../../lib/formatter';

import PleaseRead from '../../components/parking/PleaseRead';

import CloseButton from '../../static/asset/svg/payment/CloseButton';

import styles from './PaymentCompleteContainer.module.scss';

const PaymentCompleteContainer = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { rental_id } = query;
    const openDialog = useDialog();
    const history = useHistory();
    const { data } = useSWR(rental_id, requestGetDetailUseRental);
    if (!data) {
        return null;
    } else if (data && data.msg !== 'success') {
        //warning check
        openDialog('error', data.msg, () => history.replace(Paths.main.index));
        return null;
    }
    const { order } = data;
    const {
        rental_start_time: startTime,
        rental_end_time: endTime,
        place,
        user,
    } = order;
    const { place_images, place_fee } = place;
    const { phone_number } = user;
    return (
        <>
            <div className={styles['gradient']}></div>
            <div className={styles['payment-complete-container']}>
                <div className={styles['close']}>
                    <Link to={Paths.main.index}>
                        <CloseButton></CloseButton>
                    </Link>
                </div>
                <header className={styles['title']}>
                    <p className={styles['explain']}>
                        대여 결제가 완료되었습니다
                    </p>
                    <div className={styles['parking-status']}>
                        <h2 className={styles['title']}>{place.place_name}</h2>
                        <span className={styles['status']}>이용대기</span>
                    </div>
                </header>
                <main className={styles['parking-info-wrapper']}>
                    <div
                        className={styles['image']}
                        style={{
                            backgroundImage: `url(${Paths.storage}${
                                place_images[0].split('\\')[1]
                            })`,
                        }}
                    />
                    <section className={styles['parking-info']}>
                        <article className={styles['schedule']}>
                            <h3 className={styles['time-title']}>
                                주차장 대여시간
                            </h3>
                            <div className={styles['rental-schedule']}>
                                <div className={styles['time-wrapper']}>
                                    <div className={styles['date']}>
                                        {getFormatNewDate(startTime)}
                                    </div>
                                    <div className={styles['time']}>
                                        {getFormatNewTime(startTime)}
                                    </div>
                                </div>
                                <div className={styles['time-wrapper']}>
                                    <div className={styles['date']}>
                                        {getFormatNewDate(endTime)}
                                    </div>
                                    <div className={styles['time']}>
                                        {getFormatNewTime(endTime)}
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article className={styles['infolist']}>
                            <div className={styles['info']}>
                                <span className={styles['info-title']}>
                                    대여시간
                                </span>
                                <span className={styles['description']}>
                                    {`${getFormatDateTime(
                                        startTime,
                                    )} ~ ${getFormatDateTime(endTime)}`}
                                </span>
                            </div>
                            <div className={styles['info']}>
                                <span className={styles['info-title']}>
                                    주차요금
                                </span>
                                <span className={styles['description']}>
                                    30분당 {numberFormat(place_fee)}원
                                </span>
                            </div>
                            <div className={styles['info']}>
                                <span className={styles['info-title']}>
                                    제공자 연락처
                                </span>
                                <span className={styles['description']}>
                                    {stringToTel(phone_number)}
                                </span>
                            </div>
                        </article>
                        <PleaseRead fill={'#1F8395'}></PleaseRead>
                    </section>
                </main>
            </div>
        </>
    );
};

export default PaymentCompleteContainer;
