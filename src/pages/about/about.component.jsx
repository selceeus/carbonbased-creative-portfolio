import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InstagramFeed  from 'react-ig-feed';

//Page Components
import AboutHero from '../../components/about/aboutHero.component';
import AboutApproach from '../../components/about/aboutApproach.component';
import AboutExperience from '../../components/about/aboutExperience.component';
import Loader from '../../components/utilities/loader.component';

import './about.styles.scss';

const {REACT_APP_API_URL, REACT_APP_INSTA_TOKEN} = process.env;

const authAxios = axios
    .create({
        baseUrl: REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
});

function About() {

    const [data, setData] = useState([]);
    const [requestError, setRequestError] = useState([]);

    const renderPage = props => {

        if(!Object.keys(props).length > 0) {
            return <Loader />;
        }
        else {
            return(
                <React.Fragment>
                    {AboutHero(props)}
                    {AboutApproach(props)}
                    {AboutExperience(props)}
                    {<InstagramFeed token={REACT_APP_INSTA_TOKEN}  counter="3"/>}
                </React.Fragment>
            )
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await authAxios
                    .get( `${REACT_APP_API_URL}wp-json/wp/v2/pages/8` )
                    .then( result => setData(result.data) );
            } catch(err) {
                setRequestError(err.message);
            }
        };
        fetchData();
    }, []);
    
    return(
        <section className="about">
            {renderPage(data)}
        </section>
    );
}

export default About;
