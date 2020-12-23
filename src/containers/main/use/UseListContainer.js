import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useDialog } from '../../../hooks/useDialog';
import useToken from '../../../hooks/useToken';
import useLoading from '../../../hooks/useLoading';
import { useScrollEnd, useScrollRemember } from '../../../hooks/useScroll';

import { requestGetUseRental } from '../../../api/rental';

import { Paths } from '../../../paths';

import { numberFormat } from '../../../lib/formatter';
import { getFormatDateTime } from '../../../lib/calculateDate';
import { rentalStatus, rentalStatusColor } from '../../../lib/rentalStatus';

import classNames from 'classnames/bind';
import styles from './UseListContainer.module.scss';
import Notice from '../../../static/asset/svg/Notice';

const cx = classNames.bind(styles);

const LOADING_USE_LIST = 'use/list';

const UseListContainer = () => {
    const token = useToken();
    const location = useLocation()
    const openDialog = useDialog();
    const [onLoading, offLoading, isLoading] = useLoading();
    const [useList, setUseList] = useState([]);
    const [list, setList] = useState([])

    const fetchUseList = useCallback(() => {
        const LIMIT = 6
        const length = list.length
        const fetchData = useList.slice(length, length + LIMIT)

        if(fetchData.length > 0){
            setList(list.concat(fetchData))
        }
    }, [list, useList])

    const getUseList = useCallback(async () => {
        if (!token) {
            return;
        }
        onLoading(LOADING_USE_LIST);
        try {
            const { data } = await requestGetUseRental(token);
            if (data.msg === 'success') {
                setUseList(data.orders)
            } else {
                openDialog(data.msg);
            }
        } catch (e) {
            console.error(e);
        }

        offLoading(LOADING_USE_LIST);
    // eslint-disable-next-line no-sparse-arrays
    }, [offLoading, onLoading, openDialog, token]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(getUseList, []);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(fetchUseList, [useList])
    useScrollEnd(fetchUseList);
    useScrollRemember(location.pathname);

    return (
        <>
            {!isLoading[LOADING_USE_LIST] &&
                (useList.length ? (
                    <div className={cx('container')}>
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
                                <div className={cx('status', `${rentalStatusColor(item)}`)}>
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
