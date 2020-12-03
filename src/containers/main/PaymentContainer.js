import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';

import useInput from '../../hooks/useInput';
import useModal from '../../hooks/useModal';
import useLoading from '../../hooks/useLoading';
import { useDialog } from '../../hooks/useDialog';
import { numberFormat } from '../../lib/formatter';

import { requestGetPayInfo } from '../../api/payment';

import { Paths } from '../../paths/index';

import PaymentTypeModal from '../../components/payment/PaymentTypeModal';
import EnrollCouponModal from '../../components/payment/EnrollCouponModal';

import ParkingInfo from '../../components/parking/ParkingInfo';
import VerifyPhone from '../../components/verifyphone/VerifyPhone';
import CheckBox from '../../components/checkbox/CheckBox';
import FixedButton from '../../components/button/FixedButton';
import InputBox from '../../components/inputbox/InputBox';
import ConfirmButton from '../../components/button/ConfirmButton';

import styles from './PaymentContainer.module.scss';
import { ButtonBase } from '@material-ui/core';

const Point = () => {
    const [point, handleChangePoint] = useInput('');
    return (
        <div className={styles['point-wrapper']}>
            <InputBox
                className={'input-box'}
                type={'text'}
                value={point}
                placeholder={'사용하실 포인트를 입력해주세요'}
                onChange={handleChangePoint}
            ></InputBox>
            <div className={styles['use-point']}>
                <div className={styles['point']}>
                    내 보유 포인트 <span>35,000P</span>
                </div>
                <div className={styles['confirm-button']}>
                    <ConfirmButton
                        button_name={'전체사용'}
                        disable={false}
                    ></ConfirmButton>
                </div>
            </div>
        </div>
    );
};

const Price = ({ parkingInfo, totalPrice = 0,  coupon = 0, point = 0 }) => {
    if (!parkingInfo) {
        return null;
    }
    const { price, deposit } = parkingInfo;
    return (
        <div className={styles['final-payment']}>
            <div className={styles['total-payment']}>
                <div className={styles['title']}>최종 결제금액</div>
                <div className={styles['price']}>
                    {numberFormat(totalPrice)}원
                </div>
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
                <div className={styles['price']}>{numberFormat(coupon)}원</div>
            </div>
            <div className={styles['payment']}>
                <div className={styles['title']}>포인트 할인</div>
                <div className={styles['price']}>{numberFormat(point)}원</div>
            </div>
        </div>
    );
};

const enrollTitle = '대여자의 정보 제공 및 모든 약관에 동의합니다.';

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
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { place_id, start_time, end_time } = query;
    const { url, params } = match;
    const history = useHistory();
    const [isOpenCouponModal, openCouponModal] = useModal(
        url,
        params.modal,
        `coupon${location.search}`,
    );
    const [isOpenTypeModal, openTypeModal] = useModal(
        url,
        params.modal,
        `type${location.search}`,
    );

    const [parkingInfo, setParkingInfo] = useState();
    const [totalPrice, setTotalPrice] = useState(0);

    const [onLoading, offLoading] = useLoading();
    const openDialog = useDialog();
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
            if (data.msg === 'success') {
                const { deposit, place, total_price: price } = data;
                const { place_name: title, place_images } = place;
                const image = Array.isArray(place_images)
                    ? place_images[0].split('\\')[1]
                    : '';
                setParkingInfo({
                    title,
                    image,
                    price,
                    deposit,
                    start_time,
                    end_time,
                });
                setTotalPrice(price + deposit);
            } else {
                openDialog('결제정보를 불러오는데 실패했습니다', '', () =>
                    history.goBack(),
                );
            }
            offLoading('payment');
        };
        // getPaymentInfo(6, '2020/12/02 09:00', '2020/12/02 10:00');
        getPaymentInfo(place_id, start_time, end_time);
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
                <Price
                    totalPrice={totalPrice}
                    parkingInfo={parkingInfo}
                ></Price>
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

export default ParkingEnrollContainer;
