import React from 'react';
/* Library */

import FixedButton from '../../../../components/button/FixedButton';
import Birth from '../../../../components/birth/Birth';
/* Components */

import styles from './UpdateBirthdayContainer.module.scss';
/* StyleSheets */

const UpdateBirthdayContiner = () => {

    const onClickButton = () => {
        alert("생년월일 변경")
    }

    return (
        <div className={styles['container']}>
            <div className={styles['birth-area']}>
                <Birth />
            </div>
            <FixedButton button_name="변경" disable={false} onClick={onClickButton} />
        </div>
    );
};

export default UpdateBirthdayContiner;