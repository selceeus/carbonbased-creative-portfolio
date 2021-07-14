import React from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
  } from "react-router-dom";
//import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AnimatePresence, motion } from "framer-motion";

//Imported Components 
import Header from './components/header/header.component';
import Home from './pages/home/home.component';
import About from './pages/about/about.component';
import Solutions from './pages/solutions/solutions.component';
import Work from './pages/work/work.component';
import DetailedWork from './pages/detailed-work/detailed-work.component';
import Journal from './pages/journal/journal.component';
import DetailedJournal from './pages/detailed-journal/detailed-journal.component';
import Contact from './pages/contact/contact.component';
import Footer from './components/footer/footer.component';

import './App.scss';

const {REACT_APP_API_URL, REACT_APP_JWT_AUTH_USERNAME, REACT_APP_JWT_AUTH_PASSWORD} = process.env;

const loginData = {
    username: REACT_APP_JWT_AUTH_USERNAME,
    password: REACT_APP_JWT_AUTH_PASSWORD
};

axios
    .post(`${REACT_APP_API_URL}wp-json/jwt-auth/v1/token`, loginData)
    .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_nicename', res.data.user_nicename);
        localStorage.setItem('user_email', res.data.user_email);
        localStorage.setItem('user_display_name', res.data.user_display_name);
    })
    .catch((err) => {
        console.log(err);
});

function App() {

    return (
        <section className="App">

            <Header />
            
            <main role="main">

                <Router>

                    <section className="nav-container">
                        <nav>
                            <ul>
                                <li>
                                    <NavLink to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about">About</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/solutions">Solutions</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/work">Work</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/journal">Journal</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact">Contact</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </section>

                    <AnimatePresence exitBeforeEnter>
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/solutions">
                                <Solutions />
                            </Route>
                            <Route exact path="/work">
                                <Work />
                            </Route>
                            <Route path="/work/:slug" component={DetailedWork}></Route>
                            <Route exact path="/journal">
                                <Journal />
                            </Route>
                            <Route path="/journal/:slug" component={DetailedJournal}></Route>
                            <Route path="/contact">
                                <Contact />
                            </Route>
                        </Switch>
                    </AnimatePresence>

                </Router>

            </main>

            <Footer />

        </section>
    );
}

export default App;
