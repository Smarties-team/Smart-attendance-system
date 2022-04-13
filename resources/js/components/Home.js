import React from 'react';
import ReactDOM from 'react-dom';

import FormUI from "./formUI";
import {Link, NavLink} from "react-router-dom";

function Home(props) {



    return (
      <FormUI />
    );

}
// <NavLink to={'/Students'}>Student X!</NavLink>
// <NavLink className={({isActive}) => isActive ? "nav-link dark" : "nav-link active"} to={'/Students'}>Y </NavLink>


// style="width: 280px;"
export default Home;
