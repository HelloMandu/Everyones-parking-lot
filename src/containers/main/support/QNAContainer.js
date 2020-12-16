import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';
import classnames from 'classnames/bind';
/* Library */

import { useDialog } from '../../../hooks/useDialog';
import useLoading from '../../../hooks/useLoading';
/* Hooks */

import styles from './QNAContainer.module.scss';
import Notice from '../../../static/asset/svg/Notice';
/* StyleSheets */

import useToken from '../../../hooks/useToken';
/* hooks */

import { Paths } from '../../../paths';
/* Paths */

import { requestGetQNAList } from '../../../api/qna';
/* API */

import { getFormatDateNanTime } from '../../../lib/calculateDate';
/* Lib */

const cn = classnames.bind(styles);

const Header = () => {
    return (
        <div className={styles['header-container']}>
            <Link to={Paths.main.support.qna_write}>
                <ButtonBase className={styles['write-button']}>문의 작성</ButtonBase>
            </Link>
        </div>
    );
};

const QNAItems = ({ QNAList }) => {

    return (
        <ul className={styles['container']}>
            {QNAList.map(({ qna_id, updatedAt, subject, user, hit, status }) => (
                <Link to={Paths.main.support.qna_detail + `?id=${qna_id}`} key={qna_id}>
                    <ButtonBase
                        component={"li"}
                        className={styles['item-area']}
                    >
                        <div className={styles['date']}>{getFormatDateNanTime(updatedAt)}</div>
                        <div className={styles['title']}>{subject}</div>
                        <div className={styles['bottom']}>
                            {/* <div className={styles['name']}>{user.name}</div> */}
                            <div className={styles['count']}>조회수 {hit}</div>
                        </div>
                        <div className={cn('button', { status: status })}>
                            {status ? "답변완료" : "답변대기"}
                        </div>
                    </ButtonBase>
                </Link>
            ))}
        </ul>
    );
};

const QNAContainer = () => {

    const history = useHistory();
    const openDialog = useDialog();
    const TOKEN = useToken();
    const [onLoading, offLoading] = useLoading();

    const [QNAList, setQNSList] = useState([]);

    const getQNAList = useCallback(async () => {
        onLoading('qna');
        const JWT_TOKEN = localStorage.getItem('user_id');
        const response = await requestGetQNAList(JWT_TOKEN);
        setQNSList(response.qnas);
        offLoading('qna');
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (TOKEN !== null) {
            try {
                getQNAList();
            } catch (e) {
                openDialog("1:1문의 오류", "", () => history.goBack());
            }
        }
    }, [getQNAList, openDialog, history, TOKEN]);

    return (
        <>
            {TOKEN !== null &&
                <>
                    <Header />
                    {QNAList.length !== 0
                        ? <QNAItems QNAList={QNAList} />
                        : <div className={styles['non-qna']}>
                            <div className={styles['non-container']}>
                                <Notice />
                                <div className={styles['explain']}>등록된 1:1 문의가 없습니다.</div>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    );
};

export default QNAContainer;