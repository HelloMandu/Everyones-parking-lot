import React from 'react';
import styles from './CircleButton.module.scss';
import { IconButton } from '@material-ui/core';

const CircleButton = ({ src, onClick,txt }) => {
    return (
        <div className={styles['btn']}>
            <IconButton className={styles['circle-btn']} onClick={onClick}>
                <img src={src} alt="alt" />
            </IconButton>
            {txt &&  <p>{txt}</p>}
        </div>
    );
};

export default CircleButton;
