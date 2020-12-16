import React from 'react';
import styles from './ToastMessage.module.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

export default function ToastMessage({ on, msg }) {
    return <div className={cx('snackbar', { show: on })}>{msg}</div>;
}
