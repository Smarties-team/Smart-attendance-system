import {Outlet, Link} from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";





const Layout = () => {



    return (
        <>
            <div>
                <div className="container-fluid">
                    <div className="row">

                        <Navbar/>

                        <div className="col mt-5 ms-5">
                            {/*Outlet - A component that renders the next match in a set of matches.*/}
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};


export default Layout;
