import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    const renderSolutionsHero = apiData => {

        const sectionTitle = () => { return{ __html: apiData.title.rendered } };
        const sectionLead = () => { return{ __html: apiData.acf.section_lead.content } };

        return (
            <div className="hero">
                <h1 dangerouslySetInnerHTML={sectionTitle()}></h1>
                <div dangerouslySetInnerHTML={sectionLead()}></div>
            </div>
        );
    }

    const renderSolutionsServices = apiData => {

        const servicesTitle = () => { return{ __html: apiData.acf.services_section.headline } };
        const servicesDev = () => { return{ __html: apiData.acf.services_section.services_item[0].content } };
        const servicesCreative = () => { return{ __html: apiData.acf.services_section.services_item[1].content } };
        const servicesDigi = () => { return{ __html: apiData.acf.services_section.services_item[2].content } };

        return (
            <div className="services">
                <h1 dangerouslySetInnerHTML={servicesTitle()}></h1>
                <div dangerouslySetInnerHTML={servicesDev()}></div>
                <div dangerouslySetInnerHTML={servicesCreative()}></div>
                <div dangerouslySetInnerHTML={servicesDigi()}></div>
            </div>
        );
    }

    const renderSolutionsProducts = apiData => {

        const productsTitle = () => { return{ __html: apiData.acf.product_section.headline } };
        const productsItems = apiData.acf.product_section.product_items.map( (item, index) =>
            <li key={index}>
                <h4>{item.title}</h4>
                <img src={item.icon} alt="" />
                <p>{item.content}</p>
            </li>
        );

        return (
            <div className="products">
                <h1 dangerouslySetInnerHTML={productsTitle()}></h1>
                <ul>{productsItems}</ul>
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
                    {renderSolutionsHero(data)}
                    {renderSolutionsServices(data)}
                    {renderSolutionsProducts(data)}
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