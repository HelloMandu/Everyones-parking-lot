import React from 'react';
import { useHistory } from 'react-router-dom';

import Arrow from '../../static/asset/svg/Arrow';
import { IconButton } from '@material-ui/core';

import styles from './Header.module.scss';

const Header = ({ title }) => {
    const history = useHistory();
    return (
        <div className={styles['header']}>
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
