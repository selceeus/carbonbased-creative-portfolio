import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import dompurify from 'dompurify';
import parse from 'html-react-parser';

//Imported Components
import Loader from '../../components/utilities/loader.component';
import './journal.styles.scss';

const {REACT_APP_API_URL} = process.env;

const authAxios = axios
    .create({
        baseUrl: REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
});

const Journal = props => {

    const [data, setData] = useState({ page: [], post: [] });
    const [requestError, setRequestError] = useState([]);
    const sanitize = dompurify.sanitize;

    const renderWorkHero = apiData => {

        const sectionTitle = () => { return{ __html: sanitize(apiData.title.rendered) } };

        return (
            <div className="hero">
                <h1 dangerouslySetInnerHTML={sectionTitle()}></h1>
            </div>
        );
    }

    const renderWorkProjects = apiData => {

        let workItems = apiData.map((item, index) =>
            <li key={index}>
            {item.acf.projects_section !== null &&
                <img src={parse(item.acf.projects_section.project_hero_image)} alt="" loading="lazy"></img>
            }
                <h3>{parse(item.title.rendered)}</h3>
                {parse(item.excerpt.rendered)}
                <Link to={{
                    pathname: `/work/${item.slug}`,
                    projectParams: { 
                        id: item.id,
                        path: item.slug
                    }
                }}>
                    See Project Details
                </Link>
            </li>
        );

        return (
            <div className="work-projects">
                <ul>{workItems}</ul>
            </div>
        );
    }

    const renderPage = (apiData, apiPostData) => {

        if(!Object.keys(apiData).length > 0) {
            return <Loader />;
        }
        else {
            return(
                <React.Fragment>
                    {renderWorkHero(apiData)}
                    {renderWorkProjects(apiPostData)}
                </React.Fragment>
            )
        }
    }

    useEffect(() => {
        const fetchPageData = async () => {
            const [pageResult, postResult] = await Promise.all([
                authAxios.get(`${REACT_APP_API_URL}wp-json/wp/v2/pages/10`),
                authAxios.get(`${REACT_APP_API_URL}wp-json/wp/v2/project`)
            ])
            .catch(function(err) {
                console.log(setRequestError(err));
            });

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
            {renderPage(pageData, postData)}
        </section>
    );
}

export default Journal;