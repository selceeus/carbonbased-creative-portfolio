import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dompurify from 'dompurify';

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
    const sanitize = dompurify.sanitize;

    const renderHomeHero = apiData => {

        const siteLead = () => { return{ __html: sanitize(apiData.acf.site_lead.content) } };

        return (
            <div className="hero">
                <div dangerouslySetInnerHTML={siteLead()}></div>
            </div>
        );
    }

    const renderHomeWhy = apiData => {

        const whySection = () => { return{ __html: sanitize(apiData.acf.why_section.content) } };

        return (
            <div className="why">
                <div dangerouslySetInnerHTML={whySection()}></div>
            </div>
        );
    }

    const renderHomeWhat = apiData => {

        const whatSection = () => { return{ __html: sanitize(apiData.acf.what_section.content) } };

        return (
            <div className="what">
                <div dangerouslySetInnerHTML={whatSection()}></div>
            </div>
        );
    }

    const renderHomeHow = apiData => {

        const howSection = () => { return{ __html: sanitize(apiData.acf.how_section.content) } };

        return (
            <div className="how">
                <div dangerouslySetInnerHTML={howSection()}></div>
            </div>
        );
    }

    const renderPage = apiData => {

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {
            return(
                <React.Fragment>
                    {renderHomeHero(data)}
                    {renderHomeWhy(data)}
                    {renderHomeWhat(data)}
                    {renderHomeHow(data)}
                </React.Fragment>
            )
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
            {renderPage(data)}
        </section>
    );
}

export default Home;