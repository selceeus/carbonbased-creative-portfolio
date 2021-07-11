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

    const renderPage = apiData => {

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {

            const siteLead = () => { return{ __html: apiData.acf.site_lead.content } };
            const whySection = () => { return{ __html: apiData.acf.why_section.content } };
            const whatSection = () => { return{ __html: apiData.acf.what_section.content } };
            const howSection = () => { return{ __html: apiData.acf.how_section.content } };

            return (

                <div>
                    <div dangerouslySetInnerHTML={siteLead()}></div>
                    <div dangerouslySetInnerHTML={whySection()}></div>
                    <div dangerouslySetInnerHTML={whatSection()}></div>
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
            {renderPage(data)}
        </section>
    );
}

export default Home;