import React, { useState, useEffect } from 'react';
import axios from 'axios';

//Imported Components 
import Loader from '../../components/utilities/loader.component';
import './about.styles.scss';

const {REACT_APP_API_URL} = process.env;

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

    const renderAboutHero = apiData => {

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {

            const sectionTitle = () => { return{ __html: apiData.title.rendered } };
            const sectionLead = () => { return{ __html: apiData.acf.section_lead.content } };

            return (
                <div className="hero">
                    <h1 dangerouslySetInnerHTML={sectionTitle()}></h1>
                    <div dangerouslySetInnerHTML={sectionLead()}></div>
                </div>
            );
        }
    }

    const renderAboutApproach = apiData => {

        //Approach Section
        const approachLead = () => { return{ __html: apiData.acf.approach_section.headline } };
        const approachDiscover = () => { return{ __html: apiData.acf.approach_section.approach_items[0].content } };
        const approachCreate = () => { return{ __html: apiData.acf.approach_section.approach_items[1].content } };
        const approachSupport = () => { return{ __html: apiData.acf.approach_section.approach_items[2].content } };

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {
            return(
                <div className="approach">
                    <div dangerouslySetInnerHTML={approachLead()}></div>
                    <div dangerouslySetInnerHTML={approachDiscover()}></div>
                    <div dangerouslySetInnerHTML={approachCreate()}></div>
                    <div dangerouslySetInnerHTML={approachSupport()}></div>
                </div>
            )
        }
    }

    const renderAboutExperience = apiData => {

        //Experience Section
        const expLead = () => { return{ __html: apiData.acf.experience_section.headline } };
        const expCreative = () => { return{ __html: apiData.acf.experience_section.experience_items[0].content } };
        const expProduct = () => { return{ __html: apiData.acf.experience_section.experience_items[1].content } };
        const expDev = () => { return{ __html: apiData.acf.experience_section.experience_items[2].content } };
        const expMarketing = () => { return{ __html: apiData.acf.experience_section.experience_items[3].content } };

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {
            return(
                <div className="experience">
                    <div dangerouslySetInnerHTML={expLead()}></div>
                    <div dangerouslySetInnerHTML={expCreative()}></div>
                    <div dangerouslySetInnerHTML={expProduct()}></div>
                    <div dangerouslySetInnerHTML={expDev()}></div>
                    <div dangerouslySetInnerHTML={expMarketing()}></div>
                </div>
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
            {renderAboutHero(data)}
            {renderAboutApproach(data)}
            {renderAboutExperience(data)}
        </section>
    );
}

export default About;