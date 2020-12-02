import React, { useState } from 'react';
/* Library */

import FixedButton from '../../../../components/button/FixedButton';
/* Components */

import styles from './UpdateNameContainer.module.scss';
import XButton from '../../../../static/asset/svg/X_button';
/* stylesheets */

const UpdateNameContainer = () => {

    const [name, setName] = useState('');

    const onChangeName = e => setName(e.target.value);
    const onClickName = () => setName('');
    const onKeyPressEnter = e => { if (e.key === 'Enter') onClickButton(); };
    const onClickButton = () => {
        // 업데이트 요청
        alert('이름 업데이트')
    }

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['name-area']}>
                    <div className={styles['text']}>
                        <input
                            type="text"
                            className={styles['input']}
                            name="name"
                            value={name}
                            onChange={onChangeName}
                            onKeyPress={onKeyPressEnter}
                            placeholder="김종완"
                        />
                        <button className={styles['x-button']} onClick={onClickName}><XButton /></button>
                    </div>
                </div>
            </div>
            <FixedButton button_name="변경" disable={!name} onClick={onClickButton} />
        </>
    );
};

export default UpdateNameContainer;