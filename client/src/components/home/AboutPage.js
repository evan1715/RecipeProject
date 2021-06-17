import React from 'react';

const AboutPage = () => (
    <div className="about-container">
        <h1 className="center title">About</h1>
            <p className="center">
                The website created by Evan McHugh. I designed this project to be a full-stack app using the MERN (MongoDB, Express, React, NodeJS) stack. 
                For more information, check out the repository on GitHub!
            </p>
            <a className="link-blue" href="https://github.com/evan1715/RecipeProject" target="_blank">View the repository</a>
    </div>
);

export { AboutPage as default }