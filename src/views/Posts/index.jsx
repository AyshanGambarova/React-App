import {useEffect, useState} from "react";
import {Card, Col, Row, Typography} from "antd";
import {apiPosts} from "../../apis";

const {Paragraph, Text} = Typography;

function Index() {
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
        const response = await apiPosts();
        setPosts(response);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-4">
            <Row gutter={24}> {/* Added gutter to provide spacing between columns */}
                {posts.map(post => (
                    <Col xs={12} md={6} key={post.id}
                         className="px-3"> {/* Adjust span sizes based on your layout requirements */}
                        <Card className="shadow-2xl mb-2" title={post.title}>
                            <Text>{post.body}</Text>
                            <p>{post.body}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Index;
