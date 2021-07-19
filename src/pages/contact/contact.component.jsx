import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dompurify from 'dompurify';
import { motion } from 'framer-motion';

//Imported Components 
import Loader from '../../components/utilities/loader.component';
import './contact.styles.scss';

const {REACT_APP_API_URL} = process.env;

const authAxios = axios
    .create({
        baseUrl: REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
});

function Contact() {

    const [data, setData] = useState([]);
    const [requestError, setRequestError] = useState([]);
    const sanitize = dompurify.sanitize;

    const renderContactHero = apiData => {

        const siteLead = () => { return{ __html: sanitize(apiData.acf.site_lead.content) } };

        return (
            <div className="hero">
            {apiData.acf.site_lead.content && <div dangerouslySetInnerHTML={siteLead()}></div>}
            </div>
        );
    }

    const renderContactForm = apiData => {

        const siteLead = () => { return{ __html: sanitize(apiData.acf.site_lead.content) } };

        return (
            <div className="hero">
            {apiData.acf.site_lead.content && <div dangerouslySetInnerHTML={siteLead()}></div>}
            </div>
        );
    }

    const renderContactInformation = apiData => {

        const siteLead = () => { return{ __html: sanitize(apiData.acf.site_lead.content) } };

        return (
            <div className="hero">
            {apiData.acf.site_lead.content && <div dangerouslySetInnerHTML={siteLead()}></div>}
            </div>
        );
    }

    const renderContactMap = apiData => {

        const siteLead = () => { return{ __html: sanitize(apiData.acf.site_lead.content) } };

        return (
            <div className="hero">
            {apiData.acf.site_lead.content && <div dangerouslySetInnerHTML={siteLead()}></div>}
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
                    {renderContactHero(apiData)}
                </React.Fragment>
            )
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await authAxios
                    .get( `${REACT_APP_API_URL}wp-json/wp/v2/pages/14` )
                    .then( result => setData(result.data) );

            } catch(err) {
                setRequestError(err.message);
            }
            
        };
        
        fetchData();
    }, []);

    return(
        <section className="contact">
            <h1>Contact</h1>
            {console.log(data)}
        </section>
    );
}

export default Contact;