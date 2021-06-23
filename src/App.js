//import logo from '/logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';


function App() {

    const [data, setData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            const secretToken = "ry5N+C*(||&B@_-Z~I|_|@D[;?-)!mfh#AX(;$~+Agm";

            const api = "https://cms.matthewa.development/wp-json/wp/v2/pages";

            const result = await axios
            .get(api, { headers: {"Authorization" : `Bearer ${token}`} } )
            .then(result => setData(result.data))
        };

        fetchData();
      
    }, []);

    return (
        <section className="App">
            <header className="App-header" role="region">
                <img src="logo512.png" className="App-logo" alt="logo" />
                <ul>
                    {data.map(item => (
                        <li key={item.id}>
                            <h3 className="titles">{item.slug}</h3>
                        </li>
                    ))}
                </ul>
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
            </header>
            <main role="main">
                <p>Hello to new site - This is a test again</p>
            </main>
            <footer role="region">
                <p>this is the footer</p>
            </footer>
        </section>
    );
}

export default App;
