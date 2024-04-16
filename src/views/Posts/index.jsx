import React, {useEffect, useState} from "react";
// APIs
import {apiPosts} from "../../apis";
// Assets
import {Button, Col, Row} from "antd";
// Components
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";

function Index() {
    //#region States

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [previousResponseEmpty, setPreviousResponseEmpty] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    //#endregion

    //#region Functions

    const fetchData = async () => {
        if (previousResponseEmpty) {
            return
        }
        try {
            setLoading(true);
            const data = await apiPosts({_page: page});
            if (data.length === 0) {
                setAllDataLoaded(true);
                setPreviousResponseEmpty(true)
                setLoading(false);
            } else {
                setPosts(prevState => [...prevState, ...data]);
                setLoading(false); // Set loading to false only if data is available
                setPreviousResponseEmpty(false)
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

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Show button when page is scrolled up to certain amount
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to top of page when button is clicked
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

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
            <div className="flex justify-end items-center mb-4">
                <Button onClick={showModal}>Create Post</Button>
            </div>
            <CreatePost isModalVisible={isModalVisible}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
            />
            <Row gutter={24}>
                {posts.map(post => (
                    <Col xs={12} md={6} key={post.id} className="px-3">
                        <Post post={post}/>
                    </Col>
                ))}
            </Row>
            <div className="flex justify-center items-center">
                {loading && !previousResponseEmpty && <div>Loading...</div>}
                {allDataLoaded && <div>You've loaded everything!</div>}

            </div>
            <div className="flex justify-center items-center">
                {isVisible && allDataLoaded &&
                    (
                        <button onClick={scrollToTop}>
                            Go to top
                        </button>
                    )}
            </div>
        </div>
    );
}

export default Index;
