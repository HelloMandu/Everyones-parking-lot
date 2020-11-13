import React from 'react';

import Arrow from '../../static/asset/svg/arrow';

import styles from './Header.module.scss'

const Header = ({children}) =>{
    return(
        <div className={styles["header"]}>
            <Arrow></Arrow>
            <div className={styles["title"]}>{children}</div>
        </div>
    )
}

export default Header;