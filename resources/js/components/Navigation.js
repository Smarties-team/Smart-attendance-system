import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Students from "./Students";
import Layout from "./Layout";


function Navigation(props) {
    return (
        //the recommended interface for running React Router in a web browser. <BrowserRouter> stores the current
        // location in the browser's address bar using clean URLs and navigates using the browser's built-in history stack.
        <BrowserRouter>

            {/*Stateful, top-level component that makes all the other components and hooks work.*/}
            <Routes>
                {/*Route paths are case-insensitive by default*/}
                <Route path={'/'} element={<Layout/>}>

                    {/*Index route A child route with no path that renders in the parent's outlet at the parent's URL
                    By default*/}
                    <Route index element={<Home/>}/>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/students' element={<Students/>}/>
                    {/*<Route path="*" element={<NoPage />}*/}
                </Route>
            </Routes>

            {/*You can make other routes outside the above layout here*/}
            {/*<Routes>*/}

            {/*    <Route path='/' element={<Home />} />*/}
            {/*    <Route path='/home' element={<Home />} />*/}
            {/*    <Route path='/students' element={<Students />} />*/}
            {/*    /!*<Route path="*" element={<NoPage />}*!/*/}

            {/*</Routes>*/}

        </BrowserRouter>
    );
}

export default Navigation;

if (document.getElementById('example')) {
    ReactDOM.render(<Navigation/>, document.getElementById('example'));
}
