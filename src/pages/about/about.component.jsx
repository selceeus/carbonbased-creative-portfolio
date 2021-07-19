import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dompurify from 'dompurify';
import InstagramFeed  from 'react-ig-feed'

//Imported Components 
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
    const sanitize = dompurify.sanitize;

    const renderAboutHero = apiData => {

        //Hero Section
        const sectionTitle = () => { return{ __html: sanitize(apiData.title.rendered) } };
        const sectionLead = () => { return{ __html: sanitize(apiData.acf.section_lead.content) } };

        return (
            <div className="hero">
            {apiData.title.rendered && <h1 dangerouslySetInnerHTML={sectionTitle()}></h1>}
            {apiData.acf.section_lead.content && <div dangerouslySetInnerHTML={sectionLead()}></div>}
            </div>
        );
    }

    const renderAboutApproach = apiData => {

        //Approach Section
        const approachLead = () => { return{ __html: sanitize(apiData.acf.approach_section.headline) } };
        const approachDiscover = () => { return{ __html: sanitize(apiData.acf.approach_section.approach_items[0].content) } };
        const approachCreate = () => { return{ __html: sanitize(apiData.acf.approach_section.approach_items[1].content) } };
        const approachSupport = () => { return{ __html: sanitize(apiData.acf.approach_section.approach_items[2].content) } };

        return(
            <div className="approach">
                {apiData.acf.approach_section.headline && <div dangerouslySetInnerHTML={approachLead()}></div>}
                {apiData.acf.approach_section.approach_items[0].content && <div dangerouslySetInnerHTML={approachDiscover()}></div>}
                {apiData.acf.approach_section.approach_items[1].content && <div dangerouslySetInnerHTML={approachCreate()}></div>}
                {apiData.acf.approach_section.approach_items[2].content && <div dangerouslySetInnerHTML={approachSupport()}></div>}
            </div>
        )
    }

    const renderAboutExperience = apiData => {

        //Experience Section
        const expLead = () => { return{ __html: sanitize(apiData.acf.experience_section.headline) } };
        const expCreative = () => { return{ __html: sanitize(apiData.acf.experience_section.experience_items[0].content) } };
        const expProduct = () => { return{ __html: sanitize(apiData.acf.experience_section.experience_items[1].content) } };
        const expDev = () => { return{ __html: sanitize(apiData.acf.experience_section.experience_items[2].content) } };
        const expMarketing = () => { return{ __html: sanitize(apiData.acf.experience_section.experience_items[3].content) } };

        return(
            <div className="experience">
                {apiData.acf.experience_section.headline && <div dangerouslySetInnerHTML={expLead()}></div>}
                {apiData.acf.experience_section.experience_items[0].content && <div dangerouslySetInnerHTML={expCreative()}></div>}
                {apiData.acf.experience_section.experience_items[1].content && <div dangerouslySetInnerHTML={expProduct()}></div>}
                {apiData.acf.experience_section.experience_items[2].content && <div dangerouslySetInnerHTML={expDev()}></div>}
                {apiData.acf.experience_section.experience_items[3].content && <div dangerouslySetInnerHTML={expMarketing()}></div>}
            </div>
        )
    }

    const renderPage = apiData => {

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {
            return(
                <React.Fragment>
                    {renderAboutHero(apiData)}
                    {renderAboutApproach(apiData)}
                    {renderAboutExperience(apiData)}
                    <InstagramFeed token={REACT_APP_INSTA_TOKEN}  counter="3"/>
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
            {console.log(data)}
            {renderPage(data)}
        </section>
    );
}

export default About;
