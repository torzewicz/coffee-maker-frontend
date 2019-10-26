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
                            <About/>
                        </Route>
                    </Switch>

                </div>

            </Router>


        </div>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

export default App;
