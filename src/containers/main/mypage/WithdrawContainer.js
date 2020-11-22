import React, { useState } from 'react';
import classnames from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
/* Library */

import styles from './WithdrawContainer.module.scss';
import FixedButton from '../../../components/button/FixedButton';
import Information from '../../../static/asset/svg/Information';
/* StyleSheets */

const cn = classnames.bind(styles);

const WithdrawContainer = () => {

    const [click, setClick] = useState(false);

    const onClickButton = () => {
        alert("회원 탈퇴")
    }

    return (
        <div className={styles['container']}>
            <div className={styles['withdraw-area']}>
                <div className={styles['text-wrap']}>
                    <div className={styles['text']}><span>탈퇴 후 회원정보 및 이용기록은<p />모두 삭제되며 다시 복구가 불가합니다.</span></div>
                </div>
                <ButtonBase className={cn('confirm', { click })} onClick={() => setClick(!click)}>
                    예, 탈퇴를 신청합니다.
                </ButtonBase>
                <div className={styles['precautions-wrap']}>
                    <div className={styles['first']}>
                        <Information />
                        <div>주문내역 및 결제 내용은 이용약관과 관련법에 의하여 보관됩니다.</div>
                    </div>
                    <div className={styles['second']}>
                        <Information />
                        <div>동일한 SNS계정과 이메일을 사용한 재가입은 24시간이내에 불가합니다.</div>
                    </div>
                </div>
            </div>
            <FixedButton button_name="탈퇴완료" disable={!click} onClick={onClickButton} />
        </div>
    );
};

export default WithdrawContainer;