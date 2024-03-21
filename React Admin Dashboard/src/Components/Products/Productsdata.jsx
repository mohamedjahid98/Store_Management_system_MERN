import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

const Productsdata = () => {
  const [assets,setAssets ] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  useEffect(() => {
    axios.get("http://localhost:3001/product/productsdata")
        .then(result => {
            const formattedAssets = result.data.map(assetsmas => {
                return {
                    ...assetsmas,
                    purchase_date: new Date(assetsmas.purchase_date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })
                };
            });
            setAssets(formattedAssets);
        })
        .catch(err => console.log(err));
}, []);


  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/product/deleteproducts/' + id)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  //update and delete btn function
  const actionTemplate = (rowData) => {
    return (
      <div>
        <Link to={`/products/update/${rowData._id}`}>
          <Button icon="pi pi-pencil" className="p-button-rounded p-button-primary" />
        </Link>
        <Button icon="pi pi-trash"  onClick={() => handleDelete(rowData._id)} className="p-button-rounded p-button-danger" />

      </div>
    );
  };

  return (
    <div>
      <main className='main-container'>
        <div className="card-box-emp">
          <div className="row">
            <div className="col-sm-12">
              <h2 style={{ textAlign: 'center', color: "black" }}>Products Data</h2>
              <a href="/products/create" style={{ float: 'right' }} id="addbtn" className="btn btn-success btn-rounded">Add New</a>
            </div>
          </div>
          <div className="flex justify-content-start">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </span>
          </div><br />
          <DataTable value={assets} showGridlines filters={filters} globalFilterFields={['serial_no', 'asset_type', 'make', 'model', 'purchase_date','purchase_cost','status']} stripedRows paginator rows={5} rowsPerPageOptions={[2, 5, 10]} tableStyle={{ minWidth: '50rem' }}
            emptyMessage="No Assets found.">
            <Column field="serial_no" filterField="serial_no" header="Product Number"></Column>
            <Column field="asset_type" filterField="asset_type" header="Asset Type"></Column>
            <Column field="model" filterField="model" header="Model"></Column>
            <Column field="status" filterField="status" header="Status"></Column>
            <Column field="purchase_date" filterField="purchase_date" header="Purchase Date"></Column>
            <Column field="purchase_cost" filterField="purchase_cost" header="Purchase Cost"></Column>
            <Column header="Action" body={actionTemplate}></Column>

          </DataTable>
        </div>
      </main>
    </div>
  );
};

export default Productsdata
