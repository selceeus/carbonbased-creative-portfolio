import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from "react-router-dom";
import dompurify from 'dompurify';
import parse from 'html-react-parser';

//Imported Components
import Loader from '../../components/utilities/loader.component';
import './detailed-work.styles.scss';

function DetailedWork() {

    const { state } = useLocation();

    return(
        <section className='detailed-work'>
            {console.log(state)}
            <h1>Detailed Work</h1>
        </section>
    );

}

export default DetailedWork;