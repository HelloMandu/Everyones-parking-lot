import React from 'react';
import styles from './LikeButton.module.scss';
import cn from 'classnames/bind';
import Like from '../../static/asset/svg/detail/Like';
import { ButtonBase } from '@material-ui/core';

const cx = cn.bind(styles);

/* 
    좋아요 버튼
    button_name : 버튼 이름
    disabler :활성여부

    //작업해야함
*/


const LikeButton = ({ button_name, disable, likes, likeStatus ,onClick, handleLike}) => {
    return (
        <div className={styles['like-button']}>
            <div className={styles['like-button-content']}>
            <div className={styles['box']}>
                <ButtonBase className={styles['like-icon']} onClick={handleLike}>
                    <Like status={likeStatus}/>
                    <div className={styles['count']}> {likes} </div>
                </ButtonBase>
                <ButtonBase className={cx('basic-button', { disable })} disabled={disable} onClick={onClick}>
                    {button_name}
                </ButtonBase>
            </div>
        </div>
        </div>
    )

}

export default LikeButton;

LikeButton.defaultProps = {
    button_name: 'button',
    disable: true,
}