import React, { memo, useEffect, useCallback, useState } from 'react';
import cn from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';

import PolicyModal from '../modal/PolicyModal';

import styles from './CheckBox.module.scss';

const cx = cn.bind(styles);

const CheckBoxItem = memo(({ checked, description, necessary, onToggle }) => {
    return (
        <>
            <div className={styles['checkbox']} onClick={onToggle}>
                <div className={cx('check', { checked })}></div>
            </div>
            <div className={styles['description']} onClick={onToggle}>
                {description}
                {necessary && (
                    <span className={styles['necessary']}>(필수)</span>
                )}
            </div>
        </>
    );
});

const CheckBox = ({
    allCheckTitle,
    checkListProps,
    box,
    setterFunc,
    setCheck,
    url,
    modal,
}) => {
    const history = useHistory();
    const [allCheck, setAllCheck] = useState(false);
    const [checkList, setCheckList] = useState(checkListProps);

    const [isOpenPolicy, setIsOpenPolicy] = useState(-1);
    useEffect(() => {
        if (modal === 'term') {
            setIsOpenPolicy(0);
        } else if (modal === 'privacy') {
            setIsOpenPolicy(1);
        } else {
            setIsOpenPolicy(-1);
        }
    }, [modal]);

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
        <>
            <section>
                <div
                    className={cx('checkitem', 'allcheck', { box })}
                    onClick={onToggleAll}
                >
                    <CheckBoxItem
                        checked={allCheck}
                        description={allCheckTitle}
                    ></CheckBoxItem>
                </div>
                <ul className={styles['checklist']}>
                    {checkList.map(
                        ({
                            id,
                            checked,
                            description,
                            subDescription,
                            necessary,
                            policy,
                        }) => (
                            <li className={styles['checkitem']} key={id}>
                                <CheckBoxItem
                                    checked={checked}
                                    description={description}
                                    necessary={necessary}
                                    onToggle={() => {
                                        onToggle(id);
                                    }}
                                ></CheckBoxItem>
                                {policy !== -1 && (
                                    <ButtonBase
                                        className={styles['policy']}
                                        component="span"
                                        onClick={() =>
                                            history.push(
                                                `${url}/${
                                                    !policy ? 'term' : 'privacy'
                                                }`,
                                            )
                                        }
                                    >
                                        보기
                                    </ButtonBase>
                                )}
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
            <PolicyModal
                url={url}
                open={isOpenPolicy !== -1}
                type={modal}
            ></PolicyModal>
        </>
    );
};

export default CheckBox;
