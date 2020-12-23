/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import qs from 'qs';
import { useHistory } from 'react-router-dom';

import BasicButton from '../../../components/button/BasicButton';
import PaymentTypeModal from '../../../components/payment/PaymentTypeModal';
import CheckBox from '../../../components/checkbox/CheckBox';
import VerifyPhone from '../../../components/verifyphone/VerifyPhone';

import useModal from '../../../hooks/useModal';
import { useDialog } from '../../../hooks/useDialog';
import useToken from '../../../hooks/useToken';
import useLoading from '../../../hooks/useLoading';

import { requestGetDetailUseRental } from '../../../api/rental';
import { requestPostExtension } from '../../../api/extension';

import { numberFormat } from '../../../lib/formatter';
import { getFormatDateTime } from '../../../lib/calculateDate';

import classNames from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
import styles from './UseExtendContainer.module.scss';
import Information from '../../../static/asset/svg/Information';
import { Paths } from '../../../paths';

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

const SECOND = 1000;
const MINUITE = 60 * SECOND;
const HOUR = 60 * MINUITE;

const PaymentType = ({ paymentType, openTypeModal }) => {
    return (
        <div className={styles['parking-payment-area']}>
            <div className={styles['parking-payment-wrapper']}>
                <div className={styles['title']}>결제수단</div>
                <ButtonBase
                    className={styles['payment']}
                    name="payment"
                    onClick={openTypeModal}
                >
                    {paymentType.title}
                </ButtonBase>
            </div>
        </div>
    );
};

const UseExtendContainer = ({ match, location }) => {
    const token = useToken();
    const { url, params } = match;
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const { rental_id } = query;
    const history = useHistory();

    const [isOpenTypeModal, openTypeModal] = useModal(
        url,
        params.modal,
        `type?rental_id=${rental_id}`,
    );

    const [order, setOrder] = useState();
    const [endTime, setEndTime] = useState();
    const [operEndTime, setOperEndTime] = useState();
    const [checked, setChecked] = useState(false);
    const [paymentType, setPaymentType] = useState({
        title: '결제수단 선택',
        type: -1,
        card_id: 0,
    });
    const [extensionPrice, setExtensionPrice] = useState(0);
    const [checkPhone, setCheckPhone] = useState(false);
    const phoneRef = useRef(null);
    const openDialog = useDialog();
    const [onLoading, offLoading] = useLoading();

    const onClickExtend = useCallback(
        (ext, term) => {
            if (endTime + ext > operEndTime) {
                openDialog('운영시간이 끝난 뒤엔 대여를 하실 수 없습니다.');
            } else {
                setEndTime(endTime + ext);
                setExtensionPrice(
                    extensionPrice + (term * ext) / (30 * MINUITE),
                );
            }
        },
        [endTime, extensionPrice],
    );

    const getUseDetail = useCallback(async () => {
        onLoading('getUseDetail');
        try {
            const resOrder = await requestGetDetailUseRental(rental_id);

            if (resOrder.msg === 'success') {
                setOrder(resOrder);
                setEndTime(new Date(resOrder.order.rental_end_time).getTime());
                setOperEndTime(
                    new Date(resOrder.order.place.oper_end_time).getTime(),
                );
            } else {
                openDialog(resOrder.msg);
            }
        } catch (e) {
            console.error(e);
        }
        offLoading('getUseDetail');
    }, [rental_id, openDialog]);

    useEffect(() => {
        if (token !== null) getUseDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickExtendPayment = useCallback(
        async (rental_id, extensionPrice, type, endTime, card_id) => {
            if (!(checkPhone && type !== -1 && checked)) return;
            else {
                onLoading('extension');
                try {
                    const { data } = await requestPostExtension(
                        token,
                        rental_id,
                        extensionPrice,
                        type,
                        endTime,
                        card_id,
                    );

                    if (data.msg === 'success') {
                        openDialog(
                            `${getFormatDateTime(endTime)}까지 연장되었습니다.`,
                            '',
                            () =>
                                history.push(
                                    `${Paths.main.use.detail}?rental_id=${rental_id}`,
                                ),
                            false,
                            true,
                        );
                    } else openDialog(data.msg);
                } catch (e) {
                    console.error(e);
                }
                offLoading('extension');
            }
        },
        [order, checkPhone, paymentType, checked],
    );

    return (
        order !== undefined && (
            <>
                <div className={cx('container', 'top')}>
                    <div className={cx('card')}>
                        <div className={cx('title')}>
                            {order.order.place.place_name}
                        </div>

                        <div className={cx('content-area')}>
                            <Info
                                attribute={'대여시간'}
                                value={`${getFormatDateTime(
                                    order.order.rental_start_time,
                                )} ~ ${getFormatDateTime(
                                    order.order.rental_end_time,
                                )}`}
                            />
                            <Info
                                attribute={'주차요금'}
                                value={`${numberFormat(
                                    order.order.payment_price,
                                )}원`}
                                black={true}
                            />
                            <Info
                                attribute={'보증금'}
                                value={`${numberFormat(order.order.deposit)}원`}
                                black={true}
                            />
                        </div>

                        <div className={cx('information')}>
                            <Information /> 꼭 읽어주세요
                            <div className={cx('information-content')}>
                                보증금은 주차시간을 어기고 초과로 주차하시는
                                대여자에게 다시 환급이 불가합니다. 주차시간을
                                준수하신다면 보증금을 환급 받으실 수 있습니다.
                                주차시간을 초과할 경우 대여자의 차량이 견인 조치
                                될 수 있음을 미리 알려드립니다.
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('bar')} />

                <div className={cx('container')}>
                    <div className={cx('extend-title')}>연장 시간 선택</div>
                    <div className={cx('button-area')}>
                        <ButtonBase
                            onClick={() =>
                                onClickExtend(
                                    30 * MINUITE,
                                    order.order.term_price,
                                )
                            }
                        >
                            + 30분
                        </ButtonBase>
                        <ButtonBase
                            onClick={() =>
                                onClickExtend(HOUR, order.order.term_price)
                            }
                        >
                            + 1시간
                        </ButtonBase>
                        <ButtonBase
                            onClick={() =>
                                onClickExtend(2 * HOUR, order.order.term_price)
                            }
                        >
                            + 2시간
                        </ButtonBase>
                        <ButtonBase
                            onClick={() =>
                                onClickExtend(6 * HOUR, order.order.term_price)
                            }
                        >
                            + 6시간
                        </ButtonBase>
                        <ButtonBase
                            onClick={() =>
                                onClickExtend(12 * HOUR, order.order.term_price)
                            }
                        >
                            + 12시간
                        </ButtonBase>
                        <ButtonBase
                            onClick={() =>
                                onClickExtend(24 * HOUR, order.order.term_price)
                            }
                        >
                            + 1일
                        </ButtonBase>
                    </div>
                </div>

                <div className={cx('checkout-time-container')}>
                    <div className={cx('box')}>
                        <div className={cx('checkout-time-area')}>
                            <div className={cx('comment')}>
                                연장 후 출차 시간
                            </div>
                            <div className={cx('checkout-time')}>
                                {getFormatDateTime(endTime)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('container')}>
                    <div className={cx('input-title')}>휴대폰 번호 인증</div>
                    <VerifyPhone setCheck={setCheckPhone} ref={phoneRef} />
                </div>

                <PaymentType
                    paymentType={paymentType}
                    openTypeModal={openTypeModal}
                />

                <PaymentTypeModal
                    open={isOpenTypeModal}
                    match={match}
                    setPaymentType={setPaymentType}
                ></PaymentTypeModal>

                <div className={cx('extend-price')}>
                    <Info
                        attribute={'연장 추가 금액'}
                        value={`${numberFormat(extensionPrice)}원`}
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
                        button_name={`${extensionPrice}원 결제`}
                        disable={
                            !(checkPhone && paymentType.type !== -1 && checked)
                        }
                        onClick={() =>
                            onClickExtendPayment(
                                order.order.rental_id,
                                extensionPrice,
                                paymentType.type,
                                endTime,
                                paymentType.card_id,
                            )
                        }
                    />
                </div>
            </>
        )
    );
};

export default UseExtendContainer;
