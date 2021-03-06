import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import dompurify from 'dompurify';
import parse from 'html-react-parser';

//Imported Components
import Loader from '../../components/utilities/loader.component';
import './detailed-journal.styles.scss';

const {REACT_APP_API_URL} = process.env;

const authAxios = axios
    .create({
        baseUrl: REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
});

function DetailedJournal() {

    const directAccessParams = useParams();
    const [data, setData] = useState([]);
    const [requestError, setRequestError] = useState([]);
    const sanitize = dompurify.sanitize;

    const renderDetailedJournalHero = props => {

        const sectionTitle = () => { return{ __html: sanitize(props[0].title.rendered) } };

        return (
            <div className="hero">
                {props[0].title.rendered && <h2 dangerouslySetInnerHTML={sectionTitle()}></h2>}
            </div>
        );
    }

    const renderDetailedJournalContent = props => {

        const sectionContent = () => { return{ __html: sanitize(props[0].content.rendered) } };

        return (
            <div className="hero">
                {props[0].content.rendered && <div dangerouslySetInnerHTML={sectionContent()}></div>}
            </div>
        );
    }

    const renderPage = props => {

        if(!Object.keys(props).length > 0) {
            return <Loader />;
        }
        else {
            return(
                <React.Fragment>
                    <h1>Journal</h1>
                    {renderDetailedJournalHero(props)}
                    {renderDetailedJournalContent(props)}
                </React.Fragment>
            )
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await authAxios
                    .get( `${REACT_APP_API_URL}wp-json/wp/v2/posts/?slug=${directAccessParams.slug}` )
                    .then( result => setData(result.data) );
            } catch(err) {
                setRequestError(err.message);
            }
        };
        fetchData();
    }, []);
    
    return(
        <section className='detailed-journal'>
           {console.log(data)}
           {renderPage(data)}
        </section>
    );
 
}

export default DetailedJournal;