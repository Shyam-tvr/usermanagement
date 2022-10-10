import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import{useNavigate} from"react-router-dom"
import Table from "react-bootstrap/Table";
import { isExpired } from "react-jwt";

function Details() {
  const [editMail, setEditMail] = useState(false);
  const [editName, setEditName] = useState(false);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate =useNavigate()

  const userAction = (_id, status) => {
    fetch("http://localhost:5000/admin/user_manage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        status,
      }),
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if(!token){
      navigate('/login')
    }else{
      const isExp = isExpired(token)
      if(isExp){
        navigate('/login')
      }
    }
    let fetchdata = async () => {
      let res = await fetch("http://localhost:5000/admin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": token
        },
      });
      res = await res.json();
      if(res.error){
       navigate('/login')
      }else{
        setUsers(res);
      }
    };
    fetchdata();
  }, [email, userAction, deleteUser]);

  

  const deleteUser = (_id) => {
    fetch("http://localhost:5000/admin/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
      }),
    });
  };

  const editUser = (name, email, _id) => {
    fetch("http://localhost:5000/admin/editUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name , email , _id
      }),
    });
  };

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center"> Full Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">Block/Unblock</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                {editName ? (
                    <div>
                      <input
                        type="text"
                        className="border-0"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                      <i
                        class="bx bx-check text-success"
                        onClick={() => {
                          setEditName(!editName);
                          editUser(name, user.email , user._id);
                        }}
                      ></i>
                    </div>
                  ) : (
                    <div>
                      {user.name}
                      <i
                        class="bx bx-edit-alt text-primary"
                        onClick={() => {
                          setEditName(!editName);
                        }}
                      ></i>
                    </div>
                  )}
                </td>
                <td className="text-center">
                  {editMail ? (
                    <div>
                      <input
                        type="text"
                        className="border-0"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />{" "}
                      <i
                        class="bx bx-check text-success"
                        onClick={() => {
                          setEditMail(!editMail);
                          editUser(user.name, email , user._id);
                        }}
                      ></i>
                    </div>
                  ) : (
                    <div>
                      {user.email}{" "}
                      <i
                        class="bx bx-edit-alt text-primary"
                        onClick={() => {
                          setEditMail(!editMail);
                        }}
                      ></i>
                    </div>
                  )}
                </td>
                <td
                  className="text-center"
                  onClick={() => {
                    userAction(user._id, user.active);
                  }}
                >
                  {user.active ? "block" : "Unblock"}
                </td>
                <td className="text-center">
                  {" "}
                  <i
                    class="bx bx-trash text-danger ms-2"
                    onClick={() => {
                      deleteUser(user._id);
                    }}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Details;
