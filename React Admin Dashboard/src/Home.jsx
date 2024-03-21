import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs'
import { FaMoneyBillAlt } from 'react-icons/fa'; import axios from 'axios';

function Home() {

  const [apiData, setApiData] = useState([]);
  const [productsdata, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [revenueCount, setrevenueCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [assetCount, setAssetCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/auth/signupdata')
      .then((response) => response.json())
      .then((data) => {
        setUserCount(data.length);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  useEffect(() => {
    fetch("http://localhost:3001/category/categorydata")
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
        setProductCount(data.length);
      })
      .catch(err => console.log(err))
  }, []);


  useEffect(() => {
    fetch("http://localhost:3001/product/productsdata")
      .then((response) => response.json())
      .then((data) => {
        let totalPurchaseCost = 0;
        data.forEach(product => {
          totalPurchaseCost += product.purchase_cost;
          // Format purchase_date field to dd/mm/yyyy format
          const date = new Date(product.purchase_date);
          const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          product.purchase_date = formattedDate;
        });

        setProducts(data);
        setAssetCount(data.length);
        setrevenueCount(totalPurchaseCost);
      })
      .catch(err => console.log(err));
  }, []);





  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3 style={{ color: 'black' }}>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h6>Product</h6>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{assetCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h6>CATEGORIES</h6>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{productCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h6>Revenue</h6>
            <FaMoneyBillAlt className='card_icon' />
          </div>
          <h1>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(revenueCount)}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h6>USERS</h6>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{userCount}</h1>
        </div>
      </div>

      <div className='row charts'>
        <div className='col'>
          <h6 style={{ color: "black" }}>Catagory</h6>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Category ID </th>
                <th>Category Name</th>
              </tr>
            </thead>
            <tbody>
              {
                apiData.map((category) => {
                  return (
                    <tr key={category._id}>
                      <td>{category._id}</td>
                      <td>{category.categoryname}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <div className='col'>
          <h6 style={{ color: "black" }}>Employee Assets</h6>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Order Name</th>
                <th>Cost</th>
                <th>Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {
                productsdata.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.asset_type}</td>
                      <td>{item.purchase_cost}</td>
                      <td>{item.purchase_date}</td>

                    </tr>
                  );
                })
              }
            </tbody>
          </table>            
          </div>
      </div>
    </main>
  )
}

export default Home