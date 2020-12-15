/*global Kakao*/

import React, { useEffect, useCallback } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.scss';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

import DialogContainer from './containers/assets/DialogContainer';
import LoadingContainer from './containers/assets/LoadingContainer';
import IntroContainer from './containers/main/IntroContainer';

import Header from './components/header/Header';

import { Paths, HeaderTitle } from './paths';
import { useDispatch } from 'react-redux';
import { getUser } from './store/user';

import { set_filters } from './store/main/filters';
import { set_position } from './store/main/position';
const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const judgementLogin = useCallback(() => {
        const token = localStorage.getItem('user_id');
        if (token) {
            dispatch(getUser(token));
        }
    }, [dispatch]);

    useEffect(() => {
        const filter_data = JSON.parse(localStorage.getItem('filter_data'));
        if (filter_data) {
            const {
                parking_town,
                underground_parking,
                ground_parking,
                stated_parking,
            } = filter_data;
            dispatch(set_filters({ type: 'parking_town', value: parking_town }));
            dispatch(set_filters({ type: 'underground_parking', value: underground_parking }));
            dispatch(set_filters({ type: 'ground_parking', value: ground_parking }));
            dispatch(set_filters({ type: 'stated_parking', value: stated_parking }));
        } else {
            const init_filter = {
                parking_town: true,
                underground_parking: true,
                ground_parking: true,
                stated_parking: true,
            };
            localStorage.setItem('filter_data', JSON.stringify(init_filter));
        }

        const position_data = JSON.parse(localStorage.getItem('position'));
        if (position_data) {
            const { lat, lng } = position_data;
            dispatch(set_position({ lat, lng }));
        } else {
            const init_position = {
                lat: 35.8360328674316,
                lng: 128.5743408203125,
            };
            localStorage.setItem('position', JSON.stringify(init_position));
        }
    }, [dispatch]);
    
    useEffect(() => {
        Kakao.init('1c0eaf33be9ad7d4b2c907a0212d6903');
        judgementLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const renderHeader = () => {
        const { pathname } = location;

        // 로그인
        if (pathname === Paths.auth.signin) {
            return <Header title={HeaderTitle.auth.signin} />;
        }
        // 회원가입
        else if (pathname === Paths.auth.signup) {
            return <Header title={HeaderTitle.auth.signup} />;
        }
        // 차량번호 등록
        else if (pathname === Paths.auth.enrollment) {
            return <Header title={HeaderTitle.auth.enrollment} />;
        }
        // 회원가입 완료
        else if (pathname === Paths.auth.sign_complete) {
            return <Header title={HeaderTitle.auth.sign_complete} />;
        }
        //아이디/비밀번호 찾기
        else if (pathname === Paths.auth.find.index) {
            return <Header title={HeaderTitle.auth.find.index} />;
        }
        //아이디 찾기
        else if (pathname === Paths.auth.find.email) {
            return <Header title={HeaderTitle.auth.find.email} />;
        }
        //비밀번호 찾기
        else if (pathname === Paths.auth.find.password) {
            return <Header title={HeaderTitle.auth.find.password} />;
        }
        //이메일 찾기 완료
        else if (pathname === Paths.auth.find.email_complete) {
            return <Header title={HeaderTitle.auth.find.email_complete} />;
        }
        //비밀번호 재설정
        else if (pathname === Paths.auth.find.password_complete) {
            return <Header title={HeaderTitle.auth.find.password_complete} />;
        }
        // 결제정보 확인
        else if (pathname === Paths.main.payment) {
            return <Header title={HeaderTitle.main.payment} />;
        }
        // 이용 내역
        else if (pathname === Paths.main.use.list) {
            return <Header title={HeaderTitle.main.use.list} />;
        } else if (pathname === Paths.main.use.extend) {
            return <Header title={HeaderTitle.main.use.extend} />;
        }
        // 내가 작성한 리뷰
        else if (pathname === Paths.main.review.list) {
            return <Header title={HeaderTitle.main.review.list} />;
        }
        // 리뷰 쓰기
        else if (pathname === Paths.main.review.write) {
            return <Header title={HeaderTitle.main.review.write} />;
        }
        // 리뷰 상세 보기
        else if (pathname === Paths.main.review.detail) {
            return <Header title={HeaderTitle.main.review.detail} />;
        }
        // 내 주차공간 관리
        else if (pathname === Paths.main.parking.manage) {
            return <Header title={HeaderTitle.main.parking.manage} />;
        }
        // 주차공간 등록
        else if (pathname === Paths.main.parking.enrollment) {
            return <Header title={HeaderTitle.main.parking.enrollment} />;
        }
        //알림함
        else if (pathname === Paths.main.notification) {
            return <Header title={HeaderTitle.main.notification} />;
        }
        //쿠폰
        else if (pathname === Paths.main.coupon) {
            return <Header title={HeaderTitle.main.coupon} />;
        }
        //이벤트 리스트
        else if (pathname === Paths.main.event.list) {
            return <Header title={HeaderTitle.main.event.list} />;
        }
        //이벤트 상세보기
        else if (pathname === Paths.main.event.detail) {
            return <Header title={HeaderTitle.main.event.detail} />;
        }
        //내 정보 수정
        else if (pathname === Paths.main.mypage.index) {
            return <Header title={HeaderTitle.main.mypage.index} />;
        }
        //이름 변경
        else if (pathname === Paths.main.mypage.update.name) {
            return <Header title={HeaderTitle.main.mypage.update.name} />;
        }
        //비밀번호 변경
        else if (pathname === Paths.main.mypage.update.password) {
            return <Header title={HeaderTitle.main.mypage.update.password} />;
        }
        //연락처 변경
        else if (pathname === Paths.main.mypage.update.hp) {
            return <Header title={HeaderTitle.main.mypage.update.hp} />;
        }
        //차량정보 등록
        else if (pathname === Paths.main.mypage.update.enrollment) {
            return <Header title={HeaderTitle.main.mypage.update.enrollment} />;
        }
        //생년월일 변경
        else if (pathname === Paths.main.mypage.update.birthday) {
            return <Header title={HeaderTitle.main.mypage.update.birthday} />;
        }
        //회원 탈퇴
        else if (pathname === Paths.main.mypage.withdraw) {
            return <Header title={HeaderTitle.main.mypage.withdraw} />;
        }
        //환경설정
        else if (pathname === Paths.main.setting) {
            return <Header title={HeaderTitle.main.setting} />;
        }
        //공지사항 리스트 뷰
        else if (pathname === Paths.main.support.notice) {
            return <Header title={HeaderTitle.main.support.notice} />;
        }
        //공지사항 상세보기
        else if (pathname === Paths.main.support.notice_detail) {
            return <Header title={HeaderTitle.main.support.notice_detail} />;
        }
        //자주 묻는 질문 리스트 뷰
        else if (pathname === Paths.main.support.faq) {
            return <Header title={HeaderTitle.main.support.faq} />;
        }
        //1:1문의 리스트뷰
        else if (pathname === Paths.main.support.qna) {
            return <Header title={HeaderTitle.main.support.qna} />;
        }
        //1:1문의 상세보기
        else if (pathname === Paths.main.support.qna_detail) {
            return <Header title={HeaderTitle.main.support.qna_detail} />;
        }
        //1:1문의 작성
        else if (pathname === Paths.main.support.qna_write) {
            return <Header title={HeaderTitle.main.support.qna_write} />;
        }
    };

    const visited = localStorage.getItem('SpaceStation_visited');

    return visited ? (
        <div className="App">
            {renderHeader()}
            <Switch>
                <Route path={Paths.auth.index} component={AuthPage} />
                <Route path={Paths.index} component={MainPage} />
                <Route component={ErrorPage} />
            </Switch>
            <DialogContainer />
            <LoadingContainer />
        </div>
    ) : (
        <IntroContainer />
    );
};

export default App;
