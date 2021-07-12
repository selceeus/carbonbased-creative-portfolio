import React, { useState, useEffect } from 'react';
import axios from 'axios';

//Imported Components 
import Loader from '../../components/utilities/loader.component';
import './home.styles.scss';

const {REACT_APP_API_URL} = process.env;

const authAxios = axios
    .create({
        baseUrl: REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
});

function Home() {

    const [data, setData] = useState([]);
    const [requestError, setRequestError] = useState([]);

    const renderHomeHero = apiData => {

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {

            const siteLead = () => { return{ __html: apiData.acf.site_lead.content } };

            return (
                <div className="hero">
                    <div dangerouslySetInnerHTML={siteLead()}></div>
                </div>
            );
        }
    }

    const renderHomeWhy = apiData => {

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {

            const whySection = () => { return{ __html: apiData.acf.why_section.content } };

            return (
                <div className="why">
                    <div dangerouslySetInnerHTML={whySection()}></div>
                </div>
            );
        }
    }

    const renderHomeWhat = apiData => {

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {

            const whatSection = () => { return{ __html: apiData.acf.what_section.content } };

            return (
                <div className="what">
                    <div dangerouslySetInnerHTML={whatSection()}></div>
                </div>
            );
        }
    }

    const renderHomeHow = apiData => {

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {

            const howSection = () => { return{ __html: apiData.acf.how_section.content } };

            return (
                <div className="how">
                    <div dangerouslySetInnerHTML={howSection()}></div>
                </div>
            );
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await authAxios
                    .get( `${REACT_APP_API_URL}wp-json/wp/v2/pages/62` )
                    .then( result => setData(result.data) );
            } catch(err) {
                setRequestError(err.message);
            }
        };
        fetchData();
    }, []);

    return(
        <section className="home">
            {console.log(data)}
            {renderHomeHero(data)}
            {renderHomeWhy(data)}
            {renderHomeWhat(data)}
            {renderHomeHow(data)}
        </section>
    );
}

export default Home;