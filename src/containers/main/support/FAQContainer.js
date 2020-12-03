import React, { useState, useCallback, memo, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ButtonBase, IconButton } from '@material-ui/core';
import classnames from 'classnames/bind';
import qs from 'qs';
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

const Category = ({ type }) => {

    const history = useHistory();

    return (
        <div className={styles['category-container']}>
            <ButtonBase className={cn('category', { click: type === 0 })} onClick={() => history.replace(Paths.main.support.faq + '?type=0')}>회원가입</ButtonBase>
            <ButtonBase className={cn('category', { click: type === 1 })} onClick={() => history.replace(Paths.main.support.faq + '?type=1')}>쿠폰</ButtonBase>
            <ButtonBase className={cn('category', { click: type === 2 })} onClick={() => history.replace(Paths.main.support.faq + '?type=2')}>결제</ButtonBase>
            <ButtonBase className={cn('category', { click: type === 3 })} onClick={() => history.replace(Paths.main.support.faq + '?type=3')}>포인트</ButtonBase>
            <ButtonBase className={cn('category', { click: type === 4 })} onClick={() => history.replace(Paths.main.support.faq + '?type=4')}>주차공간</ButtonBase>
            <ButtonBase className={cn('category', { click: type === 5 })} onClick={() => history.replace(Paths.main.support.faq + '?type=5')}>대여연장</ButtonBase>
        </div>
    );
};

const FAQItems = memo(({ FAQList, setFAQList }) => {

    const onClickItem = useCallback((e) => {
        const newFAQList = FAQList.map(item => (
            item.faq_id === parseInt(e.target.id) ? { ...item, faq_check: !item.faq_check } : item
        ))
        setFAQList(newFAQList);
    }, [FAQList, setFAQList]);

    return (
        <ul className={styles['container']}>
            {FAQList.map(({ faq_id, question, answer, faq_check }) => (
                <div className={cn('border', { click: faq_check })} key={faq_id}>
                    <ButtonBase
                        component={"li"}
                        className={styles['text-area']}
                        id={faq_id}
                        onClick={onClickItem}
                    >
                        <div className={styles['text-wrap']}>
                            <div className={styles['question']}>Q</div>
                            <div className={styles['text']}>
                                <div className={styles['title']}>{question}</div>
                                <div className={styles['bottom']}>
                                    <div className={styles['name']}>운영자</div>
                                </div>
                            </div>
                        </div>
                        <IconButton
                            className={styles['arrow']}
                        >
                            <ArrowSmall rotate={faq_check ? 0 : 180} />
                        </IconButton>
                    </ButtonBase>
                    <div className={cn('sub-text', { click: faq_check })}>{answer}</div>
                </div>
            ))}
        </ul>
    );
});

const FAQContainer = () => {

    const [FAQList, setFAQList] = useState([]);

    const openDialog = useDialog();
    const [onLoading, offLoading] = useLoading();
    const location = useLocation();
    const history = useHistory();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const t = query.type ? query.type : "0";
    const type = parseInt(t);

    const getFAQList = useCallback(async () => {
        onLoading('faq');
        const response = await requestGetFAQList(type);
        setFAQList(response.notices);
        offLoading('faq');
        // eslint-disable-next-line
    }, [type])

    useEffect(() => {
        try {
            getFAQList();
        } catch (e) {
            openDialog("자주묻는 질문리스트 요청 오류", "", () => history.goBack());
        }
    }, [getFAQList, openDialog, history])

    if (FAQList.length !== 0) {
        return (
            <>
                <Category type={type} />
                <FAQItems FAQList={FAQList} setFAQList={setFAQList} />
            </>
        );
    };
    return (
        <>
            <Category type={type} />
            <div className={styles['non-faq']}>
                <div className={styles['non-container']}>
                    <Notice />
                    <div className={styles['explain']}>등록된 자주 묻는 질문이 없습니다.</div>
                </div>
            </div>
        </>
    );
};

export default FAQContainer;