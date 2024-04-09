import Navbar from "../../components/Navbar";
import {Outlet} from "react-router-dom";

function Index() {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )

}

export default Index;