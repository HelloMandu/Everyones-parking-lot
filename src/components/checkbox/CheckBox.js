import React, { memo, useEffect, useCallback, useState } from 'react';
import cn from 'classnames/bind';

import styles from './CheckBox.module.scss';

const cx = cn.bind(styles);

const CheckBoxItem = memo(({ checked, description, onToggle }) => {
    return (
        <>
            <div className={styles['checkbox']} onClick={onToggle}>
                <div className={cx({ checked })}></div>
            </div>
            <div className={styles['description']}>{description}</div>
        </>
    );
});

const CheckBox = ({ allCheckTitle, checkListProps }) => {
    const [allCheck, setAllCheck] = useState(false);
    const [checkList, setCheckList] = useState(checkListProps);
    const onToggleAll = useCallback(() => {
        setCheckList(
            checkList.map((checkBox) => ({
                ...checkBox,
                checked: !allCheck,
            })),
        );
        setAllCheck(!allCheck);
    }, [allCheck, checkList]);

    const onToggle = useCallback(
        (id) => {
            setCheckList(
                checkList.map((checkBox) =>
                    checkBox.id === id
                        ? { ...checkBox, checked: !checkBox.checked }
                        : checkBox,
                ),
            );
        },
        [checkList],
    );
    useEffect(() => {
        const result = checkList.reduce(
            (prev, cur) => prev && cur.checked,
            true,
        );
        setAllCheck(result);
    }, [checkList, checkListProps]);
    return (
        <div>
            <div className={cx('checkitem', 'allcheck')}>
                <CheckBoxItem
                    checked={allCheck}
                    description={allCheckTitle}
                    onToggle={onToggleAll}
                ></CheckBoxItem>
            </div>
            <ul className={styles['checklist']}>
                {checkList.map(({ id, checked, description, subDescription }) => (
                    <li className={styles['checkitem']} key={id}>
                        <CheckBoxItem
                            checked={checked}
                            description={description}
                            onToggle={() => {
                                onToggle(id);
                            }}
                        ></CheckBoxItem>
                        {subDescription ?
                            <div className={styles["sub-description"]}>{subDescription}</div> : ''
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CheckBox;
