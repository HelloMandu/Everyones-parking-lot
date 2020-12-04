import React, { useCallback, useState } from 'react';
import qs from 'qs';

import BasicButton from '../../../components/button/BasicButton';
import PaymentTypeModal from '../../../components/payment/PaymentTypeModal';
import CheckBox from '../../../components/checkbox/CheckBox';

import useModal from '../../../hooks/useModal';
import { useDialog } from '../../../hooks/useDialog'

// import { requestGetDetailUseRental } from '../../../api/rental';
import { requestPostExtension } from '../../../api/extension';

import { numberFormat } from '../../../lib/formatter';
import { getFormatDateTime } from '../../../lib/calculateDate';

import classNames from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
import styles from './UseExtendContainer.module.scss';
import Information from '../../../static/asset/svg/Information';

const cx = classNames.bind(styles);

const Info = ({ attribute, value, black }) => {
    return (
        <div className={cx('attribute-wrapper')}>
            <div className={cx('attribute')}>{attribute}</div>
            <div className={cx('value', { black: black })}>{value}</div>
        </div>
    );
};

const enrollTitle = '대여자의 정보 제공 및 모든 약관에 동의합니다.';

const enroll = [
    {
        id: 1,
        checked: false,
        description: '개인정보취급방침 (필수)',
    },
    {
        id: 2,
        checked: false,
        description: '이용약관 (필수)',
    },
];

const useDetail = {
    rental_id: 1,
    total_price: 0,
    term_price: 1000,
    deposit: 10000,
    point_price: 0,
    payment_price: 60000,
    cancle_price: 0,
    calculated_price: 0,
    payment_type: 0,
    rental_start_time: '2020-12-02 16:41:01',
    rental_end_time: '2020-12-02 20:59:37',
    cancel_reason: '',
    cancel_time: 0,
    calculated_time: '',
    deleted: 0,
    created_at: 0,
    updated_at: 0,
    order_user_id: 0,
    place_user_id: 0,
    ppayment_id: 0,
    place_id: 1,
    cp_id: 0,
};

const SECOND = 1000;
const MINUITE = 60 * SECOND;
const HOUR = 60 * MINUITE;

const UseExtendContainer = ({ match, location }) => {
    const { url, params } = match;
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const { id } = query;

    const [isOpenTypeModal, openTypeModal] = useModal(
        url,
        params.modal,
        `type?id=${id}`,
    );

    const checkoutTime = new Date(useDetail.rental_end_time).getTime();

    const [endTime, setEndTime] = useState(checkoutTime);
    const [checked, setChecked] = useState(false);
    const [paymentType, setPaymentType] = useState('결제수단 선택');
    const token = localStorage.getItem('user_id');
    const openDialog = useDialog()

    const onClickExtend = useCallback(
        (ext) => {
            setEndTime(endTime + ext);
        },
        [endTime],
    );

    // const getUseDetail = useCallback(async () => {
    //     const { data } = await requestGetDetailUseRental(token, id);
    //     const { msg, order, coupon, place_user } = data;
    //     if (msg === 'success') {
    //         setUseDetail({
    //             order,
    //             coupon,
    //             place_user,
    //         });
    //          여기 setEndTime
    //     } else {
    //         openDialog(msg);
    //     }
    // }, [id, openDialog]);

    // useEffect(() => {
    //     getUseDetail();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const onClickExtendPayment = useCallback(async () => {
        const { data } = await requestPostExtension(
            token,
            useDetail.rental_id,
            useDetail.rental_end_time,
            useDetail.calculated_time,
            10000,
        );

        if(data.msg === 'success'){

        } else {
            openDialog(data.msg)
        }
    }, [openDialog, token]);

    return (
        <>
            <div className={cx('container', 'top')}>
                <div className={cx('card')}>
                    <div className={cx('title')}>
                        {useDetail.place_id}.title
                    </div>

                    <div className={cx('content-area')}>
                        <Info
                            attribute={'대여시간'}
                            value={`${getFormatDateTime(
                                useDetail.rental_start_time,
                            )} ~ ${getFormatDateTime(
                                useDetail.rental_end_time,
                            )}`}
                        />
                        <Info
                            attribute={'주차요금'}
                            value={`${numberFormat(useDetail.payment_price)}원`}
                            black={true}
                        />
                        <Info
                            attribute={'보증금'}
                            value={`${numberFormat(useDetail.deposit)}원`}
                            black={true}
                        />
                    </div>

                    <div className={cx('information')}>
                        <Information /> 꼭 읽어주세요
                        <div className={cx('information-content')}>
                            보증금은 주차시간을 어기고 초과로 주차하시는
                            대여자에게 다시 환급이 불가합니다. 주차시간을
                            준수하신다면 보증금을 환급 받으실 수 있습니다.
                            주차시간을 초과할 경우 대여자의 차량이 견인 조치 될
                            수 있음을 미리 알려드립니다.
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('bar')} />

            <div className={cx('container')}>
                <div className={cx('extend-title')}>연장 시간 선택</div>
                <div className={cx('button-area')}>
                    <ButtonBase onClick={() => onClickExtend(30 * MINUITE)}>
                        + 30분
                    </ButtonBase>
                    <ButtonBase onClick={() => onClickExtend(HOUR)}>
                        + 1시간
                    </ButtonBase>
                    <ButtonBase onClick={() => onClickExtend(2 * HOUR)}>
                        + 2시간
                    </ButtonBase>
                    <ButtonBase onClick={() => onClickExtend(6 * HOUR)}>
                        + 6시간
                    </ButtonBase>
                    <ButtonBase onClick={() => onClickExtend(12 * HOUR)}>
                        + 12시간
                    </ButtonBase>
                    <ButtonBase onClick={() => onClickExtend(24 * HOUR)}>
                        + 1일
                    </ButtonBase>
                </div>
            </div>

            <div className={cx('checkout-time-container')}>
                <div className={cx('box')}>
                    <div className={cx('checkout-time-area')}>
                        <div className={cx('comment')}>연장 후 출차 시간</div>
                        <div className={cx('checkout-time')}>
                            {getFormatDateTime(endTime)}
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('parking-payment-area')}>
                <div className={cx('parking-payment-wrapper')}>
                    <div className={cx('title')}>결제수단</div>
                    <div
                        className={cx('payment')}
                        name="payment"
                        onClick={openTypeModal}
                    >
                        {paymentType}
                    </div>
                </div>
            </div>

            <PaymentTypeModal
                open={isOpenTypeModal}
                match={match}
                setPaymentType={setPaymentType}
            ></PaymentTypeModal>

            <div className={cx('extend-price')}>
                <Info
                    attribute={'연장 추가 금액'}
                    value={`${numberFormat(68000)}원`}
                />
            </div>

            <div className={styles['parking-payment-area']}>
                <CheckBox
                    allCheckTitle={enrollTitle}
                    checkListProps={enroll}
                    setCheck={setChecked}
                ></CheckBox>
            </div>

            <div className={cx('container')}>
                <BasicButton
                    button_name={`${numberFormat(68000)}원 결제`}
                    disable={!(paymentType !== '결제수단 선택' && checked)}
                    onClick={onClickExtendPayment}
                />
            </div>
        </>
    );
};

export default UseExtendContainer;
