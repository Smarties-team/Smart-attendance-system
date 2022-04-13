import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';


// {invoices.map((invoice) => (
//     <Link
//         style={{ display: "block", margin: "1rem 0" }}
//         to={`/invoices/${invoice.number}`}
//         key={invoice.number}
//     >
//         {invoice.name}
//     </Link>

// <button onClick={(event) => shoot("Goal!", event)}>Take the shot!</button>

function StudentRow(props) {

    return (
        <tr>
            {/*<th scope={row}>{prop.index}</th>*/}
            {console.log("here")}
            {/*<td>{props.student.name}</td>*/}
            {/*<td>{props.student.grade}</td>*/}
            <td>Present</td>
        </tr>
    );

}

// async makes it fail
function StudentsTable() {


    const [students, setStudents] = useState([]);
    // get the students from the backend


    async function getStudents() {
        let response = await axios.get('students');
        console.log('res: ', response);
        setStudents(response.data);

        // students.forEach((x) => console.log("S:" + x));

    }

    useEffect(async () => {
        await getStudents();
    }, []);

    useEffect(() => {
        console.log(students);
    }, [students]);

    // students = await axios.get('students');
    // .then((res) => {
    //     console.log(res);
    //     students = res.data;
    //     students = JSON.parse(res);
    //
    //     console.log("response data: " + students);
    //     console.log("response data: " + students[1]);
    //
    //     console.log("response data: " + students[1][1]);
    //
    //     console.log("response data: " + students[1][1].name);
    //
    // }
    // )

    // students = students.data;
    // console.log(students);
    // students.forEach((x) => console.log(x));
    // console.log("Data: " + students.data);

    const createRow = (student, index) => {

        let row = "<tr>";
        row += '<th scope="row">';
        row += index;
        row += '</th>';
        row += "<td>" + student.name + "</td>";
        row += "<td>" + student.grade + "</td>";
        row += "<td>" + "Present" + "</td>";

        return (row);

    }

    const createRows = () => {
        console.log("here");
        let rows = students.map(createRow);
        console.log(rows);
        return rows;
    }

    // return("he");

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {students.map((stud, index) => {
                    console.log("from map " + index);
                    return <StudentRow student={stud} />
                })}
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </table>
        </div>

    );

}


// style="width: 280px;"
export default StudentsTable;
