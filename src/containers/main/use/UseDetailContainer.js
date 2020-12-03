import React, { useReducer } from 'react';
import qs from 'qs';
import { Link, useHistory } from 'react-router-dom';

import BasicButton from '../../../components/button/BasicButton';
import Refund from '../../../components/use/Refund';

// import { useDialog } from '../../../hooks/useDialog';

// import { requestGetDetailUseRental } from '../../../api/rental';

import { getFormatDateTime } from '../../../lib/calculateDate';
import { numberFormat } from '../../../lib/formatter';

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

const useDetail = {
    rental_id: 1,
    total_price: 60000,
    term_price: 1000,
    deposit: 10000,
    point_price: 0,
    payment_price: 0,
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

const USE_WAIT = '이용대기';
const USE_USING = '이용중';
const USE_FINISH = '이용완료';
const USE_CANCEL = '이용취소';

const UseDetailContainer = ({ location }) => {
    const history = useHistory();
    // const openDialog = useDialog();
    // const [useDetail, setUseDetail] = useState();
    const current = new Date();

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

    // const getUseDetail = useCallback(async () => {
    //     const token = localStorage.getItem('user_id');
    //     const { data } = await requestGetDetailUseRental(token, id);
    //     const { msg, order, coupon, place_user } = data;
    //     if (msg === 'success') {
    //         setUseDetail({
    //             order,
    //             coupon,
    //             place_user,
    //         });
    //     } else {
    //         openDialog(msg);
    //     }
    // }, [id, openDialog]);

    // useEffect(() => {
    //     getUseDetail();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <>
            <div className={cx('container', 'top')}>
                <div className={cx('title-area')}>
                    <div className={cx('title')}>
                        {useDetail.place_id}.title
                    </div>
                    <div className={cx('rendal-status')}>
                        {current.getTime() -
                            new Date(useDetail.rental_start_time).getTime() <
                        0
                            ? USE_WAIT
                            : useDetail.calculated_time
                            ? USE_FINISH
                            : useDetail.cancel_time
                            ? USE_CANCEL
                            : USE_USING}
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
                            value={useDetail.place_id + '.title'}
                        />
                        <Info
                            attribute={'대여시간'}
                            value={
                                getFormatDateTime(useDetail.rental_start_time) +
                                ' ~ ' +
                                getFormatDateTime(useDetail.rental_end_time)
                            }
                            black={true}
                        />
                        <Info attribute={'운영시간'} value={'?'} />
                        <Info
                            attribute={'주차요금'}
                            value={numberFormat(useDetail.term_price) + '원'}
                            black={true}
                        />
                        <Info
                            attribute={'제공자 연락처'}
                            value={useDetail.place_user_id + '.phoneNumber'}
                            black={true}
                        />
                        <Info attribute={'이전 대여자 연락처'} value={'?'} />
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
                            value={'오픈 이벤트 10% 할인 쿠폰'}
                        />
                        <Info
                            attribute={'쿠폰 할인'}
                            value={`- ${numberFormat(1000)}원`}
                            black={true}
                        />
                        <Info
                            attribute={'포인트 사용'}
                            value={`- ${numberFormat(1000)}원`}
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
                            value={'2020-00-00 00:00:00'}
                        />
                        <Info
                            attribute={'결제수단'}
                            value={'카카오페이'}
                            black={true}
                        />
                        <Info
                            attribute={'결제금액'}
                            value={numberFormat(70000) + '원'}
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
                            dispatchHandle({ type: 'refund', payload: true })
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
            />
        </>
    );
};

export default UseDetailContainer;
