import React from 'react';
import './about.styles.scss';

const About = props => {
    return(
        <main role="main">
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <h3 className="titles">{item.slug}</h3>
                        <p>{item.slug}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default About;