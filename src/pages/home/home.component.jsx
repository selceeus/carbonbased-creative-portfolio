import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
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
    const [setRequestError] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await authAxios
                    .get( `${REACT_APP_API_URL}wp-json/wp/v2/pages/62` )
                    .then( result => setData({content: result.data}) );

            } catch(err) {
                setRequestError(err.message);
            }
        };
        
        fetchData();
    }, []);

    const renderPage = apiData => {

        if(!Object.keys(apiData).length > 0) {
            return "<Loader />";
        }
        else {
            return (
                <div>
                    <h1>{apiData.title.rendered}</h1>
                    <p>{parse(apiData.content.rendered)}</p>
                    <p>{parse(apiData.acf.site_lead.content)}</p>
                </div>
            );
        }

    }

    return(
        <section className="home">
            {renderPage(data.content)}
        </section>
    );
}

export default Home;