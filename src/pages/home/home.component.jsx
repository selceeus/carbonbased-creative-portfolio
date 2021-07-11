import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

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

            const title = () => { return{ __html: apiData.title.rendered } };
            const siteLead = () => { return{ __html: apiData.acf.site_lead.content } };

            return (

                <div>
                    <h1 dangerouslySetInnerHTML={title()}></h1>
                    <div dangerouslySetInnerHTML={siteLead()}></div>
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
            {renderPage(data)}
        </section>
    );
}

export default Home;