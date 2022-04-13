import React from 'react';
import ReactDOM from 'react-dom';
import Navb from "./navb";
import FormUI from "./formUI";
import {Link, NavLink} from "react-router-dom";

function Home(props) {

    // let ref = '/' + props.name;
    // let anch = '';
    //
    // // Conditional Rendering
    // if (props.active) {
    //     anch = <a href={ref} className="nav-link active" aria-current="page">
    //         {props.name}
    //     </a>;
    // }
    // else {
    //     anch = <a href={ref} className="nav-link link-dark">
    //         {props.name}
    //     </a>;
    // }

    return (
      <FormUI />
    );

    // return (
    //     <div>
    //         <div className="container">
    //             <div className="row">
    //                 <Navb page={'home'}/>
    //                 <FormUI/>
    //             </div>
    //         </div>
    //     </div>
    //
    // );

}
// <NavLink to={'/Students'}>Student X!</NavLink>
// <NavLink className={({isActive}) => isActive ? "nav-link dark" : "nav-link active"} to={'/Students'}>Y </NavLink>


// style="width: 280px;"
export default Home;
