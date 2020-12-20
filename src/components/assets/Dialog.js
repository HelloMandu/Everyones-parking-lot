import React, { useCallback, useEffect } from 'react';
import classnames from 'classnames/bind';
/* Library */

import { useDispatch } from 'react-redux';
import { dialogClose } from '../../store/dialog';
/* Redux */

import { ButtonBase, Dialog as MaterialDialog } from '@material-ui/core';
/* Components */

import styles from './Dialog.module.scss';
// import { useLocation } from 'react-router-dom';
/* StyleSheets */

const cn = classnames.bind(styles);

const Dialog = ({ confirm, title, text, handleClick, open, handleBackDrop }) => {
    const dispatch = useDispatch();
    // const location = useLocation();

    const onClose = useCallback(() => dispatch(dialogClose()), [dispatch]);
    const onClick = useCallback(() => {
        if (handleClick) handleClick();
        onClose();
    }, [handleClick, onClose]);

    const onKeyDown = useCallback(
        (e) => {
            if (open) {
                if (e.key === 'Enter') {
                    onClick();
                }
                e.stopPropagation();
            }
        },
        [onClick, open],
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, true);
        return () => document.removeEventListener('keydown', onKeyDown, true);
    }, [onKeyDown]);

    return (
        <MaterialDialog
            onClose={handleBackDrop ? onClick : onClose}
            open={open}
        >
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
        </MaterialDialog>
    );
};

export default Dialog;
