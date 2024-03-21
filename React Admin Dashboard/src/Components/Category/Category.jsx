import React, { useEffect, useState } from 'react';
import axios from 'axios';import Swal from 'sweetalert2';


const Category = () => {
  const [categoryname, setCatname] = useState('');
  const [categoryMaster, setCategorymaster] = useState([]);
  const [errors, setErrors] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateCategoryId, setUpdateCategoryId] = useState(null);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!categoryname) {
      newErrors.categoryname = 'Category Name is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const clearInput = () => {
    setCatname('');
    setErrors({});
    setIsUpdateMode(false);
    setUpdateCategoryId(null);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/category/categorydata")
      .then(result => setCategorymaster(result.data))
      .catch(err => console.log(err))
  }, []);

  const handleUpdateClick = (categoryId) => {
    const categoryToUpdate = categoryMaster.find(category => category._id === categoryId);
    setCatname(categoryToUpdate.categoryname);
    setIsUpdateMode(true);
    setUpdateCategoryId(categoryId);
  };
  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/category/deleteCategory/' + id)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const Submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isUpdateMode) {
        axios
          .put(`http://localhost:3001/category/updateCategory/${updateCategoryId}`, { categoryname })
          .then((result) => {
            console.log(result);
            Swal.fire({
              icon: 'success',
              title: 'Submission Successful',
              text: 'Category Updated successfully!',
            })
            clearInput();
            window.location.reload();
            })
          .catch((err) => console.log(err));
      } else {
        // Add new category
        axios
          .post('http://localhost:3001/category/createCategory', { categoryname })
          .then((result) => {
            console.log(result);
            Swal.fire({
              icon: 'success',
              title: 'Submission Successful',
              text: 'Category Submitted successfully!',
            })
            clearInput();
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div>
      <main className='main-container'>
      <h5 style={{ textAlign: 'center',color:'black' }}>Catagory</h5>
        <div className="card-box-emp">
          <form onSubmit={Submit}>
            <div className='row'>
              <div className='col-sm-4'>
                <label>Category Name</label>
                <input
                  type='text'
                  placeholder='Enter Category Name'
                  className={`form-control ${errors.categoryname ? 'is-invalid' : ''}`}
                  value={categoryname}
                  onChange={(e) => setCatname(e.target.value)}
                />
                {errors.categoryname && <div className="invalid-feedback">{errors.categoryname}</div>}
              </div>
              <div className='col-sm-4'><br />
                <button type='submit' className='btn btn-success'>{isUpdateMode ? 'Update' : 'Submit'}</button>
              </div>
            </div>
          </form>
        </div>
        <div className="card-box-emp">
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Category ID </th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                categoryMaster.map((category) => {
                  return (
                    <tr key={category._id}>
                      <td>{category._id}</td>
                      <td>{category.categoryname}</td>
                      <td>
                        <button className='btn btn-primary' onClick={() => handleUpdateClick(category._id)}>Edit</button> &nbsp;
                        <button className='btn btn-danger' onClick={() => handleDelete(category._id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Category
