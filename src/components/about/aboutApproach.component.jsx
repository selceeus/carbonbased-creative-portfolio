import React from 'react';
import dompurify from 'dompurify';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';

const AboutApproach = props => {

    const sanitize = dompurify.sanitize;

    const motionVars = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -20 },
    }

    //Approach Section
    const approachLead = () => { return{ __html: sanitize(props.acf.approach_section.headline) } };

    const appItems = props.acf.approach_section.approach_items.map((item, i) =>
        <motion.div 
            key={i} 
            className="col-8 offset-sm-2 approach-item"
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
            className="approach container-fluid"
        >
            <div class="row">
                <div className="col-12">
                    {props.acf.approach_section.headline && <div dangerouslySetInnerHTML={approachLead()} className="approach-headline"></div>}
                </div>
                {appItems}
            </div>
        </motion.div>
    )
}
export default AboutApproach;