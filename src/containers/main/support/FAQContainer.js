import React, { useState, useCallback, memo, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ButtonBase, IconButton } from '@material-ui/core';
import classnames from 'classnames/bind';
import qs from 'qs';
import useSWR from 'swr';
/* Library */

import styles from './FAQContainer.module.scss';
import Notice from '../../../static/asset/svg/Notice';
import ArrowSmall from '../../../static/asset/svg/ArrowSmall';
/* StyleSheets */

import { useDialog } from '../../../hooks/useDialog';
import useLoading from '../../../hooks/useLoading';
/* Hooks */

import { requestGetFAQList } from '../../../api/faq';
/* API */

import { Paths } from '../../../paths';
/* Paths */

const cn = classnames.bind(styles);

const FAQ_CATEGORIES = [
    '회원가입',
    '쿠폰',
    '결제',
    '포인트',
    '주차공간',
    '대여/연장',
];

const Category = ({ type }) => {
    const history = useHistory();

    const onClickCategory = useCallback(
        (type) => history.replace(Paths.main.support.faq + `?type=${type}`),
        [history],
    );

    return (
        <div className={styles['category-container']}>
            {FAQ_CATEGORIES.map((item, index) => (
                <ButtonBase
                    key={index}
                    className={cn('category', { click: type === index })}
                    onClick={() => onClickCategory(index)}
                >
                    {item}
                </ButtonBase>
            ))}
        </div>
    );
};

const LOADING_FAQ = 'faq';

const FAQItems = memo(({ type }) => {
    const history = useHistory();
    const openDialog = useDialog();
    const [onLoading, offLoading, isLoading] = useLoading();

    const [FAQList, setFAQList] = useState([]);

    const { data } = useSWR(['faq', type], requestGetFAQList);
    useEffect(() => {
        if (!data) {
            onLoading(LOADING_FAQ);
        } else if (data !== undefined) {
            offLoading(LOADING_FAQ);
            if (data.msg === 'success') {
                setFAQList(data.notices);
            } else {
                openDialog('자주묻는 질문리스트 요청 오류', '', () =>
                    history.goBack(),
                );
            }
        }
        // eslint-disable-next-line
    }, [data]);

    const onClickItem = useCallback(
        (e) => {
            const newFAQList = FAQList.map((item) =>
                item.faq_id === parseInt(e.target.id)
                    ? { ...item, faq_check: !item.faq_check }
                    : item,
            );
            setFAQList(newFAQList);
        },
        [FAQList, setFAQList],
    );

    return (
        <>
            {!isLoading[LOADING_FAQ] &&
                (FAQList.length ? (
                    <ul className={styles['container']}>
                        {FAQList.map(
                            ({ faq_id, question, answer, faq_check }) => (
                                <div
                                    className={cn('border', {
                                        click: faq_check,
                                    })}
                                    key={faq_id}
                                >
                                    <ButtonBase
                                        component={'li'}
                                        className={styles['text-area']}
                                        id={faq_id}
                                        onClick={onClickItem}
                                    >
                                        <div className={styles['text-wrap']}>
                                            <div className={styles['question']}>
                                                Q
                                            </div>
                                            <div className={styles['text']}>
                                                <div
                                                    className={styles['title']}
                                                >
                                                    {question}
                                                </div>
                                                <div
                                                    className={styles['bottom']}
                                                >
                                                    <div
                                                        className={
                                                            styles['name']
                                                        }
                                                    >
                                                        운영자
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <IconButton className={styles['arrow']}>
                                            <ArrowSmall
                                                rotate={faq_check ? 0 : 180}
                                            />
                                        </IconButton>
                                    </ButtonBase>
                                    <div
                                        className={cn('sub-text', {
                                            click: faq_check,
                                        })}
                                    >
                                        {answer}
                                    </div>
                                </div>
                            ),
                        )}
                    </ul>
                ) : (
                    <div className={styles['non-faq']}>
                        <div className={styles['non-container']}>
                            <Notice />
                            <div className={styles['explain']}>
                                등록된 자주 묻는 질문이 없습니다.
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
});

const FAQContainer = () => {
    const location = useLocation();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const t = query.type ? query.type : '0';
    const type = parseInt(t);

    return (
        <>
            <Category type={type} />
            <FAQItems type={type} />
        </>
    );
};

export default FAQContainer;
