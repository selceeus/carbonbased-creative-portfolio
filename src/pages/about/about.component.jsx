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

    const renderAbout = apiData => {

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {

            const sectionLead = () => { return{ __html: apiData.acf.section_lead.content } };

            return (

                <div>
                    <div dangerouslySetInnerHTML={sectionLead()}></div>
                </div>
            );
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
            {renderAbout(data)}
        </section>
    );
}

export default About;