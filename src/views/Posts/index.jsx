import React, {useEffect, useState} from "react";
// APIs
import {apiPosts} from "../../apis";
// Assets
import {Col, Row} from "antd";
// Components
import Post from "./components/Post";

function Index() {
    //#region States

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [allDataLoaded, setAllDataLoaded] = useState(false);

    //#endregion

    //#region Functions

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await apiPosts({_page: page});
            if (data.length === 0) {
                setAllDataLoaded(true);
                setLoading(false);
            } else {
                setPosts(prevState => [...prevState, ...data]);
                setLoading(false); // Set loading to false only if data is available
            }
        } catch (e) {
            console.error("Error fetching data:", e);
            setLoading(false); // In case of error, set loading to false
        }
    };


    const handleScroll = () => {
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && !allDataLoaded) {
            setLoading(true);
            setPage(prevPage => prevPage + 1);
        }
    };

    //#endregion

    //#region Hooks

    useEffect(() => {
        fetchData();
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    //#endregion

    return (
        <div className="p-4">
            <Row gutter={24}>
                {posts.map(post => (
                    <Col xs={12} md={6} key={post.id} className="px-3">
                        <Post post={post}/>
                    </Col>
                ))}
            </Row>
            <div className="flex justify-center items-center">
                {loading && <div>Loading...</div>}
                {allDataLoaded && <div>You've loaded everything!</div>}
            </div>
        </div>
    );
}

export default Index;
