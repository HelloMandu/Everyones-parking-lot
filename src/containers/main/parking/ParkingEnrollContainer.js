import React from 'react';
/* Library */

import ParkingInfo from '../../../components/parking/ParkingInfo';

import styles from './ParkingEnrollContainer.module.scss';

const ParkingEnrollContainer = () => {
    // requestPostEnrollParking API

    return (
        <div className={styles["parking-enroll"]}>
            <ParkingInfo></ParkingInfo>
        </div>
    );
};

export default ParkingEnrollContainer;
