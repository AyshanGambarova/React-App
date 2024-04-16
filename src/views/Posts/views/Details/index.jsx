import {useParams} from "react-router-dom";
//APIs
import {useQuery} from "react-query";
import {apiPostsDetails} from "../../../../apis";

function Index() {
    //#region State

    const {id} = useParams();

    const {isLoading, isError, data, error} = useQuery(['postDetails', id], () => apiPostsDetails(id));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {data && (
                <>
                    <h2>Post Details</h2>
                    <div>{data.id}</div>
                    <div>{data.body}</div>
                </>
            )}

        </>
    )
}

export default Index;