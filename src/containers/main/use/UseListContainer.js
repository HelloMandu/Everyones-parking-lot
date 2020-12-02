import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { requestGetUseRental } from '../../../api/rental'

import { Paths } from '../../../paths';

import { numberFormat } from '../../../lib/formatter'

import classNames from 'classnames/bind'
import styles from './UseListContainer.module.scss'

const cx = classNames.bind(styles)

const list = [
    {
        id: 1,
        title: '길동이 주차 공간',
        price: 60000,
        startDate: '2020-10-05 14:00',
        endDate: '2020-10-05 16:00',
        status: '이용대기'
    },
    {
        id: 2,
        title: '길동이 주차 공간',
        price: 60000,
        startDate: '2020-10-05 14:00',
        endDate: '2020-10-05 16:00',
        status: '이용중'
    },
    {
        id: 3,
        title: '길동이 주차 공간',
        price: 60000,
        startDate: '2020-10-05 14:00',
        endDate: '2020-10-05 16:00',
        status: '이용완료'
    }
];

const UseListContainer = () => {
    const [useList, setUseList] = useState()

    const getUseList = useCallback(async() => {
        const token = localStorage.getItem('user_id')
        const useRental = await requestGetUseRental(token)

        console.log(useRental, useList, setUseList)
    }, [useList])

    useEffect(() => {
        getUseList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={cx("container")}>
            {list.map(item => 
                <Link to={Paths.main.use.detail + `?id=${item.id}`} className={cx("list-item")} key={item.id}>
                    <div className={cx("title")}>{item.title}</div>
                    <div className={cx("price")}>{numberFormat(item.price)}원</div>
                    <div className={cx("date")}>{item.startDate} ~ {item.endDate}</div>
                    <div className={cx("status")}>{item.status}</div>
                </Link>
            )}
        </div>
    );
};

export default UseListContainer;
