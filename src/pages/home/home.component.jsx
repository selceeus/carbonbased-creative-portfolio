import React from 'react';
import './home.styles.scss';

const Home = props => {
    return(
        <main role="main">
            <ul>
                {props.map(item => (
                    <li key={item.id}>
                        <h3 className="titles">{item.slug}</h3>
                        <p>{item.slug}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default Home;