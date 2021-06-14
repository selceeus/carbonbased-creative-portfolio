//import logo from '/logo.svg';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';

function App() {
    return (
        <section className="App">
            <header className="App-header" role="region">
                <img src="logo512.png" className="App-logo" alt="logo" />
                <Route render={({location}) => (
                  <TransitionGroup>
                  <CSSTransition key={location.key} classNames="fade" timeout={300}>
                      <Switch>
                          <Route exact path='/' component={Homepage} />
                          <Route path='/city-listing/:cityName' component={CityListing}  />
                          <Route path='/map' component={Map} />
                          <Route exact path='/detailed-listing/:breweryId' component={DetailedListing} />
                          <Route path='/contact' component={Contact} />
                          <Route path='/sign-up' component={Signup} />
                          <Redirect to='/' />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                )} />
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
