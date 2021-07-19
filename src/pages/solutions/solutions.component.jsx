import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dompurify from 'dompurify';
import parse from 'html-react-parser';

//Imported Components
import Loader from '../../components/utilities/loader.component';
import './solutions.styles.scss';

const {REACT_APP_API_URL} = process.env;

const authAxios = axios
    .create({
        baseUrl: REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
});

function Solutions() {

    const [data, setData] = useState([]);
    const [requestError, setRequestError] = useState([]);
    const sanitize = dompurify.sanitize;

    const renderSolutionsHero = apiData => {

        const sectionTitle = () => { return{ __html: sanitize(apiData.title.rendered) } };
        const sectionLead = () => { return{ __html: sanitize(apiData.acf.section_lead.content) } };

        return (
            <div className="hero">
                {apiData.title.rendered && <h1 dangerouslySetInnerHTML={sectionTitle()}></h1>}
                {apiData.acf.section_lead.content && <div dangerouslySetInnerHTML={sectionLead()}></div>}
            </div>
        );
    }

    const renderSolutionsServices = apiData => {

        const servicesTitle = () => { return{ __html: sanitize(apiData.acf.services_section.headline) } };
        const servicesDev = () => { return{ __html: sanitize(apiData.acf.services_section.services_item[0].content) } };
        const servicesCreative = () => { return{ __html: sanitize(apiData.acf.services_section.services_item[1].content) } };
        const servicesDigi = () => { return{ __html: sanitize(apiData.acf.services_section.services_item[2].content) } };

        return (
            <div className="services">
                {apiData.acf.services_section.headline && <h1 dangerouslySetInnerHTML={servicesTitle()}></h1>}
                {apiData.acf.services_section.services_item[0].content && <div dangerouslySetInnerHTML={servicesDev()}></div>}
                {apiData.acf.services_section.services_item[1].content && <div dangerouslySetInnerHTML={servicesCreative()}></div>}
                {apiData.acf.services_section.services_item[2].content && <div dangerouslySetInnerHTML={servicesDigi()}></div>}
            </div>
        );
    }

    const renderSolutionsProducts = apiData => {

        const productsTitle = () => { return{ __html: sanitize(apiData.acf.product_section.headline) } };
        const productsItems = apiData.acf.product_section.product_items.map( (item, index) =>
            <li key={index}>
                <img src={parse(item.icon)} alt="" />
                {parse(item.content)}
            </li>
        );

        return (
            <div className="products">
                {apiData.acf.product_section.headline && <h1 dangerouslySetInnerHTML={productsTitle()}></h1>}
                {apiData.acf.product_section.product_items && <ul>{productsItems}</ul>}
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
                    {renderSolutionsHero(apiData)}
                    {renderSolutionsServices(apiData)}
                    {renderSolutionsProducts(apiData)}
                </React.Fragment>
            )
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await authAxios
                    .get( `${REACT_APP_API_URL}wp-json/wp/v2/pages/64` )
                    .then( result => setData(result.data) );

            } catch(err) {
                setRequestError(err.message);
            }
            
        };
        fetchData();
    }, []);

    return(
        <section className="solutions">
            {console.log(data)}
            {renderPage(data)}
        </section>
    );
}

export default Solutions;