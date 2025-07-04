import React, { useState } from 'react';
import { supplyChainActor } from '../../utils/icp';

export default function AddCertificationForm() {
  const [id, setId] = useState('');
  const [certification, setCertification] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await supplyChainActor.add_certification(id, certification);
      if ('Ok' in result) {
        setMessage('✅ Certification added successfully!');
      } else {
        setMessage(`❌ Error: ${result.Err}`);
      }
    } catch (err) {
      setMessage(`❌ Exception: ${err.message}`);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h4>Add Certification</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" placeholder="Product ID" value={id} onChange={e => setId(e.target.value)} />
        <input className="form-control my-2" placeholder="Certification" value={certification} onChange={e => setCertification(e.target.value)} />
        <button className="btn btn-info w-100">Add</button>
      </form>
      <p className="mt-2 text-center">{message}</p>
    </div>
  );
}
