import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]); 

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/order/ordersdata")
      .then(result => {
        const formattedOrders = result.data.map(order => {
          return {
            ...order,
            order_date: new Date(order.order_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }),
          };
        });
        setOrders(formattedOrders);
        setFilteredOrders(formattedOrders);
      })
      .catch(err => console.log(err));
  }, []);

  function getStatusColor(status) {
    switch (status) {
      case 'New':
        return 'blue';
      case 'ongoing':
        return 'yellow';
      case 'Completed':
        return 'green';
      default:
        return 'black';
    }
  }

  useEffect(() => {
    if (selectedStatus === 'All') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => order.status && order.status.toLowerCase() === selectedStatus.toLowerCase());
      setFilteredOrders(filtered);
    }
  }, [selectedStatus, orders]);

  const handleEditStatus = (id) => {
    setSelectedOrderId(id);
    // Fetch order status by ID
    axios.get(`http://localhost:3001/order/getorders/${id}`)
      .then(response => {
        setStatus(response.data.status);
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error fetching order status:', error);
      });
  };

  const handleStatusUpdate = () => {
    axios.put(`http://localhost:3001/order/updateorders/${selectedOrderId}`, { status: newStatus })
      .then(response => {
        const updatedOrders = orders.map(order => {
          if (order._id === selectedOrderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        setShowModal(false);
        setSelectedOrderId('');
        setNewStatus('');
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };

  return (
    <div>
      <main className='main-container'>
        <div className="card-box-emp">
          <div className="row">
            <div className="col-sm-12">
              <h2 style={{ textAlign: 'center', color: "black" }}>Order's History</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <label htmlFor="status-filter">Filter by Status:</label>
              <select id="status-filter" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="All">All</option>
                <option value="New">New</option>
                <option value="ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <table id='asset-table' className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Make</th>
                <th>Model</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
  {filteredOrders.map((item) => {
    return (
      <tr key={item._id}>
        <td>{item._id}</td>
        <td>{item.username}</td>
        <td>{item.asset_type}</td>
        <td>{item.make}</td>
        <td>{item.model}</td>
        <td>
          {item._id === selectedOrderId ? (
            <select className="form-control" style={{ appearance: 'menulist', WebkitAppearance: 'menulist' }} value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value={item.status}>{item.status}</option>
            <option value="New">New</option>
            <option value="ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          
          ) : (
            <span className={`status-badge ${getStatusColor(item.status)}`}>{item.status}</span>
          )}
        </td>
        <td>{item.purchase_cost}</td>
        <td>{item.order_date}</td>
        <td>
          {item._id === selectedOrderId ? (
            <button className='btn btn-success' onClick={handleStatusUpdate}>Submit</button>
          ) : (
            <button className='btn btn-primary' onClick={() => handleEditStatus(item._id)}>Edit Status</button>
          )}
        </td>
      </tr>
    );
  })}
</tbody>

          </table>
        </div>
      </main>
    </div>
  );
}

export default Orders;
