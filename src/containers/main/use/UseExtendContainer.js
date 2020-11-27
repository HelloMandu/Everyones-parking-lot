import React from 'react';
import qs from 'qs';
import classNames from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

import BasicButton from '../../../components/button/BasicButton';
import PaymentTypeModal from '../../../components/payment/PaymentTypeModal';
import CheckBox from '../../../components/checkbox/CheckBox';

import useModal from '../../../hooks/useModal';

import { numberFormat } from '../../../lib/formatter';

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
    console.log(match);
    return (
        <>
            {console.log(id)}
            <div className={cx('container', 'top')}>
                <div className={cx('card')}>
                    <div className={cx('title')}>길동이의 주차 공간</div>

                    <div className={cx('content-area')}>
                        <Info
                            attribute={'대여시간'}
                            value={'10/5(수)14:00 ~ 10/5(수)16:00'}
                        />
                        <Info
                            attribute={'주차요금'}
                            value={`${numberFormat(60000)}원`}
                            black={true}
                        />
                        <Info
                            attribute={'보증금'}
                            value={`${numberFormat(10000)}원`}
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
                    <ButtonBase>+ 30분</ButtonBase>
                    <ButtonBase>+ 1시간</ButtonBase>
                    <ButtonBase>+ 2시간</ButtonBase>
                    <ButtonBase>+ 6시간</ButtonBase>
                    <ButtonBase>+ 12시간</ButtonBase>
                    <ButtonBase>+ 1일</ButtonBase>
                </div>
            </div>

            <div className={cx('checkout-time-container')}>
                <div className={cx('box')}>
                    <div className={cx('checkout-time-area')}>
                        <div className={cx('comment')}>연장 후 출차 시간</div>
                        <div className={cx('checkout-time')}>
                            10/05(수) 19:00
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
                        카카오페이
                    </div>
                </div>
            </div>

            <PaymentTypeModal
                open={isOpenTypeModal}
                match={match}
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
                ></CheckBox>
            </div>

            <div className={cx('container')}>
                <BasicButton button_name={`${numberFormat(68000)}원 결제`} disable={false} />
            </div>
        </>
    );
};

export default UseExtendContainer;
