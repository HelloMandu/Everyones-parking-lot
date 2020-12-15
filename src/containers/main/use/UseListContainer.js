import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDialog } from '../../../hooks/useDialog';
import useToken from '../../../hooks/useToken'

import { requestGetUseRental } from '../../../api/rental';

import { Paths } from '../../../paths';

import { numberFormat } from '../../../lib/formatter';
import { getFormatDateTime } from '../../../lib/calculateDate';
import { rentalStatus } from '../../../lib/rentalStatus';

import classNames from 'classnames/bind';
import styles from './UseListContainer.module.scss';
import Notice from '../../../static/asset/svg/Notice';

const cx = classNames.bind(styles);

const UseListContainer = () => {
    const token = useToken()
    const [list, setList] = useState([]);
    const openDialog = useDialog();

    const getUseList = useCallback(async () => {
        const { data } = await requestGetUseRental(token);

        if (data.msg === 'success') setList(data.orders);
        else openDialog(data.msg);
    }, [openDialog, token]);

    useEffect(() => {
        if(token != null) getUseList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
    list.length !== 0 ? 
        <div className={cx('container')}>
            {list.map((item) => (
                <Link
                    to={Paths.main.use.detail + `?rental_id=${item.rental_id}`}
                    className={cx('list-item')}
                    key={item.rental_id}
                >
                    <div className={cx('title')}>{item.place.place_name}</div>
                    <div className={cx('price')}>
                        {numberFormat(item.payment_price)}원
                    </div>
                    <div className={cx('date')}>
                        {getFormatDateTime(item.rental_start_time)} ~{' '}
                        {getFormatDateTime(item.rental_end_time)}
                    </div>
                    <div className={cx('status')}>{rentalStatus(item)}</div>
                </Link>
            ))}
        </div>
     : 
        <div className={styles['non-qna']}>
            <div className={styles['non-container']}>
                <Notice />
                <div className={styles['explain']}>
                    이용내역이 없습니다.
                </div>
            </div>
        </div>
    )
};

export default UseListContainer;
