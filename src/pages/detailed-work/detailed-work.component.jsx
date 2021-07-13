import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from "react-router-dom";
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

    const { state } = useLocation();
    const [data, setData] = useState([]);
    const [requestError, setRequestError] = useState([]);
    const sanitize = dompurify.sanitize;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await authAxios
                    .get( `${REACT_APP_API_URL}wp-json/wp/v2/project/${state.id}` )
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
            <h1>Detailed Work</h1>
        </section>
    );

}

export default DetailedWork;