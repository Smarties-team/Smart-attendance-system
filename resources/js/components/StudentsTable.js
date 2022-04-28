import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import './StudentsTable.css';


// async makes it fail (React component cannot be async)
function StudentsTable() {

    const [students, setStudents] = useState([]);

    // get the students from the backend
    async function getStudents() {
        let response = await axios.get('students');
        console.log('res: ', response);
        setStudents(response.data);
    }

    // Run getStudents only one time when the component renders the first time
    useEffect(async () => {
        await getStudents();
    }, []);

    // Just for debugging (Print students object whenever its state changes)
    useEffect(() => {
        console.log(students);
    }, [students]);

    // students.forEach((x) => console.log(x));

    const isPresent = (student) =>
    {
        if (student.left_at == null) {
            return (
                <span style={{color: "green"}}>Present</span>
            );
        }
        else {
            return (
                <span style={{color: "red"}}>Absent</span>
            );
        }

    }

    return (
        <div>
            <table className="table">

                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Status</th>
                    <th scope="col">Photo</th>
                </tr>
                </thead>

                <tbody>

                {
                    students.map((student, index) =>

                        <tr key={student.id}>
                            <th className={"align-middle"} scope="row">{index+1}</th>
                            <td className={"align-middle"}>{student.name}</td>
                            <td className={"align-middle"}>{student.grade}</td>
                            <td className={"align-middle"}>{isPresent(student)}</td>

                            <td className={"align-middle"}>
                                <img src={"storage/" + student.photo} height={"50px"} width={"50px"}/>
                            </td>
                        </tr>
                )
                }

                </tbody>
            </table>
        </div>

    );

}


// style="width: 280px;"
export default StudentsTable;
