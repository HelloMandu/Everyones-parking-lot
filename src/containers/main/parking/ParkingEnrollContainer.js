import React from 'react';
/* Library */
import useInput from '../../../hooks/useInput';

import { isCellPhoneForm } from '../../../lib/formatChecker';

import ParkingInfo from '../../../components/parking/ParkingInfo';
import ConfirmButton from '../../../components/button/ConfirmButton';
import AreaBox from '../../../components/areabox/AreaBox';
import InputBox from '../../../components/parking/InputBox';

import styles from './ParkingEnrollContainer.module.scss';

const ParkingEnrollContainer = () => {
    const [phone, handleChangePhone, phoneCheck] = useInput(
        '',
        isCellPhoneForm,
    );
    return (
        <div className={styles['parking-container']}>
            <ParkingInfo></ParkingInfo>
            <AreaBox title={'대여자연락처'}>
                <div className="verify-phone">
                    <InputBox
                        type={'text'}
                        value={phone}
                        placeholder={'ex) 01012341234'}
                        onChange={handleChangePhone}
                    ></InputBox>
                    <div className={styles["phone-button"]}>
                        <ConfirmButton
                            button_name={'인증번호 발송'}
                            disable={!phoneCheck}
                        ></ConfirmButton>
                    </div>
                </div>
            </AreaBox>
        </div>
    );
};

export default ParkingEnrollContainer;
