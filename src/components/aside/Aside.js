import React from 'react';
// import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

// styles
import styles from './Aside.module.scss';
import cn from 'classnames/bind';

//components
import { ButtonBase, IconButton,Backdrop } from '@material-ui/core';

//icon
import banner from '../../static/asset/png/banner.png';
import profile_icon from '../../static/asset/png/profile.png';

import { NotificationIcon, SettingIcon } from '../../static/asset/svg/aside';
import {
    UseListIcon,
    ReviewIcon,
    EnrollIcon,
    CouponIcon,
    EventIcon,
    SupportIcon,
    QnAIcon,
    FaQIcon,
} from '../../static/asset/svg/aside';
import { Paths } from '../../paths/index';

const cx = cn.bind(styles);

const Aside = ({ open, handleClose }) => {
    const history = useHistory();

    const onClickItem = (Path) => {
        handleClose();
        setTimeout(() => {
            history.push(Path);
        }, 500);
    };
    return (
        <>
            <div className={cx('aside-menu', { open })}>
                <div className={styles['aside-top']}>
                    <div className={styles['aside-icon']}>
                        <IconButton onClick={()=>{onClickItem(Paths.main.notification)}}>
                            <img src={NotificationIcon} alt="notification" />
                        </IconButton>
                        <IconButton onClick={()=>{onClickItem(Paths.main.setting)}}>
                            <img src={SettingIcon} alt="setting" />
                        </IconButton>
                    </div>
                    <ButtonBase className={styles['aside-profile']} onClick ={()=>onClickItem(Paths.main.mypage.index)}>
                        <div className={styles['user-img']}>
                            <img src={profile_icon} alt="notification" />
                        </div>
                        <div className={styles['user-profile']}>
                            <div className={styles['user-name']}>홍길동</div>
                            <div className={styles['user-email']}>
                                cjtest@naver.com
                            </div>
                        </div>
                    </ButtonBase>
                </div>
                <div className={styles['aside-event']}>
                    <div className={styles['banner-item']}>
                        <img src={banner} alt="배너" />
                    </div>
                </div>
                <div className={styles['aside-list']}>
                    <LinkItem
                        src={UseListIcon}
                        link_name={'이용 내역'}
                        onClick={() => onClickItem(Paths.main.use.list)}
                    />
                    <LinkItem
                        src={ReviewIcon}
                        link_name={'내 리뷰'}
                        onClick={() => onClickItem(Paths.main.review.list)}
                    />
                    <LinkItem
                        src={EnrollIcon}
                        link_name={'내 주차공간'}
                        onClick={() => onClickItem(Paths.main.parking.manage)}
                    />
                    <LinkItem
                        src={CouponIcon}
                        link_name={'쿠폰'}
                        onClick={() => onClickItem(Paths.main.coupon)}
                    />
                    <LinkItem
                        src={EventIcon}
                        link_name={'이벤트'}
                        onClick={() => onClickItem(Paths.main.event.list)}
                    />
                    <LinkItem
                        src={SupportIcon}
                        link_name={'공지사항'}
                        onClick={() => onClickItem(Paths.main.use.list)}
                    />
                    <LinkItem
                        src={QnAIcon}
                        link_name={'자주묻는질문'}
                        onClick={() => onClickItem(Paths.main.use.list)}
                    />
                    <LinkItem
                        src={FaQIcon}
                        link_name={'1:1 문의'}
                        onClick={() => onClickItem(Paths.main.use.list)}
                    />
                </div>
            </div>
            <Backdrop open={open} className={cx('dim')} onClick={handleClose} />
        </>
    );
};

const LinkItem = ({ src, link_name, onClick }) => {
    return (
        <ButtonBase className={styles['link-item']} onClick={onClick}>
            <img src={src} alt={link_name} />
            <span>{link_name}</span>
        </ButtonBase>
    );
};

export default Aside;
