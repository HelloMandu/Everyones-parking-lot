import React from 'react';
import classNames from 'classnames/bind';
import { ButtonBase } from '@material-ui/core'
/* Library */

import useInput from '../../hooks/useInput';
import InputBox from '../../components/inputbox/InputBox';

import ArrowSmall from '../../static/asset/svg/ArrowSmall';
import Information from '../../static/asset/svg/Information';

import styles from './EnrollCarContainer.module.scss';

const cx = classNames.bind(styles);

const area = [
    '번호판에 지역 존재시 선택',
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '강원',
    '경기',
    '경남',
    '경북',
    '전남',
    '전북',
    '충남',
    '충북',
];

const EnrollCarContainer = () => {
    const [carNumber, onChangeCarNumber] = useInput('');

    return (
        <div className={cx('container')}>
            <div className={cx('select-wrapper')}>
                <select className={cx('select')}>
                    {area.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>
                <ArrowSmall rotate={180} />
            </div>

            <InputBox
                className={'input-box'}
                type={'text'}
                value={carNumber}
                placeholder={'차량 번호를 입력해주세요. Ex)21수 7309'}
                onChange={onChangeCarNumber}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') console.log('차량 등록');
                }}
            />

            <div className={cx('img-wrapper')}>
                <div className={cx('title')}>차량 사진 등록</div>

                <div className={cx('imformation')}>
                    <Information />
                    <div className={cx('sub-title')}>
                        앞 번호판이 보이는 차량사진을 등록해주세요
                    </div>
                </div>

                <ButtonBase className={cx('button')} ><span className={cx('plus')}>+</span> 사진추가</ButtonBase>
            </div>
        </div>
    );
};

export default EnrollCarContainer;
