//import logo from '/logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route, Redirect } from 'react-router-dom';
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
                    .get( apiUrl + "/wp/v2/pages" )
                    .then( result => setData(result.data) );

            } catch(err) {
                setRequestError(err.message);
            }
        };

        fetchData();
      
    }, []);

    return (
        <section className="App">
            <header className="App-header" role="region">
                <img src="/img/logos/logo.svg" className="App-logo" alt="logo" />
            </header>
            <main role="main">
                {/*<Route render={({location}) => (
                    <TransitionGroup>
                        <CSSTransition key={location.key} classNames="fade" timeout={300}>
                            <Switch>
                                <Route exact path='/' component={Homepage} />
                                <Route path='/city-listing/:cityName' component={CityListing} />
                                <Route path='/map' component={Map} />
                                <Route exact path='/detailed-listing/:breweryId' component={DetailedListing} />
                                <Route path='/contact' component={Contact} />
                                <Route path='/sign-up' component={Signup} />
                                <Redirect to='/' />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )} />*/}
                <ul>
                    {data.map(item => (
                        <li key={item.id}>
                            <h3 className="titles">{item.slug}</h3>
                            <p>{item.slug}</p>
                        </li>
                    ))}
                </ul>
            </main>
            <Footer />
        </section>
    );
}

export default App;
