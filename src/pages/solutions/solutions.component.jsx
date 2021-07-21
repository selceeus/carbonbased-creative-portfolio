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

    const renderSolutionsHero = props => {

        const sectionTitle = () => { return{ __html: sanitize(props.title.rendered) } };
        const sectionLead = () => { return{ __html: sanitize(props.acf.section_lead.content) } };

        return (
            <div className="hero">
                {props.title.rendered && <h1 dangerouslySetInnerHTML={sectionTitle()}></h1>}
                {props.acf.section_lead.content && <div dangerouslySetInnerHTML={sectionLead()}></div>}
            </div>
        );
    }

    const renderSolutionsServices = props => {

        const servicesTitle = () => { return{ __html: sanitize(props.acf.services_section.headline) } };
        const servicesDev = () => { return{ __html: sanitize(props.acf.services_section.services_item[0].content) } };
        const servicesCreative = () => { return{ __html: sanitize(props.acf.services_section.services_item[1].content) } };
        const servicesDigi = () => { return{ __html: sanitize(props.acf.services_section.services_item[2].content) } };

        return (
            <div className="services">
                {props.acf.services_section.headline && <h1 dangerouslySetInnerHTML={servicesTitle()}></h1>}
                {props.acf.services_section.services_item[0].content && <div dangerouslySetInnerHTML={servicesDev()}></div>}
                {props.acf.services_section.services_item[1].content && <div dangerouslySetInnerHTML={servicesCreative()}></div>}
                {props.acf.services_section.services_item[2].content && <div dangerouslySetInnerHTML={servicesDigi()}></div>}
            </div>
        );
    }

    const renderSolutionsProducts = props => {

        const productsTitle = () => { return{ __html: sanitize(props.acf.product_section.headline) } };
        const productsItems = props.acf.product_section.product_items.map( (item, index) =>
            <li key={index}>
                <img src={parse(item.icon)} alt="" />
                {parse(item.content)}
            </li>
        );

        return (
            <div className="products">
                {props.acf.product_section.headline && <h1 dangerouslySetInnerHTML={productsTitle()}></h1>}
                {props.acf.product_section.product_items && <ul>{productsItems}</ul>}
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
                    {renderSolutionsHero(props)}
                    {renderSolutionsServices(props)}
                    {renderSolutionsProducts(props)}
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