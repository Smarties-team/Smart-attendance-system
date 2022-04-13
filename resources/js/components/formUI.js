import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

function FormUI() {

    const [inputs, setInputs] = useState({});

    // FormData is used to collect form data along with the uploaded file and then post it using axios
    // A normal object didn't work as the file doesn't get uploaded to the backend successfully
    const [formD, setFormD] = useState(new FormData());
    let fileRef = useRef(null);    // input file element reference

    const handleSubmit = function (event) {
        event.preventDefault();

        axios.post('/addstudent', formD).then((res)=> {
            alert(res.data);
            console.log(res.data);

        }).catch((err) => {
            alert("Failed to submit the form due to: " + err);
            console.log("Failed to submit the form due to: " + err);
        });
    }

    const handleChange = (event) => {
        const Name = event.target.name;
        const Value = event.target.value;
        // setInputs( {...inputs, [Name]: Value});

        // Append to FormData
        setFormD((f)=> {f.append(Name, Value); return(f);});
        console.log("Name: " + Name, "Value: "  + Value);

    }

    const handleFileInput = (event) => {
        const Name = event.target.name;
        const file = fileRef.current.files[0];
        // setInputs( {...inputs, [Name]: file});

        console.log(fileRef.current.files[0]);
        // Append to FormData
        setFormD((f)=> {f.append(Name, file); return(f);});
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/*Name, National ID, Grade, Classroom, Address, Photo, Generate an ID*/}

                <h3>Add student</h3>

                <div className="row">
                    <input type="text" placeholder="Name" name="name" required onChange={handleChange} className="w-25 form-control"/>
                </div>
                <div className="row mt-3">
                    <input type="text" placeholder="Address" name="address" required onChange={handleChange} className="w-25 form-control"/>
                </div>

                <div className="row mt-3">
                    <input type="text" placeholder="National ID" name="natID" required onChange={handleChange} className="w-25 form-control"/>
                </div>

                <div className="row mt-3">
                    <input type="text" placeholder="Grade" name="grade" required onChange={handleChange} className="w-25 form-control"/>
                </div>

                <div className="row mt-3">
                    <input type="text" placeholder="Classroom" name="c_room" onChange={handleChange} className="w-25 form-control"/>
                </div>

                <div className="row mt-3">
                    <label>Photo: </label> <input type="file" name="myfile" required ref={fileRef} onChange={handleFileInput}/>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default FormUI;

// if (document.getElementById('form-e')) {
//     ReactDOM.render(<FormUI />, document.getElementById('form-e'));
// }
