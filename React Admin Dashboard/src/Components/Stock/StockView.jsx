import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';


const StockView = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/product/productsdata")
      .then(result => setAssets(result.data))
      .catch(err => console.log(err))
  }, []);

  const handleDownloadExcel = () => {
    // Combine table data with grand total
    const dataWithTotal = [...stockData, { assetType: 'Grand Total', branches: [], totalQuantity: '', totalValue: grandTotal }];

    // Convert data to CSV format
    const csv = generateCSV(dataWithTotal);

    // Create a Blob object from the CSV data
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

    // Save the Blob as a file with a name
    saveAs(blob, 'Revenue_data.csv');
  };

  const generateCSV = (data) => {
    // Generate CSV content from the data
    let csv = 'Asset Type,Branch-wise,Total Quantity,Total Value\n';
    data.forEach(item => {
      const row = `${item.assetType},"${item.branches.join(', ')}",${item.totalQuantity},${item.totalValue}\n`;
      csv += row;
    });
    return csv;
  };

  const getStockData = () => {
    const groupedAssets = {};

    assets.forEach(asset => {
      const { asset_type, purchase_cost, model } = asset;

      if (!groupedAssets[asset_type]) {
        groupedAssets[asset_type] = { quantity: 0, value: 0, branches: [] };
      }

      groupedAssets[asset_type].quantity += 1;
      groupedAssets[asset_type].value += purchase_cost;
      groupedAssets[asset_type].branches.push(model);
    });

    return Object.keys(groupedAssets).map(assetType => ({
      assetType,
      totalQuantity: groupedAssets[assetType].quantity,
      totalValue: groupedAssets[assetType].value,
      branches: [...new Set(groupedAssets[assetType].branches)]
    }));
  };

  const stockData = getStockData();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const grandTotal = stockData.reduce((total, data) => total + data.totalValue, 0);

  return (
    <div>
      <main className='main-container'>
        <h1 style={{ textAlign: 'center' }}>Stock View </h1>
        <div className="card-box-emp">
        <button className="btn btn-primary" onClick={handleDownloadExcel}>Download Excel</button>
<br/><br/>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Asset Type</th>
                <th>Branch-wise</th>
                <th>Total Quantity</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((data, index) => (
                <tr key={index}>
                  <td>{data.assetType}</td>
                  <td>{data.branches.join(', ')}</td>
                  <td>{data.totalQuantity}</td>
                  <td>{formatCurrency ( data.totalValue)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" style={{ textAlign: 'right' }}><b>Grand Total:</b></td>
                <td><b>{formatCurrency(grandTotal)}</b></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
    </div>
  );
}

export default StockView;
