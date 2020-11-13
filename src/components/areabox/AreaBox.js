import React from 'react';

import styles from './AreaBox.module.scss';

const AreaBox = ({ title, children }) => {
    return (
        <div className={styles['inputbox-container']}>
            <div className={styles['title']}>{title}</div>
            {children}
        </div>
    );
};

export default AreaBox;
