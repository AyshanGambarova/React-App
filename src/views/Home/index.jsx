import React from "react";
import About from "./sections/About";
import Services from "./sections/Services";
import Landing from "./sections/Landing";

function Index() {
    return (
        <div className="p-4">
            <Landing/>
            <Services/>
            <About/>
        </div>
    );
}

export default Index;
