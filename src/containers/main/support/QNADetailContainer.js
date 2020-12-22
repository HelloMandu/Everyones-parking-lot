import React, { useEffect, useCallback, useState } from 'react';
import qs from 'qs';
import classnames from 'classnames/bind';
import { useLocation, useHistory } from 'react-router-dom';
/* Library */

import { useDialog } from '../../../hooks/useDialog';
import useLoading from '../../../hooks/useLoading';
/* Hooks */

import styles from './QNADetailContainer.module.scss';
/* StyleSheets */

import { requestGetDetailQNAList } from '../../../api/qna';
import { getFormatDateNanTime } from '../../../lib/calculateDate';
/* API */

const cn = classnames.bind(styles);

const QNADetailContainer = () => {
    const location = useLocation();
    const history = useHistory();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const qna_id = parseInt(query.id);

    const openDialog = useDialog();
    const [onLoading, offLoading] = useLoading();

    const [QNADetail, setQNADetail] = useState();

    const getQNADetailList = useCallback(async () => {
        onLoading('qna_detail');
        const JWT_TOKEN = localStorage.getItem('user_id');
        if (JWT_TOKEN) {
            try {
                const response = await requestGetDetailQNAList(
                    JWT_TOKEN,
                    qna_id,
                );
                setQNADetail(response.qna);
            } catch (e) {
                console.error(e);
                offLoading('qna_detail');
            }
        }
        offLoading('qna_detail');
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        try {
            getQNADetailList();
        } catch (e) {
            openDialog('1:1상세보기 리스트 오류', '', () => history.goBack());
        }
    }, [getQNADetailList, openDialog, history]);

    if (!QNADetail) {
        return null;
    }
    return (
        <div className={styles['container']}>
            <div className={styles['header-area']}>
                <div className={styles['header-wrap']}>
                    <div className={styles['top']}>
                        <div className={styles['date']}>
                            {getFormatDateNanTime(QNADetail.updatedAt)}
                        </div>
                        <div
                            className={cn('button', {
                                status: QNADetail.status,
                            })}
                        >
                            {QNADetail.status ? '답변완료' : '답변대기'}
                        </div>
                    </div>
                    <div className={styles['title']}>{QNADetail.subject}</div>
                    <div className={styles['bottom']}>
                        <div className={styles['name']}>
                            {QNADetail.user.name}
                        </div>
                        <div className={styles['count']}>
                            조회수 {QNADetail.hit}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['question-area']}>{QNADetail.question}</div>
            <div className={styles['answer-area']}>{QNADetail.answer}</div>
        </div>
    );
};

export default QNADetailContainer;
