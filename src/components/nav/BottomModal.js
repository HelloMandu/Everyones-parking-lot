import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './BottomModal.module.scss';
import classnames from 'classnames/bind';
import BasicButton from '../button/BasicButton';
import { Backdrop/*, ButtonBase*/ } from '@material-ui/core';

//action
import { set_filters } from '../../store/main/filters';

const cn = classnames.bind(styles);

const BottomModal = ({ open, handleClose }) => {
    const dispatch = useDispatch();

    const { parking_town, underground_parking, ground_parking, stated_parking } = useSelector((state) => state.filters);
    const [type1, setType1] = useState(parking_town);
    const [type2, setType2] = useState(underground_parking);
    const [type3, setType3] = useState(ground_parking);
    const [type4, setType4] = useState(stated_parking);


    const onToggle = (type, value) => {
        if (type === 'parking_town')
            setType1(value);
        else if (type === 'underground_parking')
            setType2(value);
        else if (type === 'ground_parking')
            setType3(value);
        else if (type === 'stated_parking')
            setType4(value);
    }

    const onClickResetType = () => {
        dispatch(set_filters({ type: 'parking_town', value: type1 }));
        dispatch(set_filters({ type: 'underground_parking', value: type2 }));
        dispatch(set_filters({ type: 'ground_parking', value: type3 }));
        dispatch(set_filters({ type: 'stated_parking', value: type4 }));
        const init = {
            parking_town: type1,
            underground_parking: type2,
            ground_parking: type3,
            stated_parking: type4,
        }
        localStorage.setItem('filter_data', JSON.stringify(init));
        handleClose();

    }

    const onClickDim = () => {
        setType1(parking_town);
        setType2(underground_parking);
        setType3(ground_parking);
        setType4(stated_parking);
        handleClose();
    }


    useEffect(() => {
        setType1(parking_town);
        setType2(underground_parking);
        setType3(ground_parking);
        setType4(stated_parking);
    }, [parking_town, underground_parking, ground_parking, stated_parking])

    return (
        <>
            <div className={cn('bottom-modal', { on: open })}>
                <div className={styles['box']}>
                    <div className={styles['modal-title']}>
                        조건설정
                        <AgreeToggle name={"주차타운"} checked={type1} onToggle={() => onToggle('parking_town', !type1)} />
                        <AgreeToggle name={"지하주차장"} checked={type2} onToggle={() => onToggle('underground_parking', !type2)} />
                        <AgreeToggle name={"지상주차장"} checked={type3} onToggle={() => onToggle('ground_parking', !type3)} />
                        <AgreeToggle name={"지정주차"} checked={type4} onToggle={() => onToggle('stated_parking', !type4)} />
                        <BasicButton button_name={"조건 설정하기"} disable={false} onClick={onClickResetType} />
                    </div>
                </div>
            </div>
            <Backdrop open={open} className={styles['dim']} onClick={onClickDim} />
        </>
    );
};

const AgreeToggle = ({ name, checked, onToggle }) => {
    return (
        <div className={styles['selector']}>
            <div className={styles['name']}>{name}</div>
            <div className={cn('toggle', { checked })} onClick={onToggle}>
                <div className={styles['box']}>
                    <div className={styles['switch']}></div>
                </div>
            </div>
        </div>
    );
};

export default BottomModal;
