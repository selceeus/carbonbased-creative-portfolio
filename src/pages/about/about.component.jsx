import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InstagramFeed  from 'react-ig-feed';

//Animation
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

const inviewVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -60}
};

function About() {

    const [data, setData] = useState([]);
    const [requestError, setRequestError] = useState([]);

    //In View Animations
    const controls = useAnimation();
    const [ref, inView] = useInView();

    //Hooks
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
        else {
            controls.start("hidden");
        }
    }, [controls, inView]);

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

    const renderPage = props => {

        if(!Object.keys(props).length > 0) {
            return <Loader />;
        }
        else {
            return(
                <React.Fragment>
                    {AboutHero(props)}
                    {AboutApproach(props)}
                    <motion.div
                        ref={ref}
                        animate={controls}
                        initial="hidden"
                        variants={inviewVariants}
                        transition={{ ease: "easeOut", duration: .5 }}
                    >
                    {AboutExperience(props)}
                    </motion.div>
                    <motion.div
                        ref={ref}
                        animate={controls}
                        initial="hidden"
                        variants={inviewVariants}
                        transition={{ ease: "easeOut", duration: .5 }}
                    >
                        {<InstagramFeed token={REACT_APP_INSTA_TOKEN}  counter="4"/>}
                    </motion.div>
                </React.Fragment>
            )
        }
    }

    return(
        <section className="about">
            {renderPage(data)}
        </section>
    );
}

export default About;
