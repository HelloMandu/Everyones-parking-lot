import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames/bind'

import Arrow from '../../static/asset/svg/Arrow';
import { IconButton } from '@material-ui/core';

import styles from './Header.module.scss';

const cx = cn.bind(styles);

const Header = ({ title }) => {
    const history = useHistory();
    const headerRef = useRef(null);
    const [shadow, setShadow] = useState(false);
    useEffect(()=>{
        const headerHeight = headerRef.current.getBoundingClientRect().height;
        const headerControll = () => setShadow(window.scrollY > headerHeight)
        window.addEventListener('scroll', headerControll)
        return () => window.removeEventListener('scroll', headerControll)
    }, [])
    return (
        <div className={cx('header', {shadow})} ref={headerRef}>
            <IconButton
                className={styles['back-btn']}
                onClick={() => history.goBack()}
            >
                <Arrow></Arrow>
            </IconButton>
            <div className={styles['title']}>{title}</div>
        </div>
    );
};

export default Header;
