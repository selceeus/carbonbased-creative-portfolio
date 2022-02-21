import React from 'react';
import dompurify from 'dompurify';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';

const AboutExperience = props => {

    const sanitize = dompurify.sanitize;

    const motionVars = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -20 },
    }

    //Experience Section
    const expLead = () => { return{ __html: sanitize(props.acf.experience_section.headline) } };

    const expItems = props.acf.experience_section.experience_items.map((item, i) =>
        <motion.div 
            key={i} 
            className="col-3 experience-item"
            initial={{
                opacity: 0,
                translateY: -10,
            }}
            animate={{ opacity: 1, translateX: 0, translateY: 0 }}
            transition={{ duration: 0.25, delay: i * 0.25 }}
        >
            {parse(item.content)}
        </motion.div>
    );

    return(
        <motion.div 
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeOut", duration: 0.3 }}
            variants={motionVars}
            className="experience container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    {props.acf.experience_section.headline && <div dangerouslySetInnerHTML={expLead()} className="experience-headline"></div>}
                </div>
                {expItems}
            </div>
        </motion.div>
    )
}

export default AboutExperience;