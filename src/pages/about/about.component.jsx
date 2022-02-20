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

    const renderAboutHero = props => {

        //Hero Section
        const sectionTitle = () => { return{ __html: sanitize(props.title.rendered) } };
        const sectionLead = () => { return{ __html: sanitize(props.acf.section_lead.content) } };

        return (
            <div className="hero">
            {props.title.rendered && <h1 dangerouslySetInnerHTML={sectionTitle()}></h1>}
            {props.acf.section_lead.content && <div dangerouslySetInnerHTML={sectionLead()}></div>}
            </div>
        );
    }

    const renderAboutApproach = props => {

        //Approach Section
        const approachLead = () => { return{ __html: sanitize(props.acf.approach_section.headline) } };
        const approachDiscover = () => { return{ __html: sanitize(props.acf.approach_section.approach_items[0].content) } };
        const approachCreate = () => { return{ __html: sanitize(props.acf.approach_section.approach_items[1].content) } };
        const approachSupport = () => { return{ __html: sanitize(props.acf.approach_section.approach_items[2].content) } };

        return(
            <div className="approach">
                {props.acf.approach_section.headline && <div dangerouslySetInnerHTML={approachLead()}></div>}
                {props.acf.approach_section.approach_items[0] && <div dangerouslySetInnerHTML={approachDiscover()}></div>}
                {props.acf.approach_section.approach_items[1] && <div dangerouslySetInnerHTML={approachCreate()}></div>}
                {props.acf.approach_section.approach_items[2] && <div dangerouslySetInnerHTML={approachSupport()}></div>}
            </div>
        )
    }

    const renderAboutExperience = props => {

        //Experience Section
        const expLead = () => { return{ __html: sanitize(props.acf.experience_section.headline) } };
        const expCreative = () => { return{ __html: sanitize(props.acf.experience_section.experience_items[0].content) } };
        const expProduct = () => { return{ __html: sanitize(props.acf.experience_section.experience_items[1].content) } };
        const expDev = () => { return{ __html: sanitize(props.acf.experience_section.experience_items[2].content) } };
        const expMarketing = () => { return{ __html: sanitize(props.acf.experience_section.experience_items[3].content) } };

        return(
            <div className="experience">
                {props.acf.experience_section.headline && <div dangerouslySetInnerHTML={expLead()}></div>}
                {props.acf.experience_section.experience_items[0] && <div dangerouslySetInnerHTML={expCreative()}></div>}
                {props.acf.experience_section.experience_items[1] && <div dangerouslySetInnerHTML={expProduct()}></div>}
                {props.acf.experience_section.experience_items[2] && <div dangerouslySetInnerHTML={expDev()}></div>}
                {props.acf.experience_section.experience_items[3] && <div dangerouslySetInnerHTML={expMarketing()}></div>}
            </div>
        )
    }

    const renderPage = props => {

        if(!Object.keys(props).length > 0) {
            return <Loader />;
        }
        else {
            return(
                <React.Fragment>
                    {renderAboutHero(props)}
                    {renderAboutApproach(props)}
                    {renderAboutExperience(props)}
                    {/* <InstagramFeed token={REACT_APP_INSTA_TOKEN}  counter="3"/> */}
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
