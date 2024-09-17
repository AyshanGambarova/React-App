import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {Outlet} from "react-router-dom";

function Index() {
    return (
        <>
            <div className="root-layout flex flex-col min-h-screen">
                <Navbar/>
                <main className="flex-grow">
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </>
    );
}

export default Index;
