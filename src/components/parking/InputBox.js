import React from 'react';

import styles from './InputBox.module.scss';

const InputBox = ({ type, value, placeholder, onChange }) => {
    return (
        <input
            className={styles['input-box']}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        ></input>
    );
};

export default InputBox;
