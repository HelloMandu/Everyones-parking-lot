import React from 'react';
import { Link } from 'react-router-dom';

// import { requestGetUseRental } from '../../../api/rental'

import { Paths } from '../../../paths';

import { numberFormat } from '../../../lib/formatter';

import classNames from 'classnames/bind';
import styles from './UseListContainer.module.scss';

const cx = classNames.bind(styles);

const list = [
    {
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
    },
    {
        rental_id: 2,
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
        calculated_time: '2020-12-02 20:59:37',
        deleted: 0,
        created_at: 0,
        updated_at: 0,
        order_user_id: 0,
        place_user_id: 0,
        ppayment_id: 0,
        place_id: 1,
        cp_id: 0,
    },
    {
        rental_id: 3,
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
        cancel_time: '2020-12-02 20:59:37',
        calculated_time: '',
        deleted: 0,
        created_at: 0,
        updated_at: 0,
        order_user_id: 0,
        place_user_id: 0,
        ppayment_id: 0,
        place_id: 1,
        cp_id: 0,
    },
    {
        rental_id: 4,
        total_price: 60000,
        term_price: 1000,
        deposit: 10000,
        point_price: 0,
        payment_price: 0,
        cancle_price: 0,
        calculated_price: 0,
        payment_type: 0,
        rental_start_time: '2021-12-02 16:41:01',
        rental_end_time: '2021-12-02 20:59:37',
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
    }
];

const USE_WAIT = '이용대기';
const USE_USING = '이용중';
const USE_FINISH = '이용완료';
const USE_CANCEL = '이용취소';

const UseListContainer = () => {
    // const [useList, setUseList] = useState();

    const current = new Date();

    // const getUseList = useCallback(async() => {
    //     const token = localStorage.getItem('user_id')
    //     const useRental = await requestGetUseRental(token)

    //     console.log(useRental, useList, setUseList)
    // }, [useList])

    // useEffect(() => {
    //     getUseList()
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return (
        <div className={cx('container')}>
            {list.map((item) => (
                <Link
                    to={Paths.main.use.detail + `?id=${item.id}`}
                    className={cx('list-item')}
                    key={item.rental_id}
                >
                    <div className={cx('title')}>{item.place_id}.title</div>
                    <div className={cx('price')}>
                        {numberFormat(item.total_price)}원
                    </div>
                    <div className={cx('date')}>
                        {item.rental_start_time} ~ {item.rental_end_time}
                    </div>
                    <div className={cx('status')}>
                        {current - Date(item.srental_start_time) < 0
                            ? USE_WAIT
                            : item.calculated_time
                            ? USE_FINISH
                            : item.cancel_time
                            ? USE_CANCEL
                            : USE_USING}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default UseListContainer;
