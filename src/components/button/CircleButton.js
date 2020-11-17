import React from 'react';
import styles from './CircleButton.module.scss';
import {IconButton} from '@material-ui/core';


const CircleButton = ({ src, onClick }) => {
    return (
        <IconButton className={styles['circle-btn']} onClick={onClick}>
            <img src={src} alt="alt" />
        </IconButton>
    )
}

export default CircleButton;