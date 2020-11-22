import React from 'react';
import classNames from 'classnames/bind';

import styles from './Birth.module.scss';

const DATE = new Date(1930, 1, 1);
const CURRENT = new Date();

const YEAR = [];
const MONTH = [];
const DAY = []

for (let i = DATE.getFullYear(); i <= CURRENT.getFullYear(); i++) YEAR.push(i);
for (let i = 1; i <= 12; i++) MONTH.push(i);
for (let i = 1; i <= 31; i++) DAY.push(i);

const cx = classNames.bind(styles);

const Birth = ({ onChangeBirth }) => {

    return (
        <>
            <div className={cx('select-item')}>
                <select className={cx('select')} name="year" onChange={onChangeBirth}>
                    {YEAR.map((y) => (
                        <option key={y} value={y} >{y}년</option>
                    ))}
                </select>

            </div>

            <div className={cx('select-item')}>
                <select className={cx('select')} name="month" onChange={onChangeBirth}>
                    {MONTH.map((m) => (
                        <option key={m} value={m} >{m}월</option>
                    ))}
                </select>
            </div>

            <div className={cx('select-item')}>
                <select className={cx('select')} name="day" onChange={onChangeBirth}>
                    {DAY.map((d) => (
                        <option key={d} value={d} >{d}일</option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Birth