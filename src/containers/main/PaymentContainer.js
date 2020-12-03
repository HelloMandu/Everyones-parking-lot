import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import useModal from '../../hooks/useModal';
import useLoading from '../../hooks/useLoading';
import { numberFormat } from '../../lib/formatter';

import { requestGetPayInfo } from '../../api/payment';

import { Paths } from '../../paths/index';
import styles from './PaymentContainer.module.scss';
import { ButtonBase } from '@material-ui/core';

const Price = ({ price, deposit }) => {
    return (
        <div className={styles['final-payment']}>
            <div className={styles['total-payment']}>
                <div className={styles['title']}>최종 결제금액</div>
                <div className={styles['price']}>{numberFormat(60000)}원</div>
            </div>
            <div className={styles['payment']}>
                <div className={styles['title']}>대여비</div>
                <div className={styles['price']}>{numberFormat(price)}원</div>
            </div>
            <div className={styles['payment']}>
                <div className={styles['title']}>보증금</div>
                <div className="price">{numberFormat(deposit)}원</div>
            </div>
            <div className={styles['payment']}>
                <div className={styles['title']}>쿠폰 할인</div>
                <div className={styles['price']}>{numberFormat(-1000)}원</div>
            </div>
            <div className={styles['payment']}>
                <div className={styles['title']}>포인트 할인</div>
                <div className={styles['price']}>{numberFormat(-1000)}원</div>
            </div>
        </div>
    );
};

const enroll = [
    {
        id: 1,
        checked: false,
        description: '개인정보취급방침',
    },
    {
        id: 2,
        checked: false,
        description: '이용약관',
    },
];
const ParkingEnrollContainer = ({ location, match }) => {
    // const { place_id, start_time, end_time } = qs.parse(location.search, {
    //     ignoreQueryPrefix: true,
    // });
    const [parkingInfo, setParkingInfo] = useState();
    const { url, params } = match;
    const history = useHistory();
    const [isOpenCouponModal, openCouponModal] = useModal(
        url,
        params.modal,
        'coupon',
    );
    const [isOpenTypeModal, openTypeModal] = useModal(
        url,
        params.modal,
        'type',
    );
    const [onLoading, offLoading] = useLoading();
    useEffect(() => {
        const getPaymentInfo = async (place_id, start_time, end_time) => {
            onLoading('payment');
            const JWT_TOKEN = localStorage.getItem('user_id');
            const { data } = await requestGetPayInfo(
                JWT_TOKEN,
                place_id,
                start_time,
                end_time,
            );
            const { deposit, place, total_price } = data;
            const { place_name, place_images } = place;
            const image = Array.isArray(place_images)
                ? place_images[0].split('\\')[1]
                : '';
            setParkingInfo({
                title: place_name,
                image: image,
                price: total_price,
                deposit: deposit,
                start_time,
                end_time,
            });
            offLoading('payment');
        };
        getPaymentInfo(6, '2020/12/02 09:00', '2020/12/02 10:00');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div className={styles['parking-payment-container']}>
                <div className={styles['parking-payment-area']}>
                    <ParkingInfo parkingInfo={parkingInfo}></ParkingInfo>
                    <div className={styles['parking-payment-wrapper']}>
                        <div className={styles['title']}>{'대여자 연락처'}</div>
                        <VerifyPhone></VerifyPhone>
                    </div>
                    <div className={styles['parking-payment-wrapper']}>
                        <div className={styles['title']}>{'쿠폰 할인'}</div>

                        <ButtonBase
                            className={styles['coupon']}
                            onClick={openCouponModal}
                        >
                            오픈 이벤트 10% 할인 이벤트 쿠폰
                        </ButtonBase>
                    </div>
                    <div className={styles['parking-payment-wrapper']}>
                        <div className={styles['title']}>{'포인트 할인'}</div>
                        <Point></Point>
                    </div>
                </div>
                <div className={styles['bar']}></div>
                <div className={styles['parking-payment-area']}>
                    <div className={styles['parking-payment-wrapper']}>
                        <div className={styles['title']}>결제수단</div>
                        <ButtonBase
                            className={styles['payment']}
                            name="payment"
                            onClick={openTypeModal}
                        >
                            카카오페이
                        </ButtonBase>
                    </div>
                </div>
                <Price></Price>
                <div className={styles['parking-payment-area']}>
                    <CheckBox
                        allCheckTitle={enrollTitle}
                        checkListProps={enroll}
                    ></CheckBox>
                </div>
            </div>
            <FixedButton
                button_name={'68,000원 결제'}
                disable={false}
                onClick={() => history.push(Paths.main.payment_complete)}
            ></FixedButton>
            <EnrollCouponModal open={isOpenCouponModal}></EnrollCouponModal>
            <PaymentTypeModal
                open={isOpenTypeModal}
                match={match}
            ></PaymentTypeModal>
        </>
    );
};