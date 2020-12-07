import React from 'react';
import classNames from 'classnames/bind';

import styles from './Birth.module.scss';

const CURRENT = new Date();

const YEAR = [];
const MONTH = [];
const DAY = [];

for (let i = 1970; i <= CURRENT.getFullYear(); i++) YEAR.push(i);
for (let i = 1; i <= 12; i++) MONTH.push(i);
for (let i = 1; i <= 31; i++) DAY.push(i);

const cx = classNames.bind(styles);

const Birth = ({ onChangeBirth, year, month, day }) => {
    return (
        <>
            <div className={cx('select-item')}>
                <select
                    className={cx('select')}
                    name="year"
                    onChange={onChangeBirth}
                >
                    {YEAR.map((y) =>
                        y !== year ? (
                            <option key={y} value={y}>
                                {y}년
                            </option>
                        ) : (
                                <option key={y} value={y} selected>
                                    {y}년
                                </option>
                            ),
                    )}
                </select>
            </div>

            <div className={cx('select-item')}>
                <select
                    className={cx('select')}
                    name="month"
                    onChange={onChangeBirth}
                >
                    {MONTH.map((m) =>
                        m !== month ? (
                            <option key={m} value={m}>
                                {m}월
                            </option>
                        ) : (
                                <option key={m} value={m} selected>
                                    {m}월
                                </option>
                            ),
                    )}
                </select>
            </div>

            <div className={cx('select-item')}>
                <select
                    className={cx('select')}
                    name="day"
                    onChange={onChangeBirth}
                >
                    {DAY.map((d) =>
                        d !== day ? (
                            <option key={d} value={d}>
                                {d}일
                            </option>
                        ) : (
                                <option key={d} value={d} selected>
                                    {d}일
                                </option>
                            ),
                    )}
                </select>
            </div>
        </>
    );
};

export default Birth;
