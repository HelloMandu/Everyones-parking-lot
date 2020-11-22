import React from 'react';

import styles from './ParkingInroList.module.scss'

const ParkingInfoList = ({list}) =>{
    return(
        <ul className={styles['infolist']}>
        {list.map(({ id, title, description }) => (
            <li className={styles['info']} key={id}>
                <div className={styles['info-title']}>{title}</div>
                <div className={styles['description']}>
                    {description}
                </div>
            </li>
        ))}
    </ul>
    )
}

export default ParkingInfoList;