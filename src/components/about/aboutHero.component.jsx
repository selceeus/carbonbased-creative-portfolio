import React from 'react';
import dompurify from 'dompurify';
import { motion } from 'framer-motion';

const AboutHero = props => {

    const sanitize = dompurify.sanitize;

    const motionVars = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -20 },
    }

    //Hero Section
    const sectionTitle = () => { return{ __html: sanitize(props.title.rendered) } };
    const sectionLead = () => { return{ __html: sanitize(props.acf.section_lead.content) } };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeOut", duration: 0.3 }}
            variants={motionVars}
            className="hero container-fluid"
        >
            <div className="row">
                <div class="col-12">
                    {props.title.rendered && <h1 dangerouslySetInnerHTML={sectionTitle()} className="display-1"></h1>}
                    {props.acf.section_lead.content && <div dangerouslySetInnerHTML={sectionLead()}></div>}
                </div>
            </div>
        </motion.div>
    );
}
    
export default AboutHero;