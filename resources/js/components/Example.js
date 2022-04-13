import React from 'react';
import ReactDOM from 'react-dom';

function Example(props) {
    return (
        <div className="container">
            <div className="row justify-content-\
            center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm EXXXXAS! and {props.name}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}




// <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
//     <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
//         <span className="fs-4 text-danger">Smart classroom</span>
//     </a>
//     <hr/>
//         <ul className="nav nav-pills flex-column mb-auto">
//             <li className="nav-item">
//                 <a href="#" className="nav-link active" aria-current="page">
//                     Home
//                 </a>
//             </li>
//             <li>
//                 <a href="#" className="nav-link link-dark">
//                     Students
//                 </a>
//             </li>
//             <li className="visually-hidden">
//                 <a href="#" className="nav-link link-dark">
//                     Orders
//                 </a>
//             </li>
//             <li className="visually-hidden">
//                 <a href="#" className="nav-link link-dark">
//                     Products
//                 </a>
//             </li>
//             <li className="visually-hidden">
//                 <a href="#" className="nav-link link-dark">
//                     Customers
//                 </a>
//             </li>
//         </ul>
//         <hr/>
//             <div className="dropdown visually-hidden">
//                 <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
//                    id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
//                     <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
//                         <strong>mdo</strong>
//                 </a>
//                 <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
//                     <li><a className="dropdown-item" href="#">New project...</a></li>
//                     <li><a className="dropdown-item" href="#">Settings</a></li>
//                     <li><a className="dropdown-item" href="#">Profile</a></li>
//                     <li>
//                         <hr className="dropdown-divider"></hr>
//                     </li>
//                     <li><a className="dropdown-item" href="#">Sign out</a></li>
//                 </ul>
//             </div>
// </div>
