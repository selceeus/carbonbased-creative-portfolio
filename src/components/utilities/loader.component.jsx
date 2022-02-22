import React from 'react';
import { Spinner } from 'reactstrap';
import { motion } from "framer-motion";
import './loader.styles.scss';

const motionVars = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -5 },
    }

const Loader = () => {
    return (
        <motion.div className='loader'
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeOut", duration: 2 }}
            variants={motionVars}
        >
            <Spinner style={{ width: '5rem', height: '5rem' }} />
        </motion.div>
    );
}

export default Loader;