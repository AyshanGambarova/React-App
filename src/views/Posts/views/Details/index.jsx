import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
//APIs
import {apiPostsDetails} from "../../../../apis";

function Index() {
    //#region State

    const {id} = useParams();
    const [postDetails, setPostDetails] = useState({})

    //#endregion

    //#region Functions

    const fetchData = async () => {
        try {
            const data = await apiPostsDetails(id);
            setPostDetails(data)
        } catch (error) {
            //
        }
    }

    //#endregion

    //#region Hooks

    useEffect(() => {
        fetchData();
    }, []);

    //#endregion
    return (
        <div>{postDetails.body}</div>
    )
}

export default Index;