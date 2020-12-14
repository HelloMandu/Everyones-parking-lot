import React, { memo, useEffect, useCallback, useState } from 'react';
import cn from 'classnames/bind';

import styles from './CheckBox.module.scss';

const cx = cn.bind(styles);

const CheckBoxItem = memo(({ checked, description }) => {
    return (
        <>
            <div className={styles['checkbox']}>
                <div className={cx({ checked })}></div>
            </div>
            <div className={styles['description']}>{description}</div>
        </>
    );
});

const CheckBox = ({
    allCheckTitle,
    checkListProps,
    box,
    setterFunc,
    setCheck,
}) => {
    const [allCheck, setAllCheck] = useState(false);
    const [checkList, setCheckList] = useState(checkListProps);
    const onToggleAll = useCallback(() => {
        setCheckList(
            checkList.map((checkBox) => ({
                ...checkBox,
                checked: !allCheck,
            })),
        );

        if (setterFunc !== undefined) {
            setterFunc(
                checkListProps.map((checkBox) => ({
                    ...checkBox,
                    checked: !allCheck,
                })),
            );
        }

        setAllCheck(!allCheck);
    }, [allCheck, checkList, setterFunc, checkListProps]);

    const onToggle = useCallback(
        (id) => {
            setCheckList(
                checkList.map((checkBox) =>
                    checkBox.id === id
                        ? { ...checkBox, checked: !checkBox.checked }
                        : checkBox,
                ),
            );

            if (setterFunc !== undefined) {
                setterFunc(
                    checkListProps.map((checkBox) =>
                        checkBox.id === id
                            ? { ...checkBox, checked: !checkBox.checked }
                            : checkBox,
                    ),
                );
            }
        },
        [checkList, checkListProps, setterFunc],
    );
    useEffect(() => {
        const result = checkList.reduce(
            (prev, cur) => prev && cur.checked,
            true,
        );
        setAllCheck(result);
        if (setCheck !== undefined) {
            setCheck(result);
        }
    }, [checkList, checkListProps, setCheck]);
    return (
        <div>
            <div className={cx('checkitem', 'allcheck', { box })} onClick={onToggleAll}>
                <CheckBoxItem
                    checked={allCheck}
                    description={allCheckTitle}
                ></CheckBoxItem>
            </div>
            <ul className={styles['checklist']}>
                {checkList.map(
                    ({ id, checked, description, subDescription }) => (
                        <li
                            className={styles['checkitem']}
                            key={id}
                            onClick={() => {
                                onToggle(id);
                            }}
                        >
                            <CheckBoxItem
                                checked={checked}
                                description={description}
                            ></CheckBoxItem>
                            {subDescription ? (
                                <div className={styles['sub-description']}>
                                    {subDescription}
                                </div>
                            ) : (
                                    ''
                                )}
                        </li>
                    ),
                )}
            </ul>
        </section>
    );
};

export default CheckBox;
