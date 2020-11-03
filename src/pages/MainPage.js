import DetailPage from "./main/DetailPage";

const { Switch, Route } = require("react-router-dom")
const { Paths } = require("../paths")

const MainPage = () => {


    return (
        <div>
            <Switch>
                <Route path={Paths.main.detail} component={DetailPage} />
            </Switch>
        </div>
    );
}

export default MainPage;