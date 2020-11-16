import React from 'react';
import styles from './BottomModal.module.scss';
import classnames from 'classnames/bind';
import { Backdrop, ButtonBase } from '@material-ui/core';

const cn = classnames.bind(styles);

const BottomModal = ({ open, handleClose }) => {
    return (
        <>
            <div className={cn('bottom-modal', { on: open })}>
                <div className={styles['box']}>
                    <div className={styles['modal-title']}>
                        조건설정
                        <AgreeToggle name={"gd"} checked={true}/>
                        <AgreeToggle name={"gd"} checked={false}/>
                        <AgreeToggle name={"gd"} checked={false}/>
                        <AgreeToggle name={"gd"} checked={false}/>
                    </div>
                </div>
            </div>
            <Backdrop open={open} className={styles['dim']} onClick={handleClose} />
        </>
    );
};

const AgreeToggle = ({ name, checked, onToggle }) => {
    return (
        <div className={styles['selector']}>
            <div className={styles['name']}>{name}</div>
            <div className={cn('toggle', { checked })} onClick={onToggle}>
                <div className={styles['box']}>
                    <div className={styles['switch']}></div>
                </div>
            </div>
        </div>
    );
};

export default BottomModal;
