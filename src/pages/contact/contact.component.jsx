import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dompurify from 'dompurify';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";

//Imported Components 
import Loader from '../../components/utilities/loader.component';
import Map from '../../components/map/map.component';
import './contact.styles.scss';

const {REACT_APP_API_URL} = process.env;

const authAxios = axios
    .create({
        baseUrl: REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
});

function Contact() {

    const [data, setData] = useState([]);
    const [requestError, setRequestError] = useState([]);
    const sanitize = dompurify.sanitize;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };
    
    const intialValues = {
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    };

    const renderContactHero = apiData => {

        const siteLead = () => { return{ __html: sanitize(apiData.title.rendered) } };

        return (
            <div className="hero">
            {apiData.title.rendered && <div dangerouslySetInnerHTML={siteLead()}></div>}
            </div>
        );
    }

    const renderContactForm = () => {

        return (
            <div className="contact-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        defaultValue={intialValues.firstName}
                        placeholder="First Name"
                        {...register("firstName", { required: true, maxLength: 20, validate: (value) => value.length > 3 })}
                    />
                    {errors.firstName && <p>Your first name is less than 3 characters</p>}

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        defaultValue={intialValues.lastName}
                        placeholder="Last Name"
                        {...register("lastName", { required: true, maxLength: 20, validate: (value) => value.length > 3 })}
                    />
                    {errors.lastName && <p>Your last name is less than 3 characters</p>}

                    <label htmlFor="email">Email</label>
                    <input
                        defaultValue={intialValues.email}
                        placeholder="Email"
                        type="email"
                        {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                    />
                    <label htmlFor="message">Message</label>
                    <textarea 
                        defaultValue={intialValues.age}
                        placeholder="Message"
                        {...register("message")}
                    />
                    <input type="submit" />
                </form>
            </div>
        );
    }

    const renderContactInformation = apiData => {

        const siteLead = () => { return{ __html: sanitize(apiData.acf.site_lead.content) } };

        return (
            <div className="hero">
            {apiData.acf.site_lead.content && <div dangerouslySetInnerHTML={siteLead()}></div>}
            </div>
        );
    }

    const renderContactMap = apiData => {

        const siteLead = () => { return{ __html: sanitize(apiData.acf.site_lead.content) } };

        return (
            <div className="hero">
            {apiData.acf.site_lead.content && <div dangerouslySetInnerHTML={siteLead()}></div>}
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
                    {renderContactHero(apiData)}
                    {renderContactForm()}
                    <Map />
                </React.Fragment>
            )
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await authAxios
                    .get( `${REACT_APP_API_URL}wp-json/wp/v2/pages/14` )
                    .then( result => setData(result.data) );

            } catch(err) {
                setRequestError(err.message);
            }
            
        };
        
        fetchData();
    }, []);

    return(
        <section className="contact">
            {console.log(data)}
            {renderPage(data)}
        </section>
    );
}

export default Contact;