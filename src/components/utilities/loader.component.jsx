import React from 'react';
import { Spinner } from 'reactstrap';
import { motion } from "framer-motion";
import './loader.styles.scss';


const Loader = props => {
    return (
        <motion.div className='loader'
            initial={{ opacity: 0}}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Spinner style={{ width: '5rem', height: '5rem' }} />
        </motion.div>
    );
};

export default Loader;