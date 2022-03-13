import React from 'react';
import axios from 'axios';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

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
            <main role="main">
                <BrowserRouter>
                <Header />
                    <AnimatePresence exitBeforeEnter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="about" element={<About />} />
                            <Route path="solutions" element={<Solutions />} />
                            <Route path="work" element={<Work />} />
                            <Route path="work/:id" element={<DetailedWork />} />
                            <Route path="journal" element={<Journal />} />
                            <Route path="journal/:id" element={<DetailedJournal />} />
                            <Route path="contact" element={<Contact />} />
                        </Routes>
                    </AnimatePresence>
                </BrowserRouter>
            </main>
            <Footer />
        </section>
    );
}

export default App;
