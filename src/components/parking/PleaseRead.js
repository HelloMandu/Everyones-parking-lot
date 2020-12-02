import React from 'react';

import Information from './../../static/asset/svg/Information';

import styles from './PleaseRead.module.scss';

const PleaseRead = ({fill}) =>{
    return(
        <div className={styles['information']}>
        <div className={styles['title']}>
            <Information fill={fill}></Information>
            <span className={styles['explain']}>꼭 읽어주세요</span>
        </div>
        <div className={styles['description']}>
            보증금은 주차시간을 어기고 초과로 주차하시는 대여자에게
            다시 환급이 불가합니다. 주차시간을 준수하신다면 보증금을
            환급 받으실 수 있습니다. 주차시간을 초과할 경우 대여자의
            차량이 견인 조치 될 수 있음을 미리 알려드립니다.
        </div>
    </div>
    )
}

export default PleaseRead;