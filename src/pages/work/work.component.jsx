import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dompurify from 'dompurify';
import parse from 'html-react-parser';

//Imported Components
import Loader from '../../components/utilities/loader.component';
import './work.styles.scss';

const {REACT_APP_API_URL} = process.env;

const authAxios = axios
    .create({
        baseUrl: REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
});

function Work() {

    const [data, setData] = useState({page: null, post: null});
    const [requestError, setRequestError] = useState([]);
    const sanitize = dompurify.sanitize;

    const renderWorkHero = apiData => {

        const sectionTitle = () => { return{ __html: apiData.title.rendered } };

        return (
            <div className="hero">
               <h1 dangerouslySetInnerHTML={sectionTitle()}></h1>
            </div>
        );
    }

    const renderPage = apiData => {

        return(
            <React.Fragment>
                {renderWorkHero(apiData)}
            </React.Fragment>
        )
    }

    useEffect(() => {
        const fetchPageData = async () => {

            const [pageResult, postResult] = await Promise.all([
                authAxios.get(`${REACT_APP_API_URL}wp-json/wp/v2/pages/10`),
                authAxios.get(`${REACT_APP_API_URL}wp-json/wp/v2/project`)
            ]);

            setData({
                page: pageResult.data, 
                post: postResult.data
            });

        };
        fetchPageData();
    }, []);

    const [pageData, postData] = [data.page, data.post];

    return(
        <section className="work">
            {console.log(postData)}
            {console.log(pageData)}
        </section>
    );
}

export default Work;