import React from 'react';

import Arrow from '../../static/asset/svg/arrow';
import { IconButton } from '@material-ui/core';

import styles from './Header.module.scss'


const Header = ({title}) =>{
    return(
        <div className={styles["header"]}>
            <IconButton className={styles['back-btn']}>
            <Arrow></Arrow>
            </IconButton>
            <div className={styles["title"]}>{title}</div>
        </div>
    )
}

export default Header;