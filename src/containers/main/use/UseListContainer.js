import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDialog } from '../../../hooks/useDialog';
import useToken from '../../../hooks/useToken';
import useLoading from '../../../hooks/useLoading';
import { useScrollEnd } from '../../../hooks/useScroll';

import { requestGetUseRental } from '../../../api/rental';

import { Paths } from '../../../paths';

import { numberFormat } from '../../../lib/formatter';
import { getFormatDateTime } from '../../../lib/calculateDate';
import { rentalStatus } from '../../../lib/rentalStatus';

import classNames from 'classnames/bind';
import styles from './UseListContainer.module.scss';
import Notice from '../../../static/asset/svg/Notice';

const cx = classNames.bind(styles);

const LOADING_USE_LIST = 'use/list';

const UseListContainer = () => {
    const token = useToken();
    const [list, setList] = useState([]);
    const openDialog = useDialog();
    const [onLoading, offLoading, isLoading] = useLoading();
    const listRef = useRef();

    const getUseList = useCallback(async () => {
        if (!token) {
            return;
        }
        onLoading(LOADING_USE_LIST);
        try {
            const { data } = await requestGetUseRental(token);
            if (data.msg === 'success') {
                setList(data.orders);
            } else {
                openDialog(data.msg);
            }
        } catch (e) {
            console.error(e);
        }
        offLoading(LOADING_USE_LIST);
    }, [offLoading, onLoading, openDialog, token]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(getUseList, []);

    useScrollEnd(getUseList, listRef.current);

    return (
        <>
            {!isLoading[LOADING_USE_LIST] &&
                (list.length ? (
                    <div className={cx('container')} ref={listRef}>
                        {list.map((item) => (
                            <Link
                                to={
                                    Paths.main.use.detail +
                                    `?rental_id=${item.rental_id}&from_list=true&place_id=${item.place.place_id}`
                                }
                                className={cx('list-item')}
                                key={item.rental_id}
                            >
                                <div className={cx('title')}>
                                    {item.place.place_name}
                                </div>
                                <div className={cx('price')}>
                                    {numberFormat(item.payment_price)}원
                                </div>
                                <div className={cx('date')}>
                                    {getFormatDateTime(item.rental_start_time)}{' '}
                                    ~ {getFormatDateTime(item.rental_end_time)}
                                </div>
                                <div className={cx('status')}>
                                    {rentalStatus(item)}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                        <div className={styles['non-qna']}>
                            <div className={styles['non-container']}>
                                <Notice />
                                <div className={styles['explain']}>
                                    이용내역이 없습니다.
                            </div>
                            </div>
                        </div>
                    ))}
        </>
    );
};

export default UseListContainer;
