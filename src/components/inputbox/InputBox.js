import React from 'react';

import styles from './InputBox.module.scss';

const InputBox = ({ className, type, name, value, placeholder, onChange = () => {}, onKeyDown, reference }) => {
    return (
        <input
            className={styles[className]}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            ref={reference}
        ></input>
    );
};

export default InputBox;
