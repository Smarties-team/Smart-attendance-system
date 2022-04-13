import React from 'react';
import ReactDOM from 'react-dom';
import StudentsTable from "./StudentsTable";



function Students(props) {

    return (
        <div>
            {/*<Navb page={'students'}/>*/}
            <h1>Students </h1>

            <StudentsTable/>
            {/*<FormUI/>*/}
        {/*    Request students from database then show them*/}
        </div>

    );

}


// style="width: 280px;"
export default Students;
