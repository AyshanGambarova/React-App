import {useEffect, useState} from "react";
import {Button} from "antd";

export default function UseEffectHook() {

    const [count, setCount] = useState(0)
    const [postId, setPostId] = useState(1)
    const [postData, setPostData] = useState(false)

    // useEffect(() => {
    //     console.log("Component her update olduqda bu useEffect render olacaq")
    // })

    useEffect(() => {
        console.log("Component ilk yuklenende render olacaq []")
        return () => {
            console.log("Component destroyed")
        }
    }, []);

    useEffect(() => {
            console.log("Count update oldu", count)
        }, [count]
    )
    useEffect(() => {
            //Pagination burada cagirila biler
            console.log("PostId update oldu", postId)
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                .then(res => res.json()
                    .then(data => setPostData(data)))
        }, [postId]
    )
    return (
        <>
            <div className="mt-5">Use Effect</div>
            <Button onClick={() => setCount(count => count + 1)} type="primary">+</Button>
            <Button onClick={() => setCount((count => count - 1))} type="primary">-</Button>
            <div>{count}</div>

            <Button onClick={() => setPostId(postId => postId + 1)} type="primary">Next post</Button>
            {postData && (
                <div>{JSON.stringify(postData)}</div>
            )}
        </>
    )

}

