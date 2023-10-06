import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants';
import { Link } from 'react-router-dom';

function EditAssignment(props) {
  const [assignment, setAssignment] = useState({});
  const [message, setMessage] = useState('');

  const assignmentId = props.match.params.id;

  useEffect(() => {
    fetchAssignment();
  }, []);

  const fetchAssignment = () => {
    setMessage('');
    fetch(`${SERVER_URL}/assignment/${assignmentId}`)
      .then((response) => response.json())
      .then((data) => {
        setAssignment(data);
      })
      .catch((err) => {
        setMessage("Exception. " + err);
        console.error("fetch assignment error " + err);
      });
  };

  const onChangeInput = (e) => {
    setMessage('');
    setAssignment({
      ...assignment,
      [e.target.name]: e.target.value,
    });
  };

  const updateAssignment = () => {
    setMessage('');
    console.log("Assignment.update ");
    fetch(`${SERVER_URL}/assignment/${assignmentId}`, {
      method: 'PUT', // Use PUT method for updating
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assignment),
    })
      .then((res) => {
        if (res.ok) {
          fetchAssignment();
          setMessage("Assignment updated.");
        } else {
          setMessage("Update error. " + res.status);
          console.error('Update assignment error =' + res.status);
        }
      })
      .catch((err) => {
        setMessage("Exception. " + err);
        console.error('Update assignment exception =' + err);
      });
  };

  const headers = ['Assignment Name', 'Due Date', 'courseID'];

  return (
    <div>
            <h3>Edit assignments</h3>
            <div margin="auto" >
                <h4>{message}&nbsp;</h4>

                <table className="Center">
                    <thead>
                        <tr>
                            {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input name="assignmentName"
                                    value={(assignment.assignmentName) ? assignment.assignmentName : ""}
                                    type="text"
                                    onChange={(e) => onChangeInput(e)} />
                            </td>
                            <td>
                                {assignment.courseTitle}
                            </td>
                            <td>
                                <input name="dueDate"
                                    value={(assignment.dueDate) ? assignment.dueDate : ""}
                                    type="text"
                                    onChange={(e) => onChangeInput(e)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button id="sassignment" type="button" margin="auto" onClick={updateAssignment}> Save Changes </button>

            </div>
        </div>
  );
}

export default EditAssignment;
