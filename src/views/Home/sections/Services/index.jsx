// Services.js
import React from 'react';
import {Card} from 'antd';

const Services = () => {
    return (
        <div id="services" className="my-8">
            <Card title="Our Services" bordered={false}>
                <Card.Grid className="w-full md:w-1/3 p-4 text-center">Web Development</Card.Grid>
                <Card.Grid className="w-full md:w-1/3 p-4 text-center">Mobile App Development</Card.Grid>
                <Card.Grid className="w-full md:w-1/3 p-4 text-center">UI/UX Design</Card.Grid>
            </Card>
        </div>
    );
};

export default Services;
