import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';
import classnames from 'classnames/bind';

import styles from './QNAContainer.module.scss';
import Notice from '../../../static/asset/svg/Notice';
/* StyleSheets */

import { Paths } from '../../../paths';
/* Paths */

import { getFormatDateNanTime } from '../../../lib/calculateDate';
/* Lib */

const cn = classnames.bind(styles);

const Header = () => {
    return (
        <div className={styles['header-container']}>
            <Link to={Paths.main.support.qna_write}>
                <ButtonBase className={styles['write-button']}>
                    문의 작성
                </ButtonBase>
            </Link>
        </div>
    );
};

const QNAItems = ({ QNAList }) => {
    return (
        <ul className={styles['container']}>
            {QNAList.map(
                ({ qna_id, createdAt, subject, user, hit, status }) => (
                    <Link
                        to={Paths.main.support.qna_detail + `?id=${qna_id}`}
                        key={qna_id}
                    >
                        <ButtonBase
                            component={'li'}
                            className={styles['item-area']}
                        >
                            <div className={styles['date']}>
                                {getFormatDateNanTime(createdAt)}
                            </div>
                            <div className={styles['title']}>{subject}</div>
                            <div className={styles['bottom']}>
                                <div className={styles['name']}>
                                    {user.name}
                                </div>
                                <div className={styles['count']}>
                                    조회수 {hit}
                                </div>
                            </div>
                            <div className={cn('button', { status: status })}>
                                {status ? '답변완료' : '답변대기'}
                            </div>
                        </ButtonBase>
                    </Link>
                ),
            )}
        </ul>
    );
};

const QNAContainer = ({ QNAList }) => {
    return (
        <>
            <Header />
            {QNAList.length !== 0 ? (
                <QNAItems QNAList={QNAList} />
            ) : (
                    <div className={styles['non-qna']}>
                        <div className={styles['non-container']}>
                            <Notice />
                            <div className={styles['explain']}>
                                등록된 1:1 문의가 없습니다.
                        </div>
                        </div>
                    </div>
                )}
        </>
    );
};

export default QNAContainer;
