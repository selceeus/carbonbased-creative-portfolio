import React, { useState, useEffect } from 'react';
import { useFetch } from '../../components/utilities/api-cache.component';
import axios from 'axios';
import dompurify from 'dompurify';
import { motion } from 'framer-motion';

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

const Home = props => {

    const [data, setData] = useState([]);
    const [requestError, setRequestError] = useState([]);
    const sanitize = dompurify.sanitize;

    const renderHomeHero = props => {

        const siteLead = () => { return{ __html: sanitize(props.acf.site_lead.content) } };

        return (
            <div className="hero">
            {props.acf.site_lead.content && <div dangerouslySetInnerHTML={siteLead()}></div>}
            </div>
        );
    }

    const renderHomeWhy = props => {

        const whySection = () => { return{ __html: sanitize(props.acf.why_section.content) } };

        return (
            <div className="why">
            {props.acf.why_section.content && <div dangerouslySetInnerHTML={whySection()}></div>}
            </div>
        );
    }

    const renderHomeWhat = props => {

        const whatSection = () => { return{ __html: sanitize(props.acf.what_section.content) } };

        return (
            <div className="what">
            {props.acf.what_section.content && <div dangerouslySetInnerHTML={whatSection()}></div>}
            </div>
        );
    }

    const renderHomeHow = props => {

        const howSection = () => { return{ __html: sanitize(props.acf.how_section.content) } };

        return (
            <div className="how">
            {props.acf.how_section.content && <div dangerouslySetInnerHTML={howSection()}></div>}
            </div>
        );
    }

    const renderPage = props => {

        if(!Object.keys(props).length > 0) {
            return <Loader />;
        }
        else {
            return(
                <React.Fragment>
                    {renderHomeHero(props)}
                    {renderHomeWhy(props)}
                    {renderHomeWhat(props)}
                    {renderHomeHow(props)}
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

    const test = data;

    return(
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <section className="home">
                {console.log(test)}
                {renderPage(test)}
            </section>
        </motion.div>
    );
}

export default Home;