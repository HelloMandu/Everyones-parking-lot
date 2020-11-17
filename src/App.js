import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.scss';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

import Header from './components/header/Header';

import { Paths, HeaderTitle } from './paths';


//  develop 브런치 (테스트 브런치);
const App = () => {

    const location = useLocation();

    const renderHeader = () => {
        const { pathname } = location;

        // 로그인
        if (pathname === Paths.auth.signin) {
            return <Header title={HeaderTitle.auth.signin} />
        }
        // 회원가입
        else if (pathname === Paths.auth.signup) {
            return <Header title={HeaderTitle.auth.signup} />
        }
        // 회원가입 완료
        else if (pathname === Paths.auth.sign_complete) {
            return <Header title={HeaderTitle.auth.sign_complete} />
        }
        // 차량번호 등록
        else if (pathname === Paths.auth.enrollment) {
            return <Header title={HeaderTitle.auth.enrollment} />
        }
        // 아이디/비밀번호 찾기
        else if (pathname === Paths.auth.find.index) {
            return <Header title={HeaderTitle.auth.find.index} />
        }
        // 이용 내역
        else if (pathname === Paths.main.use.list) {
            return <Header title={HeaderTitle.main.use.list} />
        }
        // 내가 작성한 리뷰
        else if (pathname === Paths.main.review.list) {
            return <Header title={HeaderTitle.main.review.list} />
        }
        // 리뷰 쓰기
        else if (pathname === Paths.main.review.write) {
            return <Header title={HeaderTitle.main.review.write} />
        }
        // 리뷰 상세 보기
        else if (pathname === Paths.main.review.detail) {
            return <Header title={HeaderTitle.main.review.detail} />
        }
        // 내 주차공간 관리
        else if (pathname === Paths.main.parking.manage) {
            return <Header title={HeaderTitle.main.parking.manage} />
        }
        // 주차공간 등록
        else if (pathname === Paths.main.parking.enrollment.index) {
            return <Header title={HeaderTitle.main.parking.enrollment.index} />
        }
        // 적용 쿠폰 선택
        else if (pathname === Paths.main.parking.enrollment.coupon) {
            return <Header title={HeaderTitle.main.parking.enrollment.coupon} />
        }
        // 결제 수단 선택
        else if (pathname === Paths.main.parking.enrollment.payment) {
            return <Header title={HeaderTitle.main.parking.enrollment.payment} />
        }
        //알림함
        else if (pathname === Paths.main.notification) {
            return <Header title={HeaderTitle.main.notification} />
        }
        //쿠폰
        else if (pathname === Paths.main.coupon) {
            return <Header title={HeaderTitle.main.coupon} />
        }
        //이벤트 리스트
        else if (pathname === Paths.main.event.list) {
            return <Header title={HeaderTitle.main.event.list} />
        }
        //이벤트 상세보기
        else if (pathname === Paths.main.event.detail) {
            return <Header title={HeaderTitle.main.event.detail} />
        }
        //이름 변경
        else if (pathname === Paths.main.mypage.update.name) {
            return <Header title={HeaderTitle.main.mypage.update.name} />
        }
        //비밀번호 변경
        else if (pathname === Paths.main.mypage.update.password) {
            return <Header title={HeaderTitle.main.mypage.update.password} />
        }
        //연락처 변경
        else if (pathname === Paths.main.mypage.update.hp) {
            return <Header title={HeaderTitle.main.mypage.update.hp} />
        }
    }

    return (
        <div className="App">
            {renderHeader()}
            <Switch className="test">
                <Route path={Paths.auth.index} component={AuthPage} />
                <Route path={Paths.main.index} component={MainPage} />
                <Route component={ErrorPage} />
            </Switch>
        </div>
    );
};

export default App;
