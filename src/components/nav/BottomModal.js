import React,{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from './BottomModal.module.scss';
import classnames from 'classnames/bind';
import BasicButton from '../button/BasicButton';
import { Backdrop/*, ButtonBase*/ } from '@material-ui/core';

//action
import {set_filters} from '../../store/main/filters';

const cn = classnames.bind(styles);

const BottomModal = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const {parking_town,underground_parking,ground_parking,stated_parking} = useSelector((state)=>state.filters);

    const onToggle =(type,value)=>{
        dispatch(set_filters({type, value}));
    }

    return (
        <>
            <div className={cn('bottom-modal', { on: open })}>
                <div className={styles['box']}>
                    <div className={styles['modal-title']}>
                        조건설정
                        <AgreeToggle name={"주차타운"} checked={parking_town} onToggle ={() => onToggle('parking_town',!parking_town)}/>
                        <AgreeToggle name={"지하주차장"} checked={underground_parking} onToggle ={() => onToggle('underground_parking',!underground_parking)}/>
                        <AgreeToggle name={"지상주차장"} checked={ground_parking} onToggle ={() => onToggle('ground_parking',!ground_parking)}/>
                        <AgreeToggle name={"지정주차"} checked={stated_parking} onToggle ={() => onToggle('stated_parking',!stated_parking)}/>
                        <BasicButton button_name={"조건 설정하기"} disable={false} />
                    </div>
                </div>
            </div>
            <Backdrop open={open} className={styles['dim']} onClick={handleClose} />
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
