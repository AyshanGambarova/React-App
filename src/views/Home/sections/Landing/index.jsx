import React from 'react';
import {Typography, Button, Image} from 'antd';

const {Title, Paragraph} = Typography;

const Landing = () => {
    return (
        <div id="landing"
             className="flex flex-col md:flex-row items-center justify-between h-screen bg-blue-500 text-white p-8">
            {/* Text Content */}
            <div className="md:w-1/2">
                <Title className="text-4xl"><span className="text-white">Welcome to Our Website</span></Title>
                <Paragraph className="mt-4 text-xl">
                    <span
                        className="text-white">We provide the best solutions for your business. Let's grow together.</span>
                </Paragraph>

            </div>

            {/* Image */}
            <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
                <Image
                    src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?fit=crop&w=800&h=600"
                    alt="Landing Page Image"
                    className="rounded-lg shadow-lg"
                    width={400}
                    preview={false}  // Disables the Ant Design preview modal on click
                />
            </div>
        </div>
    );
};

export default Landing;
