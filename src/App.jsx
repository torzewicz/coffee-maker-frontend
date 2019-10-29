import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './App.scss';
import TopBar from "./component/topbar/TopBar";
import SideBar from "./component/sidebar/SideBar";
import CoffeeMaker from "./component/main/CoffeeMaker";
import WsExample from "./component/WsExample";

function App() {
    return (
        <div className="App">

            <TopBar/>

            <Router>


                <SideBar/>

                <div className="main-content">

                    <Switch>

                        <Route path="/order">
                            <CoffeeMaker/>
                        </Route>
                        <Route path="/about">
                            <WsExample/>
                        </Route>
                    </Switch>

                </div>

            </Router>


        </div>
    );
}


export default App;
