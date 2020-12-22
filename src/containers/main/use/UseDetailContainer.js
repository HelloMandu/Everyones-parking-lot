import React, { useCallback, useEffect, useReducer, useState } from 'react';
import qs from 'qs';
import { Link, useHistory } from 'react-router-dom';

import BasicButton from '../../../components/button/BasicButton';
import Refund from '../../../components/use/Refund';
import ImageModal from '../../../components/modal/ImageModal';

import { useDialog } from '../../../hooks/useDialog';
import useToken from '../../../hooks/useToken';
import useLoading from '../../../hooks/useLoading';
import useModal from '../../../hooks/useModal';

import { requestGetDetailUseRental } from '../../../api/rental';

import { getFormatDateTime } from '../../../lib/calculateDate';
import { numberFormat } from '../../../lib/formatter';
import { rentalStatus } from '../../../lib/rentalStatus';
import { paymentType } from '../../../lib/paymentType';
import { isEmpty } from '../../../lib/formatChecker';
import { imageFormat } from '../../../lib/formatter';

import { Paths } from '../../../paths';

import classnames from 'classnames/bind';
import { ButtonBase, IconButton } from '@material-ui/core';
import styles from './UseDetailContainer.module.scss';
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

const Button = ({ name, disable, onClick, addition, children }) => {
    return (
        !disable && (
            <ButtonBase onClick={onClick} style={addition ? { width: '100%' } : {}}>
                {children}
                {name}
            </ButtonBase>
        )
    );
};

const UseDetailContainer = ({ match, location }) => {
    const token = useToken();
    const history = useHistory();
    const openDialog = useDialog();
    const [order, setOrder] = useState({});
    const [review, setReview] = useState();
    const [status, setStatus] = useState(false);
    const [onLoading, offLoading] = useLoading();

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const { rental_id, from_list, place_id } = query;

    const [modalState, dispatchHandle] = useReducer(
        (state, action) => {
            return {
                ...state,
                [action.type]: action.payload,
            };
        },
        { refund: false },
    );

    const { url, params } = match;
    const [isOpenImageView, handleImageView] = useModal(
        url,
        params.modal,
        `image_view?place_id=${place_id}`,
    );

    const getUseDetail = useCallback(async () => {
        onLoading('getUseDetail');
        try {
            const {
                msg,
                order,
                review,
                prev_order,
            } = await requestGetDetailUseRental(rental_id);

            if (msg === 'success') {
                setOrder(order, prev_order);
                setReview(review);
                if (
                    rentalStatus(order) === '이용완료' ||
                    rentalStatus(order) === '이용취소'
                )
                    setStatus(true);
            } else {
                openDialog(msg);
            }
        } catch (e) {
            console.error(e);
            offLoading('getUseDetail');
        }
        offLoading('getUseDetail');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rental_id, openDialog]);

    useEffect(() => {
        if (token !== null) getUseDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        !isEmpty(order) && (
            <>
                <div className={cx('container', 'top')}>
                    <div className={cx('title-area')}>
                        <div className={cx('title')}>
                            {order.place.place_name}
                        </div>
                        <div className={cx('rendal-status')}>
                            {rentalStatus(order)}
                        </div>
                    </div>
                    <IconButton
                        className={cx('x-button')}
                        onClick={() => {
                            if (from_list) history.goBack();
                            else history.replace(Paths.main.use.list);
                        }}
                    >
                        <XButton />
                    </IconButton>
                    <div className={cx('card')}>
                        <ButtonBase
                            component="div"
                            className={cx('card-img')}
                            style={{
                                backgroundImage: `url('${imageFormat(
                                    order.place.place_images[0],
                                )}')`,
                            }}
                            onClick={handleImageView}
                        />
                        <div className={cx('card-title')}>주차 대여 정보</div>

                        <div className={cx('content-area')}>
                            <Info
                                attribute={'주차 공간 이름'}
                                value={order.place.place_name}
                            />
                            <Info
                                attribute={'대여시간'}
                                value={`${getFormatDateTime(
                                    order.rental_start_time,
                                )} ~ ${getFormatDateTime(
                                    order.rental_end_time,
                                )}`}
                                black={true}
                            />
                            <Info
                                attribute={'운영시간'}
                                value={`${getFormatDateTime(
                                    order.place.oper_start_time,
                                )} ~ ${getFormatDateTime(
                                    order.place.oper_end_time,
                                )}`}
                            />
                            <Info
                                attribute={'주차요금'}
                                value={`30분당 ${numberFormat(
                                    order.place.place_fee,
                                )}원`}
                                black={true}
                            />
                            <Info
                                attribute={'제공자 연락처'}
                                value={order.user.phone_number}
                                black={true}
                            />
                            <Info
                                attribute={'이전 대여자 연락처'}
                                value={
                                    order.user ? order.user.phone_number : '-'
                                }
                            />
                        </div>

                        <div className={cx('button-area')}>
                            <Button name={'고객센터 연결'} addition={rentalStatus(order) === '이용대기'}>
                                <Tel />
                            </Button>
                            <Button
                                name={`리뷰 ${review ? '수정' : '작성'} 하기`}
                                disable={rentalStatus(order) === '이용대기'}
                                onClick={() =>
                                    history.push(
                                        Paths.main.review.write +
                                        `?rental_id=${rental_id}`,
                                    )
                                }
                            >
                                <MessageBox />
                            </Button>
                        </div>
                    </div>
                </div>

                {(order.coupon || order.point_price !== 0) && (
                    <>
                        <div className={cx('bar')} />
                        <div className={cx('container')}>
                            <div className={cx('discount-area')}>
                                <div className={cx('discount-title')}>
                                    할인 정보
                                </div>
                                <div className={cx('content-area')}>
                                    {order.coupon && (
                                        <>
                                            <Info
                                                attribute={'사용 쿠폰'}
                                                value={`${order.coupon.cp_subject}`}
                                            />
                                            <Info
                                                attribute={'쿠폰 할인'}
                                                value={`${numberFormat(
                                                    order.coupon.cp_price,
                                                )}원`}
                                                black={true}
                                            />
                                        </>
                                    )}

                                    {order.point_price !== 0 && (
                                        <Info
                                            attribute={'포인트 사용'}
                                            value={`${numberFormat(
                                                order.point_price,
                                            )}원`}
                                            black={true}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className={cx('bar')} />

                <div className={cx('container')}>
                    <div className={cx('discount-area')}>
                        <div className={cx('discount-title')}>결제 정보</div>
                        <div className={cx('content-area')}>
                            <Info
                                attribute={'결제 일시'}
                                value={getFormatDateTime(order.createdAt)}
                            />
                            <Info
                                attribute={'결제수단'}
                                value={paymentType(order.payment_type)}
                                black={true}
                            />
                            <Info
                                attribute={'결제금액'}
                                value={`${numberFormat(order.payment_price)}원`}
                                black={true}
                            />
                        </div>
                    </div>

                    <div className={cx('button-area')}>
                        <BasicButton
                            button_name={
                                status ? rentalStatus(order) : '대여 취소하기'
                            }
                            disable={status}
                            color={status ? 'black' : 'white'}
                            onClick={() =>
                                !status &&
                                dispatchHandle({
                                    type: 'refund',
                                    payload: true,
                                })
                            }
                        />
                        {!status && (
                            <Link
                                to={
                                    Paths.main.use.extend +
                                    `?rental_id=${rental_id}`
                                }
                            >
                                <BasicButton
                                    button_name={'연장 하기'}
                                    disable={status}
                                />
                            </Link>
                        )}
                    </div>
                </div>

                <Refund
                    open={modalState.refund}
                    handleClose={() =>
                        dispatchHandle({ type: 'refund', payload: false })
                    }
                    rentalID={rental_id}
                    paymentPrice={order.total_price}
                    deposit={order.deposit}
                    couponPrice={order.coupon ? order.coupon.cp_price : '-'}
                    pointPrice={order.point_price ? order.point_price : '-'}
                />
                <ImageModal
                    title={order && order.place.place_name}
                    images={order && imageFormat(order.place.place_images)}
                    open={isOpenImageView}
                    handleClose={handleImageView}
                ></ImageModal>
            </>
        )
    );
};

export default UseDetailContainer;
