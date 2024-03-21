import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]); 

    useEffect(() => {
        axios.get("http://localhost:3001/auth/signupdata")
          .then(result => {
            const formattedAssets = result.data.map(assetsmas => {
              return {
                ...assetsmas,
                signup_date: new Date(assetsmas.signup_date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }),
              };
            });
            setUsers(formattedAssets);
          })
          .catch(err => console.log(err));
      }, []);

  return (
    <div>
        <main className='main-container'>
        <div className="card-box-emp">
          <div className="row">
            <div className="col-sm-12">
              <h2 style={{ textAlign: 'center', color: "black" }}>User History</h2>
            </div>
          </div>
      <table id='asset-table' className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>User ID </th>
                <th>User Name</th>
                <th>E-mail</th>
                <th>Date</th>
                <th>Mobile</th>
                <th>Address</th>

              </tr>
            </thead>
            <tbody>
              {
                users.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.signup_date}</td>
                      <td>{item.mobileno}</td>
                      <td>{item.address}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
    </div>
    </main>
    </div>

  )
}

export default Users
