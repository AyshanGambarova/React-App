import {Card} from "antd";
import {useState} from "react";


function Index({post}) {
    const [showMore, setShowMore] = useState(false)
    let description = post.body
    if (!showMore) {
        description = description.substring(0, 50) + '...'
    }

    return (
        <>
            <Card className="shadow-2xl mb-2" title={post.title}>
                <p>{description}</p>
                <div className='text-blue-500 cursor-pointer mt-3 flex justify-end items-center'
                     onClick={() => setShowMore((prevState) => !prevState)}>{showMore ? 'Less' : 'More'}</div>
            </Card>
        </>
    );
}

export default Index;
