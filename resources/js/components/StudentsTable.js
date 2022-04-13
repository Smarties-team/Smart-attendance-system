import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';



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

                {
                    students.map((student, index) =>

                        <tr key={student.id}>
                            <th scope="row">{student.id}</th>
                            <td>{student.name}</td>
                            <td>{student.grade}</td>
                            <td>Present</td>
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
