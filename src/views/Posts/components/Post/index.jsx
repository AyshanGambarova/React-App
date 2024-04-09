import {Button, Card} from "antd";
import {useState} from "react";
import {Link} from "react-router-dom";


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
                <Link to={`/posts/${post.id}`}><Button type="link">Details -></Button></Link>
            </Card>
        </>
    );
}

export default Index;
