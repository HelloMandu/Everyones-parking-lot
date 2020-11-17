import React from 'react';
/* Library */

import FixedButton from '../../../../components/button/FixedButton';
/* Components */

import styles from './UpdateHpContainer.module.scss';
/* StyleSheets */

const UpdateBirthdayContiner = () => {

    const onClickButton = () => {
        alert("생년월일 변경")
    }

    return (
        <div className={styles['container']}>
            생년월일 변경
            
            <FixedButton button_name="변경" disable={false} onClick={onClickButton} />
        </div>
    );
};

export default UpdateBirthdayContiner;