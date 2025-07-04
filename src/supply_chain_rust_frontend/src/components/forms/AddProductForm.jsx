import React, { useState } from 'react';
import { supplyChainActor } from '../../utils/icp';

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    origin: '',
    description: '',
    certifications: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, name, origin, description, certifications } = formData;

    try {
      const certArray = certifications.split(',').map(c => c.trim());
      const result = await supplyChainActor.add_product(
        id,
        name,
        origin,
        certArray,
        description ? [description] : []
      );

      if ('Ok' in result) {
        setMessage('✅ Product added successfully!');
      } else {
        setMessage(`❌ Error: ${result.Err}`);
      }
    } catch (err) {
      setMessage(`❌ Exception: ${err.message}`);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h4>Add New Product</h4>
      <form onSubmit={handleSubmit}>
        {["id", "name", "origin", "description", "certifications"].map((field) => (
          <input
            key={field}
            className="form-control my-2"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
        ))}
        <button className="btn btn-primary w-100">Add Product</button>
      </form>
      <p className="mt-2 text-center">{message}</p>
    </div>
  );
}
