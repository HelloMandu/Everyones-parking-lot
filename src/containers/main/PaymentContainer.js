import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ButtonBase } from '@material-ui/core';
import qs from 'qs';

import useModal from '../../hooks/useModal';
import { useDialog } from '../../hooks/useDialog';

import { imageFormat, numberFormat } from '../../lib/formatter';
import { requestGetPayInfo } from '../../api/payment';
import { requestPostRental } from '../../api/rental';

import { Paths } from '../../paths/index';

import PaymentTypeModal from '../../components/payment/PaymentTypeModal';
import EnrollCouponModal from '../../components/payment/EnrollCouponModal';

import ParkingInfo from '../../components/parking/ParkingInfo';
import VerifyPhone from '../../components/verifyphone/VerifyPhone';
import CheckBox from '../../components/checkbox/CheckBox';
import FixedButton from '../../components/button/FixedButton';
import InputBox from '../../components/inputbox/InputBox';
import ConfirmButton from '../../components/button/ConfirmButton';
import ImageModal from '../../components/modal/ImageModal';

import styles from './PaymentContainer.module.scss';
import useToken from '../../hooks/useToken';

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

const getRentalPrice = (parkingInfo) => {
    if (!parkingInfo) {
        return 0;
    }
    const { price, deposit } = parkingInfo;
    return price + deposit;
};

const getSalePoint = (coupon, point) => {
    const pointInt = point === '' ? 0 : parseInt(point);
    return coupon + pointInt;
};

const Point = ({
    totalPrice,
    maxPrice,
    point,
    usePoint,
    setUsePoint,
    onChange,
}) => {
    const [isTotal, setIsTotal] = useState(false);
    const handleTotalPoint = useCallback(() => setUsePoint(maxPrice), [
        setUsePoint,
        maxPrice,
    ]);
    useEffect(
        () =>
            setIsTotal(
                parseInt(point) === parseInt(usePoint) ||
                    parseInt(totalPrice) === 0,
            ),
        [point, totalPrice, usePoint],
    );
    return (
        <section className={styles['parking-payment-wrapper']}>
            <h3 className={styles['title']}>{'포인트 할인'}</h3>
            <div className={styles['point-wrapper']}>
                <InputBox
                    className={'input-box'}
                    type={'number'}
                    value={usePoint}
                    placeholder={'사용하실 포인트를 입력해주세요'}
                    onChange={onChange}
                ></InputBox>
                <div className={styles['use-point']}>
                    <div className={styles['point']}>
                        내 보유 포인트 <span>{numberFormat(point)}P</span>
                    </div>
                    <div className={styles['confirm-button']}>
                        <ConfirmButton
                            button_name={'전체사용'}
                            disable={isTotal}
                            onClick={handleTotalPoint}
                        ></ConfirmButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

const PaymentType = ({ paymentType, openTypeModal }) => {
    return (
        <section className={styles['parking-payment-area']}>
            <div className={styles['parking-payment-wrapper']}>
                <h3 className={styles['title']}>결제수단</h3>
                <ButtonBase
                    className={styles['payment']}
                    name="payment"
                    onClick={openTypeModal}
                >
                    {paymentType.title}
                </ButtonBase>
            </div>
        </section>
    );
};

const Price = ({ parkingInfo, totalPrice, coupon, usePoint }) => {
    if (!parkingInfo) {
        return null;
    }
    const { price, deposit } = parkingInfo;
    return (
        <section className={styles['final-payment']}>
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
                <div className={styles['price']}>
                    {numberFormat(usePoint === '' ? 0 : usePoint)}원
                </div>
            </div>
        </section>
    );
};

const ParkingEnrollContainer = ({ location, match }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const JWT_TOKEN = useToken();
    const { place_id, start_time, end_time } = query;
    const { url, params } = match;
    const history = useHistory();
    const openDialog = useDialog();
    const [isOpenCouponModal, handleCouponModal] = useModal(
        url,
        params.modal,
        `coupon${location.search}`,
    );
    const [isOpenTypeModal, handleTypeModal] = useModal(
        url,
        params.modal,
        `type${location.search}`,
    );

    const [isOpenImageModal, handleImageModal] = useModal(
        url,
        params.modal,
        `image_view${location.search}`,
    );

    const [parkingImages, setParkingImages] = useState([]);

    const [parkingInfo, setParkingInfo] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    const { point } = useSelector((state) => state.user);
    const [usePoint, setUsePoint] = useState('');
    const [selectedCoupon, setSelectedCoupon] = useState({
        cp_subject: '쿠폰 선택',
        cp_price: 0,
        cp_id: 0,
    });

    const onChangeUsePoint = useCallback(
        (e) => {
            const value = e.target.value;
            const { cp_price } = selectedCoupon;
            const { price } = parkingInfo;
            if (value < 0) {
                return;
            } else if (value > point || value > price - cp_price) {
                openDialog(
                    '사용 불가',
                    '보유 포인트 이상의 금액은 사용하실 수 없습니다',
                );
            } else {
                setUsePoint(parseInt(value) || '');
            }
        },
        [openDialog, parkingInfo, point, selectedCoupon],
    );
    const [paymentType, setPaymentType] = useState({
        title: '결제수단 선택',
        type: -1,
        card_id: 0,
    });
    const phoneRef = useRef(null);
    const [phoneCheck, setPhoneCheck] = useState(false);
    const [agreeCheck, setAgreeCheck] = useState(false);
    const [finalCheck, setFinalCheck] = useState(false);
    useEffect(
        () => setFinalCheck(phoneCheck && agreeCheck && paymentType.type >= 0),
        [agreeCheck, paymentType, phoneCheck],
    );
    useEffect(() => {
        if (!parkingInfo) {
            return;
        }
        const { cp_price } = selectedCoupon;
        const rentalPrice = getRentalPrice(parkingInfo);
        const salePrice = getSalePoint(cp_price, usePoint);
        setTotalPrice(rentalPrice - salePrice);
    }, [parkingInfo, selectedCoupon, usePoint]);

    const handlePayment = useCallback(async () => {
        const { price, deposit } = parkingInfo;
        const { type, card_id } = paymentType;
        const { cp_id } = selectedCoupon;
        const { msg, rental_id } = await requestPostRental(
            JWT_TOKEN,
            place_id,
            cp_id,
            start_time,
            end_time,
            price,
            usePoint,
            deposit,
            type,
            card_id,
            phoneRef.current.phoneNumber,
        );
        if (msg === 'success') {
            history.push(
                `${Paths.main.payment_complete}?rental_id=${rental_id}`,
            );
        } else {
            openDialog('결제실패', msg);
        }
    }, [JWT_TOKEN, end_time, history, openDialog, parkingInfo, paymentType, place_id, selectedCoupon, start_time, usePoint]);

    const getPaymentInfo = useCallback(
        async (place_id, start_time, end_time) => {
            const { data } = await requestGetPayInfo(
                JWT_TOKEN,
                place_id,
                start_time,
                end_time,
            );
            if (data.msg === 'success') {
                const { deposit, place, total_price: price } = data;
                const { place_name: title, place_images } = place;
                const image = place_images[0];
                setParkingImages(imageFormat(place_images));
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
                openDialog('결제정보를 불러오는데 실패했습니다.', '', () =>
                    history.goBack(),
                );
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JWT_TOKEN],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getPaymentInfo(place_id, start_time, end_time), []);
    return (
        <>
            <main className={styles['parking-payment-container']}>
                <div className={styles['parking-payment-area']}>
                    <ParkingInfo parkingInfo={parkingInfo} onClick={handleImageModal}></ParkingInfo>
                    <section className={styles['parking-payment-wrapper']}>
                        <h3 className={styles['title']}>{'대여자 연락처'}</h3>
                        <VerifyPhone
                            ref={phoneRef}
                            setCheck={setPhoneCheck}
                        ></VerifyPhone>
                    </section>
                    <section className={styles['parking-payment-wrapper']}>
                        <h3 className={styles['title']}>{'쿠폰 할인'}</h3>
                        <ButtonBase
                            className={styles['coupon']}
                            onClick={handleCouponModal}
                        >
                            {selectedCoupon.cp_subject}
                        </ButtonBase>
                    </section>
                    <Point
                        totalPrice={
                            getRentalPrice(parkingInfo) -
                            selectedCoupon.cp_price
                        }
                        maxPrice={parkingInfo.price - selectedCoupon.cp_price}
                        point={point}
                        usePoint={usePoint}
                        setUsePoint={setUsePoint}
                        onChange={onChangeUsePoint}
                    ></Point>
                </div>
                <div className={styles['bar']}></div>
                <PaymentType
                    paymentType={paymentType}
                    openTypeModal={handleTypeModal}
                />
                <Price
                    totalPrice={totalPrice}
                    parkingInfo={parkingInfo}
                    usePoint={usePoint}
                    coupon={selectedCoupon.cp_price}
                ></Price>
                <div className={styles['parking-payment-area']}>
                    <CheckBox
                        allCheckTitle={enrollTitle}
                        checkListProps={enroll}
                        setCheck={setAgreeCheck}
                    ></CheckBox>
                </div>
            </main>
            <FixedButton
                button_name={`${numberFormat(totalPrice)}원 결제`}
                disable={!finalCheck}
                onClick={handlePayment}
            ></FixedButton>
            <EnrollCouponModal
                open={isOpenCouponModal}
                setCoupon={setSelectedCoupon}
                placeId={place_id}
                price={parkingInfo.price}
            ></EnrollCouponModal>
            <PaymentTypeModal
                open={isOpenTypeModal}
                match={match}
                setPaymentType={setPaymentType}
            ></PaymentTypeModal>
            <ImageModal
                open={isOpenImageModal}
                images={parkingImages}
                title={parkingInfo.title}
                handleClose={handleImageModal}
            ></ImageModal>
        </>
    );
};

export default ParkingEnrollContainer;
