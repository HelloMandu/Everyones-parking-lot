import React from 'react';
import styles from './BasicButton.module.scss';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

const cx = cn.bind(styles);

/* 
    좋아요 버튼
    button_name : 버튼 이름
    disabler :활성여부

    //작업해야함
*/


const LikeButton =({button_name ,disable})=>{
    return(
        <ButtonBase className={cx('basic-button',{disable})}  disableRipple={disable}>
            {button_name}
        </ButtonBase>
    )
}

export default LikeButton;

LikeButton.defaultProps={
    button_name :'button',
    disable :true, 
}