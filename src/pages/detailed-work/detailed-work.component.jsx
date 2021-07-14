import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import dompurify from 'dompurify';
import parse from 'html-react-parser';

//Imported Components
import Loader from '../../components/utilities/loader.component';
import './detailed-work.styles.scss';

const {REACT_APP_API_URL} = process.env;

const authAxios = axios
    .create({
        baseUrl: REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
});

function DetailedWork() {

    //const {projectParams} = useLocation();
    const directAccessParams = useParams();
    const [data, setData] = useState([]);
    const [requestError, setRequestError] = useState([]);
    const sanitize = dompurify.sanitize;

    const renderWorkProjectHero = apiData => {

        const sectionTitle = () => { return{ __html: sanitize(apiData[0].title.rendered) } };

        return (
            <div className="hero">
                <h2 dangerouslySetInnerHTML={sectionTitle()}></h2>
            </div>
        );
    }

    const renderWorkProjectContent = apiData => {

        const sectionContent = () => { return{ __html: sanitize(apiData[0].content.rendered) } };

        return (
            <div className="hero">
                <div dangerouslySetInnerHTML={sectionContent()}></div>
            </div>
        );
    }

    const renderPage = apiData => {

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {
            return(
                <React.Fragment>
                    <h1>Work</h1>
                    {renderWorkProjectHero(apiData)}
                    {renderWorkProjectContent(apiData)}
                </React.Fragment>
            )
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await authAxios
                    .get( `${REACT_APP_API_URL}wp-json/wp/v2/project/?slug=${directAccessParams.slug}` )
                    .then( result => setData(result.data) );
            } catch(err) {
                setRequestError(err.message);
            }
        };
        fetchData();
    }, []);

    return(
        <section className='detailed-work'>
            {console.log(data)}
            {renderPage(data)}
        </section>
    );

}

export default DetailedWork;