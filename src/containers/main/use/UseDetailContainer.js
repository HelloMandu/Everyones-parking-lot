import React, { useEffect, useReducer, useState } from 'react';
import qs from 'qs';
import { Link, useHistory } from 'react-router-dom';

import BasicButton from '../../../components/button/BasicButton';
import Refund from '../../../components/use/Refund';

import { useDialog } from '../../../hooks/useDialog';

import { requestGetDetailUseRental } from '../../../api/rental';

import { calculateDate, getFormatDateTime } from '../../../lib/calculateDate';
import { numberFormat } from '../../../lib/formatter';
import { rentalStatus } from '../../../lib/rentalStatus';
import { paymentType } from '../../../lib/paymentType';

import { Paths } from '../../../paths';

import classnames from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
import styles from './UseDetailContainer.module.scss';
import Parking from '../../../static/asset/png/parking.png';
import Tel from '../../../static/asset/svg/use/Tel';
import MessageBox from '../../../static/asset/svg/use/MessageBox';
import XButton from '../../../static/asset/svg/auth/XButton';

const cx = classnames.bind(styles);

const Info = ({ attribute, value, black }) => {
    return (
        <div className={cx('attribute-wrapper')}>
            <div className={cx('attribute')}>{attribute}</div>
            <div className={cx('value', { black: black })}>{value}</div>
        </div>
    );
};

const Button = ({ name, children }) => {
    return (
        <ButtonBase>
            {children}
            {name}
        </ButtonBase>
    );
};

const UseDetailContainer = ({ location }) => {
    const history = useHistory();
    const openDialog = useDialog();
    const [detail, setDetail] = useState();

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const { id } = query;

    const [modalState, dispatchHandle] = useReducer(
        (state, action) => {
            return {
                ...state,
                [action.type]: action.payload,
            };
        },
        { refund: false },
    );

    useEffect(() => {
        const getUseDetail = async () => {
            const { msg, order, review } = await requestGetDetailUseRental(id);
            if (msg === 'success') {
                setDetail({
                    order,
                    review,
                });
            } else {
                openDialog(msg);
            }
        }
        getUseDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        detail !== undefined && (
            <>
            {console.log(detail)}
                <div className={cx('container', 'top')}>
                    <div className={cx('title-area')}>
                        <div className={cx('title')}>
                            {detail.order.place.place_name}
                        </div>
                        <div className={cx('rendal-status')}>
                            {rentalStatus(detail.order)}
                        </div>
                    </div>
                    <div
                        className={cx('x-button')}
                        onClick={() => history.goBack()}
                    >
                        <XButton />
                    </div>
                    <div className={cx('card')}>
                        <img src={Parking} alt="" />

                        <div className={cx('card-title')}>주차 대여 정보</div>

                        <div className={cx('content-area')}>
                            <Info
                                attribute={'주차 공간 이름'}
                                value={detail.order.place.place_name}
                            />
                            <Info
                                attribute={'대여시간'}
                                value={`${getFormatDateTime(
                                    detail.order.rental_start_time,
                                )} ~ ${getFormatDateTime(
                                    detail.order.rental_end_time,
                                )}`}
                                black={true}
                            />
                            <Info
                                attribute={'운영시간'}
                                value={`${getFormatDateTime(
                                    detail.order.place.oper_start_time,
                                )} ~ ${getFormatDateTime(
                                    detail.order.place.oper_end_time,
                                )}`}
                            />
                            <Info
                                attribute={'주차요금'}
                                value={`30분당 ${numberFormat(
                                    detail.order.place.place_fee,
                                )}원`}
                                black={true}
                            />
                            <Info
                                attribute={'제공자 연락처'}
                                value={`${detail.order.user.phone_number}`}
                                black={true}
                            />
                            <Info
                                attribute={'이전 대여자 연락처'}
                                value={'ㄱㄷ'}
                            />
                        </div>

                        <div className={cx('button-area')}>
                            <Button name={'고객센터 연결'}>
                                <Tel />
                            </Button>
                            <Link to={Paths.main.review.write + `?id=${id}`}>
                                <Button name={'리뷰 작성 하기'}>
                                    <MessageBox />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={cx('bar')} />

                <div className={cx('container')}>
                    <div className={cx('discount-area')}>
                        <div className={cx('discount-title')}>할인 정보</div>
                        <div className={cx('content-area')}>
                            <Info
                                attribute={'사용 쿠폰'}
                                value={`useDetail.coupon.cp_subject`}
                            />
                            <Info
                                attribute={'쿠폰 할인'}
                                value={`useDetail.coupon.cp_price원`}
                                black={true}
                            />
                            <Info
                                attribute={'포인트 사용'}
                                value={`useDetail.order.point_price원`}
                                black={true}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('bar')} />

                <div className={cx('container')}>
                    <div className={cx('discount-area')}>
                        <div className={cx('discount-title')}>결제 정보</div>
                        <div className={cx('content-area')}>
                            <Info
                                attribute={'결제 일시'}
                                value={calculateDate(detail.order.createdAt)}
                            />
                            <Info
                                attribute={'결제수단'}
                                value={paymentType(detail.order.payment_type)}
                                black={true}
                            />
                            <Info
                                attribute={'결제금액'}
                                value={'원'}
                                black={true}
                            />
                        </div>
                    </div>

                    <div className={cx('button-area')}>
                        <BasicButton
                            button_name={'대여 취소하기'}
                            disable={false}
                            color={'white'}
                            onClick={() =>
                                dispatchHandle({
                                    type: 'refund',
                                    payload: true,
                                })
                            }
                        />
                        <Link to={Paths.main.use.extend + `?id=${id}`}>
                            <BasicButton
                                button_name={'연장 하기'}
                                disable={false}
                            />
                        </Link>
                    </div>
                </div>

                <Refund
                    open={modalState.refund}
                    handleClose={() =>
                        dispatchHandle({ type: 'refund', payload: false })
                    }
                    paymentPrice={'useDetail.order.payment_price'}
                    deposit={'useDetail.order.deposit'}
                    couponPrice={'useDetail.coupon.cp_price'}
                    pointPrice={'useDetail.order.point_price'}
                />
            </>
        )
    );
};

export default UseDetailContainer;
