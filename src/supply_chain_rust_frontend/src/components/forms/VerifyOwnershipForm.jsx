import React, { useState } from 'react';
import { supplyChainActor } from '../../utils/icp';

export default function VerifyOwnershipForm() {
  const [id, setId] = useState('');
  const [owner, setOwner] = useState('');
  const [result, setResult] = useState('');

  const verify = async () => {
    try {
      const res = await supplyChainActor.verify_ownership(id, owner);
      if ('Ok' in res) {
        setResult(res.Ok ? '✅ Owner verified' : '❌ Not the owner');
      } else {
        setResult(`❌ Error: ${res.Err}`);
      }
    } catch (err) {
      setResult(`❌ Exception: ${err.message}`);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h4>Verify Ownership</h4>
      <input className="form-control my-2" placeholder="Product ID" value={id} onChange={e => setId(e.target.value)} />
      <input className="form-control my-2" placeholder="Owner Principal" value={owner} onChange={e => setOwner(e.target.value)} />
      <button className="btn btn-outline-success w-100 mb-2" onClick={verify}>Verify</button>
      <p className="text-center">{result}</p>
    </div>
  );
}
