import React from 'react';
import {Card} from 'antd';

const About = () => {
    return (
        <div id="about" className="my-8">
            <Card title="About Us" bordered={false}>
                <p className="text-gray-600">
                    We are a team of passionate individuals dedicated to providing the best services. Our goal is to
                    make your experience with us as smooth as possible.
                </p>
            </Card>
        </div>
    );
};

export default About;
