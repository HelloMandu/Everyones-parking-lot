import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
// styles
import styles from './Aside.module.scss';
import cn from 'classnames/bind';

//components
import { ButtonBase, IconButton, Backdrop } from '@material-ui/core';
import Slider from "react-slick";

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
import { isEmpty } from '../../lib/formatChecker';

const cx = cn.bind(styles);
const settings = {
    dots: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
};

const Aside = ({ open, handleClose }) => {
    const history = useHistory();
    const user = useSelector(state => state.user);

    const onClickLink = (Path) => {
        handleClose();
        setTimeout(() => {
            history.push(Path);
        }, 500);
    };
    return (
        <>
            <div className={cx('aside-menu', { open })}>
                <div className={styles['aside-content']}>
                    <div className={styles['aside-top']}>
                        <div className={styles['aside-icon']}>
                            <IconButton onClick={() => { onClickLink(Paths.main.notification) }}>
                                <img src={NotificationIcon} alt="notification" />
                            </IconButton>
                            <IconButton onClick={() => { onClickLink(Paths.main.setting) }}>
                                <img src={SettingIcon} alt="setting" />
                            </IconButton>
                        </div>
                        <ButtonBase className={styles['aside-profile']} onClick={
                            () =>
                            !isEmpty(user) ? onClickLink(Paths.main.mypage.index) : onClickLink(Paths.auth.login)
                        }
                        >
                            <div className={styles['user-img']}>
                                <img src={profile_icon} alt="notification" />
                            </div>
                            <div className={styles['user-profile']}>
                                <div className={cx('user-name', { login: isEmpty(user) })}>{ !isEmpty(user) ? user.name : '로그인이 필요합니다'}</div>
                                <div className={styles['user-email']}>
                                    {!isEmpty(user) && user.email}
                                </div>
                            </div>
                        </ButtonBase>
                    </div>
                    <div className={styles['aside-event']}>
                        <Slider {...settings}>
                            <div className={styles['banner-item']}>
                                <img src={banner} alt="배너" />
                            </div>
                            <div className={styles['banner-item']}>
                                <img src={banner} alt="배너" />
                            </div>
                        </Slider>
                    </div>
                    <div className={styles['aside-list']}>
                        <LinkItem
                            src={UseListIcon}
                            link_name={'이용 내역'}
                            onClick={() => onClickLink(Paths.main.use.list)}
                        />
                        <LinkItem
                            src={ReviewIcon}
                            link_name={'내 리뷰'}
                            onClick={() => onClickLink(Paths.main.review.list)}
                        />
                        <LinkItem
                            src={EnrollIcon}
                            link_name={'내 주차공간'}
                            onClick={() => onClickLink(Paths.main.parking.manage)}
                        />
                        <LinkItem
                            src={CouponIcon}
                            link_name={'쿠폰'}
                            onClick={() => onClickLink(Paths.main.coupon)}
                        />
                        <LinkItem
                            src={EventIcon}
                            link_name={'이벤트'}
                            onClick={() => onClickLink(Paths.main.event.list)}
                        />
                        <LinkItem
                            src={SupportIcon}
                            link_name={'공지사항'}
                            onClick={() => onClickLink(Paths.main.support.notice)}
                        />
                        <LinkItem
                            src={QnAIcon}
                            link_name={'자주묻는질문'}
                            onClick={() => onClickLink(Paths.main.support.faq)}
                        />
                        <LinkItem
                            src={FaQIcon}
                            link_name={'1:1 문의'}
                            onClick={() => onClickLink(Paths.main.support.qna)}
                        />
                    </div>
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
