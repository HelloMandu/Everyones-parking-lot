import React, { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import { ButtonBase, Backdrop, makeStyles } from '@material-ui/core';
/* Library */

import InputBox from '../../../components/inputbox/InputBox';
import BasicButton from '../../../components/button/BasicButton';
/* Components */

import styles from './MyPointContainer.module.scss';
import XIcon from '../../../static/asset/svg/X_button';
/* stylesheets */

import useInput from '../../../hooks/useInput';
import { useDialog } from '../../../hooks/useDialog';
/* Hooks */

import { Paths } from '../../../paths';
/* Paths */

import { requestGetMyPoint } from '../../../api/point';
/* api */

const cn = classnames.bind(styles);
const card = [
    '은행선택',
];

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
        height: "100vh",
    },
}));

const WithdrawModal = ({ click, setClick }) => {

    const [account, onChangeAccount] = useInput('');
    const [price, onChangePrice] = useInput('');
    const classes = useStyles();

    const onClickButton = () => {
        alert("출금 신청")
        setClick(false);
    }

    return (
        <>
            <div className={cn('withdraw-container', { on: click })}>
                <div className={styles['withdraw-wrap']}>
                    <div className={styles['withdraw-text']}>출금 신청</div>
                </div>
                <div className={styles['account-wrap']}>
                    <div className={styles['account-text']}>계좌 정보</div>
                    <div className={styles['account-area']}>
                        <div className={styles['account-select']}>
                            <select className={styles['select']}>
                                {card.map((item) => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles['account-text']}>
                            <InputBox
                                className={'input-box'}
                                type={'text'}
                                value={account}
                                placeholder={'계좌번호 입력'}
                                onChange={onChangeAccount}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles['price-wrap']}>
                    <div className={styles['price-text']}>출금 금액</div>
                    <div className={styles['price-area']}>
                        <InputBox
                            className={'input-box'}
                            type={'text'}
                            value={price}
                            onChange={onChangePrice}
                        />
                        <span>원</span>
                    </div>
                </div>
                <BasicButton button_name="출금 신청" disable={false} onClick={onClickButton} />
            </div>
            <Backdrop className={classes.backdrop} open={click} onClick={() => setClick(!click)} />
        </>
    )
}

// const PointItem = ({ status }) => {
//     return (
//         <div className={styles['point-wrap']}>
//             <div className={cn('status-text', status)}>적립</div>
//             <div className={styles['time']}>2020-00-00 00:00:00</div>
//             <div className={styles['text']}>주차공간 대여 수익금<span></span></div>
//             <div className={cn('point', status)}>+ 1,000P</div>
//         </div>
//     );
// };


const MyPointContainer = () => {

    const history = useHistory();
    const openDialog = useDialog();
    const [click, setClick] = useState(false);

    const getPointList = useCallback(async () => {
        const JWT_TOKEN = localStorage.getItem('user_id');
        if (JWT_TOKEN) {
            const response = await requestGetMyPoint(JWT_TOKEN);
        } else {
            openDialog("로그인이 필요합니다", "로그인 창으로 이동합니다", () => history.push(Paths.auth.signin));
        }
    }, [history, openDialog])

    useEffect(() => {
        try {
            getPointList();
        } catch (e) {
            console.log('pointList 오류')
        }
    }, [getPointList]);

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['show-area']}>
                    <div className={styles['button']}><XIcon /></div>
                    <div className={styles['content']}>
                        <div className={styles['mypoint']}>나의 수익금</div>
                        <div className={styles['total_point']}>35,000 P</div>
                    </div>
                    <ButtonBase className={styles['withdraw']} onClick={() => setClick(true)}>출금 신청</ButtonBase>
                </div>
                <div className={styles['point-area']}>
                    <div className={styles['point-text']}>수익금 내역</div>
                    {/* --------------PointItem---------------- */}
                    <div className={styles['point-wrap']}>
                        <div className={cn('status-text', 'plus')}>적립</div>
                        <div className={styles['time']}>2020-00-00 00:00:00</div>
                        <div className={styles['text']}>주차공간 대여 수익금<span></span></div>
                        <div className={cn('point', 'plus')}>+ 1,000P</div>
                    </div>
                    <div className={styles['point-wrap']}>
                        <div className={cn('status-text', 'minus')}>차감</div>
                        <div className={styles['time']}>2020-00-00 00:00:00</div>
                        <div className={styles['text']}>출금신청 <span>(계좌:1234-12345-12)</span></div>
                        <div className={cn('point', 'minus')}>- 1,000P</div>
                    </div>
                    <div className={styles['point-wrap']}>
                        <div className={cn('status-text', 'plus')}>적립</div>
                        <div className={styles['time']}>2020-00-00 00:00:00</div>
                        <div className={styles['text']}>주차공간 대여 수익금<span></span></div>
                        <div className={cn('point', 'plus')}>+ 1,000P</div>
                    </div>
                    <div className={styles['point-wrap']}>
                        <div className={cn('status-text', 'plus')}>적립</div>
                        <div className={styles['time']}>2020-00-00 00:00:00</div>
                        <div className={styles['text']}>주차공간 대여 수익금<span></span></div>
                        <div className={cn('point', 'plus')}>+ 1,000P</div>
                    </div>
                    <div className={styles['point-wrap']}>
                        <div className={cn('status-text', 'minus')}>차감</div>
                        <div className={styles['time']}>2020-00-00 00:00:00</div>
                        <div className={styles['text']}>출금신청 <span>(계좌:1234-12345-12)</span></div>
                        <div className={cn('point', 'minus')}>- 1,000P</div>
                    </div>
                    <div className={styles['point-wrap']}>
                        <div className={cn('status-text', 'plus')}>적립</div>
                        <div className={styles['time']}>2020-00-00 00:00:00</div>
                        <div className={styles['text']}>주차공간 대여 수익금<span></span></div>
                        <div className={cn('point', 'plus')}>+ 1,000P</div>
                    </div>
                    <div className={styles['point-wrap']}>
                        <div className={cn('status-text', 'minus')}>차감</div>
                        <div className={styles['time']}>2020-00-00 00:00:00</div>
                        <div className={styles['text']}>출금신청 <span>(계좌:1234-12345-12)</span></div>
                        <div className={cn('point', 'minus')}>- 1,000P</div>
                    </div>
                </div>
            </div>
            <WithdrawModal click={click} setClick={setClick} />
        </>
    );
};

export default MyPointContainer;