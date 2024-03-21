import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Footer } from "@/widgets/layout";
import { Button} from "@material-tailwind/react";
import Swal from 'sweetalert2';

const Category = () => {
  const [ordersAssets, setOrdersAssets] = useState([]);

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
            }),
          };
        });
        setOrdersAssets(formattedAssets);
      })
      .catch(err => console.log(err));
  }, []);

  const handleButtonClick = (assetId) => {
    const username = localStorage.getItem('username');
    const selectedAsset = ordersAssets.find(asset => asset._id === assetId);
    if (selectedAsset) {
      const { asset_type, make, model, purchase_cost,status } = selectedAsset;
      const dataToSend = {
        username, 
        assetId,
        asset_type,
        make,status,
        model,
        purchase_cost
      };
  
      axios.post("http://localhost:3001/order/createorders", dataToSend)
        .then(response => {
          console.log("Asset added successfully:", response.data);
          Swal.fire({
            icon: 'success',
            title: 'Purchase Successful!',
            text: 'Thank you for your purchase.',
          });
        })
        .catch(error => {
          console.error("Error adding asset:", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again later.',
          });
        });
    } else {
      console.error("Asset not found with ID:", assetId);
    }
  };

  return (
    <div>
      <section className="relative block h-[30vh]">
      <section className="relative block h-[30vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
            </section>
      <section className="relative bg-white py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ordersAssets.map(asset => (
              <div key={asset._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">Product Name: {asset.asset_type}</h2>
                <h2 className="text-xl text-gray-600 mb-2">Make: {asset.make}</h2>
                <h2 className="text-xl text-gray-600 mb-2">Model: {asset.model}</h2>
                <h2 className="text-xl text-gray-600 mb-2">Status: {asset.status}</h2>
                <p className="text-sm text-gray-600 mb-2">Date: {asset.purchase_date}</p>
                <Button variant="contained" color="success" onClick={() => handleButtonClick(asset._id)}>Buy {asset.purchase_cost}</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </div>
  );
}

export default Category;
