import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dompurify from 'dompurify';
import parse from 'html-react-parser';
import InstagramFeed  from 'react-ig-feed';
import { motion } from 'framer-motion';

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

    const motionVars = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -20 },
    }

    const renderAboutHero = props => {

        //Hero Section
        const sectionTitle = () => { return{ __html: sanitize(props.title.rendered) } };
        const sectionLead = () => { return{ __html: sanitize(props.acf.section_lead.content) } };

        return (
            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ ease: "easeOut", duration: 0.3 }}
                variants={motionVars}
                className="hero container-fluid"
            >
                <div className="row">
                    <div class="col-12">
                        {props.title.rendered && <h1 dangerouslySetInnerHTML={sectionTitle()} className="display-1"></h1>}
                        {props.acf.section_lead.content && <div dangerouslySetInnerHTML={sectionLead()}></div>}
                    </div>
                </div>
            </motion.div>
        );
    }

    const renderAboutApproach = props => {

        //Approach Section
        const approachLead = () => { return{ __html: sanitize(props.acf.approach_section.headline) } };

        const appItems = props.acf.approach_section.approach_items.map((item, i) =>
            <motion.div 
                key={i} 
                className="col-8 offset-sm-2 approach-item"
                initial={{
                    opacity: 0,
                    translateY: -10,
                }}
                animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                transition={{ duration: 0.25, delay: i * 0.25 }}
            >
                {parse(item.content)}
            </motion.div>
        );

        return(
            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ ease: "easeOut", duration: 0.3 }}
                variants={motionVars}
                className="approach container-fluid"
            >
                <div class="row">
                    <div className="col-12">
                        {props.acf.approach_section.headline && <div dangerouslySetInnerHTML={approachLead()} className="approach-headline"></div>}
                    </div>
                    {appItems}
                </div>
            </motion.div>
        )
    }

    const renderAboutExperience = props => {

        //Experience Section
        const expLead = () => { return{ __html: sanitize(props.acf.experience_section.headline) } };

        const expItems = props.acf.experience_section.experience_items.map((item, i) =>
            <motion.div 
                key={i} 
                className="col-3 experience-item"
                initial={{
                    opacity: 0,
                    translateY: -10,
                }}
                animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                transition={{ duration: 0.25, delay: i * 0.25 }}
            >
                {parse(item.content)}
            </motion.div>
        );

        return(
            <motion.div 
                initial="hidden"
                animate="visible"
                transition={{ ease: "easeOut", duration: 0.3 }}
                variants={motionVars}
                className="experience container-fluid"
            >
                <div className="row">
                    <div className="col-12">
                        {props.acf.experience_section.headline && <div dangerouslySetInnerHTML={expLead()} className="experience-headline"></div>}
                    </div>
                    {expItems}
                </div>
            </motion.div>
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
