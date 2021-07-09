import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//Imported Components 
import Home from './pages/home/home.component';
import About from './pages/about/about.component';
import Solutions from './pages/solutions/solutions.component';
import Journal from './pages/journal/journal.component';
import DetailedJournal from './pages/detailed-journal/detailed-journal.component';
import Contact from './pages/contact/contact.component';
import Footer from './components/footer/footer.component';

import './App.scss';

const apiUrl = "https://cms.matthewa.development/wp-json";

const loginData = {
    username: "selceeus",
    password: "1201ButterGus!"
};

axios
    .post('https://cms.matthewa.development/wp-json/jwt-auth/v1/token', loginData)
    .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_nicename', res.data.user_nicename);
        localStorage.setItem('user_email', res.data.user_email);
        localStorage.setItem('user_display_name', res.data.user_display_name);
    })
    .catch((err) => {
        console.log(err);
});

const authAxios = axios
    .create({
        baseUrl: apiUrl,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
});

function App() {

    const [data, setData] = useState([]);
    const [requestError, setRequestError] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await authAxios
                    .get( apiUrl + "/wp/v2/pages/62" )
                    .then( result => setData(result.data) );

            } catch(err) {
                setRequestError(err.message);
            }
        };
        
        fetchData();
    }, []);

    return (
        <section className="App">
            <Route render={({location}) => (
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames="fade" timeout={300}>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/about' component={About} />
                            <Route path='/solutions' component={Solutions} />
                            <Route exact path='/journal/' component={Journal} />
                            <Route exact path='/journal/:journalId' component={DetailedJournal} />
                            <Route path='/contact' component={Contact} />
                            <Redirect to='/' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )} />
            <main role="main">
            
            </main>
            <Footer />
        </section>
    );
}

export default App;
