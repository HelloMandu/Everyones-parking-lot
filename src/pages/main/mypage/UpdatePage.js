import React from 'react';
import {useLocation} from 'react-router-dom';
import { Paths } from '../../../paths';
import { Switch, Route } from 'react-router-dom';
const UpdatePage = () => {

    return (
        <div>
            <Switch>
                <Route path={Paths.main.mypage.update.name} render={() => <h1>이름변경</h1>} />
                <Route path={Paths.main.mypage.update.password} render={() => <h1>비밀번호</h1>} />
                <Route path={Paths.main.mypage.update.hp} render={() => <h1>핸드폰</h1>} />
                <Route path={Paths.main.mypage.update.enrollment} render={() => <h1>차량변경</h1>} />
                <Route path={Paths.main.mypage.update.birthday} render={() => <h1>생일변경</h1>} />
                <Route path={Paths.main.mypage.update.profile} render={() => <h1>프로필변경</h1>} />
                <Route render={() => <h1>업데이트 페이지 에러</h1>} />
            </Switch>
        </div>
    );
}
export default UpdatePage;