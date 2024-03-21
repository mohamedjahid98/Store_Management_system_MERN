import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';


const UpdateProducts = () => {
  const { id } = useParams()
  const [serial_no, setSerial_no] = useState('');
  const [asset_type, setAsset_type] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [purchase_date, setPurchase_date] = useState('');
  const [status, setStatus] = useState('');
  const [purchase_cost, setPurchase_cost] = useState('');
  const [categoryMaster, setCategorymaster] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!serial_no) {
      errors.serial_no = 'Serial Number is required';
      valid = false;
    } else if (!/^\d{4}$/.test(serial_no)) {
      errors.serial_no = 'Serial Number must be exactly 4 digits';
      valid = false;
    }if (!asset_type) {
      errors.asset_type = 'Asset Type is required';
      valid = false;
    } if (!make) {
      errors.make = 'Make is required';
      valid = false;
    } if (!model) {
      errors.model = 'Model is required';
      valid = false;
    } if (!purchase_date) {
        errors.purchase_date = 'Purchase Date is required';
        valid = false;
      } if (!purchase_cost) {
        errors.purchase_cost = 'Purchase Cost is required';
        valid = false;
      }if (!status) {
        errors.status = 'Status is required';
        valid = false;
      } 
    setErrors(errors);
    return valid;
  };

  useEffect(() => {
    axios.get("http://localhost:3001/category/categorydata")
      .then(result => setCategorymaster(result.data))
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/product/getproducts/" + id)
      .then(result => {
        setSerial_no(result.data.serial_no)
        setAsset_type(result.data.asset_type)
        setMake(result.data.make)
        setStatus(result.data.status)
        setModel(result.data.model)
        const formattedDate = new Date(result.data.purchase_date).toISOString().split('T')[0]; //date format to remove time
        setPurchase_date(formattedDate) //and to convert dd/mm/yyyy format
        setPurchase_cost(result.data.purchase_cost)
        
      })
      .catch(err => console.log(err))
}, [])

const Update = (e) => {
  e.preventDefault();
  if (validateForm()) {
  axios.put("http://localhost:3001/product/updateproducts/" + id, { serial_no,status, asset_type, make, model, purchase_date,purchase_cost })
    .then(result => {
      console.log(result)
      Swal.fire({
        icon: 'success',
        title: 'Submission Successful',
        text: 'Product Updated successfully!',
      }).then(() => {
        navigate('/products');
      });    })
    .catch(err => console.log(err))
  }
}

  return (
    <div>
      <main className='main-container'>
                <div className="card-box-emp">
          <div class="row"  >
            <div class="col-sm-12">
              <h2 style={{ textAlign: 'center' }}>Product Assets</h2>
              <a href="/products"  id="addbtn" className="btn btn-primary btn-rounded">Back</a>
            </div>
          </div><br/>
          
          <div class="card-box-emp">
          <form onSubmit={Update}>
              <div className='row'>
                <div className='col-sm-6'>
                  <label>Serial Number</label>
                  <input type='number' placeholder='Enter Number' className={`form-control ${errors.serial_no ? 'is-invalid' : ''}`} value={serial_no}
                    onChange={(e) => setSerial_no(e.target.value)} />
                  {errors.serial_no && <div className="invalid-feedback">{errors.serial_no}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Asset Type</label>
                  <select value={asset_type} onChange={(e) => setAsset_type(e.target.value)} style={{ appearance: 'menulist', WebkitAppearance: 'menulist' }}
                    className={`form-control ${errors.asset_type ? 'is-invalid' : ''}`} >
                    <option value="">Select Asset Type</option>
                    {categoryMaster.map(category => (
                      <option key={category._id} value={category.categoryname}>
                        {category.categoryname}
                      </option>
                    ))}
                  </select>
                  {errors.asset_type && <div className="invalid-feedback">{errors.asset_type}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Staus</label>
                  <select
                    value={status} style={{ appearance: 'menulist', WebkitAppearance: 'menulist' }}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`form-control ${errors.status ? 'is-invalid' : ''}`}>
                    <option value="">Select Status</option>
                    <option value="New">New</option>
                    <option value="On-going">On going</option>
                    <option value="Completed">Completed</option>
                  </select>
                  {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Make</label>
                  <input type="text" placeholder="Enter Make" className={`form-control ${errors.make ? 'is-invalid' : ''}`} value={make}
                    onChange={(e) => setMake(e.target.value)} />
                  {errors.make && <div className="invalid-feedback">{errors.make}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Model</label>
                  <input type="text" placeholder='Enter Model' className={`form-control ${errors.model ? 'is-invalid' : ''}`} value={model}
                    onChange={(e) => setModel(e.target.value)} />
                  {errors.model && <div className="invalid-feedback">{errors.model}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Purchase Date</label>
                  <input type="date" placeholder='Enter Date' className={`form-control ${errors.purchase_date ? 'is-invalid' : ''}`} value={purchase_date}
                    onChange={(e) => setPurchase_date(e.target.value)} />
                  {errors.purchase_date && <div className="invalid-feedback">{errors.purchase_date}</div>}
                </div>
                <div className='col-sm-6'>
                  <label>Purchase Cost</label>
                  <input type="number" placeholder='Enter Cost' className={`form-control ${errors.purchase_cost ? 'is-invalid' : ''}`} value={purchase_cost}
                    onChange={(e) => setPurchase_cost(e.target.value)} />
                  {errors.purchase_cost && <div className="invalid-feedback">{errors.purchase_cost}</div>}
                </div>
              </div><br />
              <button className='btn btn-success'>Submit</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UpdateProducts
