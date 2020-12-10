import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames/bind';
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

import { numberFormat } from '../../../lib/formatter';
/* Lib */

import { requestGetMyPoint } from '../../../api/point';
import { requestPostWithdraw } from '../../../api/withdraw';
/* api */

const cn = classnames.bind(styles);
const card = [
    'KB국민은행',
    '신한은행',
    '하나은행',
    '우리은행',
    'IBK기업은행',
    'NH농협은행',
    'KDB산업은행',
    'SC제일은행',
];

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
        height: "100vh",
    },
}));

const WithdrawModal = ({ click, setClick }) => {

    const classes = useStyles();
    const openDialog = useDialog();

    // const [bank, onChangeBank] = useInput('');
    const [account, onChangeAccount] = useInput('');
    const [price, onChangePrice] = useInput('');

    const [check, setCheck] = useState(false);

    const onClickButton = useCallback(async () => {
        const JWT_TOKEN = localStorage.getItem('user_id');
        if (parseInt(price) <= 0) {
            openDialog("0포인트 이하 액수를 출금할 수 없습니다.");
        }
        const response = await requestPostWithdraw(JWT_TOKEN, account, price);
        if (response.msg === 'success') {
            openDialog("출금이 완료되었습니다.", "", () => { setClick(false); onChangeAccount(); onChangePrice(); });
        } else {
            openDialog(response.msg);
        }
    }, [account, price, openDialog, setClick, onChangeAccount, onChangePrice]);

    useEffect(() => {
        if (account && price) setCheck(true);
        else setCheck(false);
    }, [account, price])

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
                            <select className={styles['select']} defaultValue={'defalut'}>
                                <option disabled value='defalut'>은행 선택</option>
                                {card.map((item) => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles['account-text']}>
                            <InputBox
                                className={'input-box'}
                                type={'number'}
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
                            type={'number'}
                            value={price}
                            onChange={onChangePrice}
                        />
                        <span>원</span>
                    </div>
                </div>
                <BasicButton button_name="출금 신청" disable={!check} onClick={onClickButton} />
            </div>
            <Backdrop className={classes.backdrop} open={click} onClick={() => { setClick(!click); onChangeAccount(); onChangePrice(); }} />
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
    const getUserInfo = useSelector(state => state.user);

    const [click, setClick] = useState(false);

    const getPointList = useCallback(async () => {
        const JWT_TOKEN = localStorage.getItem('user_id');
        const response = await requestGetMyPoint(JWT_TOKEN);
        console.log(response);
    }, [])

    useEffect(() => {
        try {
            getPointList();
        } catch (e) {
            openDialog("수익금 오류", "", () => history.goBack());
        }
    }, [getPointList, history, openDialog, click]);

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['show-area']}>
                    <div className={styles['button']}><XIcon /></div>
                    <div className={styles['content']}>
                        <div className={styles['mypoint']}>나의 수익금</div>
                        <div className={styles['total_point']}>{numberFormat(getUserInfo.point)} P</div>
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