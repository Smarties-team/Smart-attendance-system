import React from 'react';
import ReactDOM from 'react-dom';

function NavAnch(props) {

    let ref = '/' + props.name;
    let anch = '';

    // Conditional Rendering
    if (props.active) {
        anch = <a href={ref} className="nav-link active" aria-current="page">
            {props.name}
        </a>;
    }
    else {
        anch = <a href={ref} className="nav-link link-dark">
            {props.name}
        </a>;
    }

    return (anch);

}

function Navbar(props) {

    // Extract current page name from the URI
    let path = location.pathname;
    let dirs = path.split('/');
    let page = dirs[1].toLowerCase();

    let isActive = function (name) {
        return page == name;
    }

    console.log(page);


    return (

        // Navigation bar
        <div className="col-auto p-3 bg-light">
            <a href="/"
               className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <span className="fs-4 text-danger">Smart classroom</span>
            </a>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavAnch name={"Home"} active={page == 'home' || page == ''}/>
                    {/*<a href="#" className={homeLinkClass} aria-current="page">*/}
                    {/*    Home*/}
                    {/*</a>*/}
                </li>
                <li>
                    <NavAnch name={"Students"} active={page == 'students'}/>
                    {/*<a href="#" className={studentLinkClass}>*/}
                    {/*    Students*/}
                    {/*</a>*/}
                </li>
                <li className="visually-hidden">
                    <a href="#" className="nav-link link-dark">
                        Orders
                    </a>
                </li>
                <li className="visually-hidden">
                    <a href="#" className="nav-link link-dark">
                        Products
                    </a>
                </li>
                <li className="visually-hidden">
                    <a href="#" className="nav-link link-dark">
                        Customers
                    </a>
                </li>
            </ul>
            <hr/>
            <div className="dropdown visually-hidden">
                <a href="#"
                   className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                   id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32"
                         className="rounded-circle me-2"/>
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li>
                        <hr className="dropdown-divider"></hr>
                    </li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
        </div>


    );
}

// style="width: 280px;"
export default Navbar;
