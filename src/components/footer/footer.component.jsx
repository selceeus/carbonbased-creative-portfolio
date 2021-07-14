import React from 'react';
import { motion } from 'framer-motion';
import './footer.styles.scss';

const Footer = props => {
    return(
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1, y: 100  }}
            exit={{ opacity: 0 }}
        >
            <footer>
                <p>this is the footer</p>
            </footer>
        </motion.div>
    );
}

export default Footer;