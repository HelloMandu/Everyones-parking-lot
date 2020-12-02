import React from 'react';
/* Library */

import FixedButton from '../../../../components/button/FixedButton';
import VerifyPhone from '../../../../components/verifyphone/VerifyPhone';
/* Components */

import styles from './UpdateHpContainer.module.scss';
/* StyleSheets */

const UpdateHpContainer = () => {

    const onClickButton = () => {
        alert("연락처 변경")
    }

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['input-area']}>
                    <VerifyPhone />
                </div>
            </div>
            <FixedButton button_name="변경" disable={false} onClick={onClickButton} />
        </>
    );
};

export default UpdateHpContainer;