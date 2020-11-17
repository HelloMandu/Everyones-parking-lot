import React from 'react';
import styles from './FixedButton.module.scss';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

const cx = cn.bind(styles);

/* 
    모든 페이지에서 동일하게 쓰는 기본 버튼
    button_name : 버튼 이름
    disable :활성여부
*/

const FixedButton = ({ button_name, disable, onClick }) => {
    return (
        <div className={styles["fixed-button-container"]}>
            <ButtonBase
                className={cx('fixed-button', { disable })}
                disableRipple={disable}
                onClick={onClick}
            >
                {button_name}
            </ButtonBase>
        </div>
    );
};

export default FixedButton;

FixedButton.defaultProps = {
    button_name: 'button',
    disable: true,
};
