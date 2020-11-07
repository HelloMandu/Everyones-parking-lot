import React, { useCallback, useEffect } from 'react';
import classnames from 'classnames/bind';
import { makeStyles } from '@material-ui/core/styles';
/* Library */

import { useDispatch } from 'react-redux';
import { dialogClose } from '../../store/dialog';
/* Redux */

import { Backdrop, ButtonBase } from '@material-ui/core';
/* Components */

import styles from './Dialog.module.scss';
/* StyleSheets */

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 3500,
    },
}));

const cn = classnames.bind(styles);

const Dialog =  ({ confirm, title, text, handleClick = () => {}, open }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onClose = useCallback(() => dispatch(dialogClose()), [dispatch]);
    const onClick = useCallback(() => {
        handleClick();
        onClose();
    }, [handleClick, onClose]);

    const onKeyDown = useCallback(
        (e) => {
            if (open) {
                if (e.key === 'Enter') {
                    onClick();
                } else if (e.key === 'Escape') {
                    onClose();
                }
                e.stopPropagation();
            }
        },
        [onClick, onClose, open],
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, true);
        return () => document.removeEventListener('keydown', onKeyDown, true);
    }, [onKeyDown]);

    return (
        <>
            <div className={cn('dialog', { confirm, open })}>
                <div className={styles['area']}>
                    <div className={cn('content')}>
                        <h3 className={styles['title']}>{title}</h3>
                        {text && <p className={styles['text']}>{text}</p>}
                    </div>
                    <div className={styles['bottom']}>
                        {confirm && (
                            <ButtonBase
                                className={cn('button')}
                                onClick={onClose}
                            >
                                아니오
                            </ButtonBase>
                        )}
                        <ButtonBase
                            className={cn('button', 'active')}
                            onClick={onClick}
                        >
                            {confirm ? '예' : '확인'}
                        </ButtonBase>
                    </div>
                </div>
            </div>
            <Backdrop
                className={classes.backdrop}
                open={open}
                onClick={onClose}
            />
        </>
    );
};

export default Dialog;
