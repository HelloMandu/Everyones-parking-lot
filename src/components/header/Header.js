import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames/bind';

import Arrow from '../../static/asset/svg/Arrow';
import { IconButton } from '@material-ui/core';

import styles from './Header.module.scss';
import { Paths } from '../../paths';

const cx = cn.bind(styles);

const Header = ({ title, backHome = false }) => {
    const history = useHistory();
    const headerRef = useRef(null);
    const [shadow, setShadow] = useState(false);
    useEffect(() => {
        const headerHeight = headerRef.current.getBoundingClientRect().height;
        const headerControll = () => setShadow(window.scrollY > headerHeight);
        window.addEventListener('scroll', headerControll);
        return () => window.removeEventListener('scroll', headerControll);
    }, []);
    return (
        <div className={styles['header']} ref={headerRef}>
            <div className={cx('content', { shadow })}>
                <IconButton
                    className={styles['back-btn']}
                    onClick={() =>
                        backHome
                            ? history.replace(Paths.main.index)
                            : history.goBack()
                    }
                >
                    <Arrow />
                </IconButton>
                <div className={styles['title']}>{title}</div>
            </div>
        </div>
    );
};

export default Header;
