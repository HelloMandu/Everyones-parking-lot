import React from 'react';

import styles from './InputBox.module.scss';

const InputBox = ({ className, type, value, placeholder, onChange, onKeyDown }) => {
    return (
        <input
            className={styles[className]}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
        ></input>
    );
};

export default InputBox;
