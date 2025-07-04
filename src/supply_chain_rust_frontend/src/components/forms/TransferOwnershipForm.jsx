import React, { useState } from 'react';
import { supplyChainActor } from '../../utils/icp';

export default function TransferOwnershipForm() {
  const [formData, setFormData] = useState({
    id: '',
    newOwner: '',
    metadata: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, newOwner, metadata } = formData;

    try {
      const result = await supplyChainActor.transfer_ownership(
        id,
        newOwner,
        metadata ? [metadata] : []
      );

      if ('Ok' in result) {
        setMessage('✅ Ownership transferred successfully!');
      } else {
        setMessage(`❌ Error: ${result.Err}`);
      }
    } catch (err) {
      setMessage(`❌ Exception: ${err.message}`);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h4>Transfer Ownership</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          placeholder="Product ID"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          placeholder="New Owner Principal"
          name="newOwner"
          value={formData.newOwner}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          placeholder="Metadata (optional)"
          name="metadata"
          value={formData.metadata}
          onChange={handleChange}
        />
        <button className="btn btn-warning w-100">Transfer</button>
      </form>
      <p className="mt-2 text-center">{message}</p>
    </div>
  );
}
