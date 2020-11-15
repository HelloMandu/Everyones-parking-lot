import React from 'react';
import styles from './ConfirmButton.module.scss';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

const cx = cn.bind(styles);

/* 
    모든 페이지에서 동일하게 쓰는 기본 버튼
    button_name : 버튼 이름
    disable :활성여부
*/

const ConfirmButton = ({ button_name, disable, focus, onClick }) => {
    return (
        <ButtonBase
            className={cx('confirm-button', { disable })}
            disableRipple={disable}
            ref={focus}
            onClick={onClick}
        >
            {button_name}
        </ButtonBase>
    );
};

export default ConfirmButton;

ConfirmButton.defaultProps = {
    button_name: 'button',
    disable: true,
};
