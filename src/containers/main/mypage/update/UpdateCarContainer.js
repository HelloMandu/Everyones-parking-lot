import React from 'react';
/* Library */

import FixedButton from '../../../../components/button/FixedButton';
/* Components */

import styles from './UpdateCarContainer.module.scss';
import ArrowSmall from '../../../../static/asset/svg/ArrowSmall';
/* StyleSheets */

const UpdateEnrollmentContainer = () => {

    const onClickButton = () => {
        alert("차량정보 등록")
    }

    return (
        <div className={styles['container']}>
            <div className={styles['input-area']}>
                <div className={styles['select-wrap']}>
                    <select className={styles['select']}>
                        <option className={styles['select-text']}>번호판에 지역 존재시 선택</option>
                    </select>
                    <ArrowSmall rotate={180} />
                </div>
            </div>
            <FixedButton button_name="등록" disable={false} onClick={onClickButton} />
        </div>
    );
};

export default UpdateEnrollmentContainer;