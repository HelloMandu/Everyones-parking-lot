import React from 'react';
import {useSelector} from 'react-redux';
// styles
import styles from './Aside.module.scss';
import cn from 'classnames/bind';

//components
import { ButtonBase, IconButton } from '@material-ui/core';

//icon
import review_icon from '../../static/asset/svg/aside/review.svg';
import banner from '../../static/asset/png/banner.png';
import notification_icon from '../../static/asset/svg/aside/notification.svg';
import setting_icon from '../../static/asset/svg/aside/setting.svg';
import profile_icon from '../../static/asset/png/profile.png';

const cx = cn.bind(styles);


const Aside = ({ open,handleClose }) => {
    return (
        <>
        <div className={cx('aside-menu', { open })} >
            <div className={styles['aside-top']}>
                <div className={styles['aside-icon']}>
                    <IconButton>
                        <img src={notification_icon} alt="notification"/>
                    </IconButton>
                    <IconButton>
                        <img src={setting_icon} alt="notification"/>
                    </IconButton>
                </div>
                <div className={styles['aside-profile']}>
                    <IconButton className={styles['user-img']}>
                        <img src={profile_icon}/>
                    </IconButton>
                    <div className={styles['user-profile']}>
                        <div className={styles['user-name']}>
                        홍길동
                        </div>
                        <div className={styles['user-email']}>
                    cjtest@naver.com
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['aside-event']}>
                <div className={styles['banner-item']}>
                <img src={banner} alt="배너"/>
                </div>
            </div>
            <div className={styles['aside-list']}>
                <LinkItem src={review_icon} link_name={"내 리뷰"}/>
                <LinkItem src={review_icon} link_name={"내 리뷰"}/>
                <LinkItem src={review_icon} link_name={"내 리뷰"}/>
                <LinkItem src={review_icon} link_name={"내 리뷰"}/>
                <LinkItem src={review_icon} link_name={"내 리뷰"}/>
            </div>
        </div>
        <div className={cx('dim', { open })} onClick={handleClose} />
        </>
    )
}

const LinkItem =({src,link_name,onClick})=>{
    return(
        <ButtonBase className={styles['link-item']}>
             <img src={src} alt={link_name}/>
             <span>{link_name}</span>
        </ButtonBase>
    )
}

export default Aside;