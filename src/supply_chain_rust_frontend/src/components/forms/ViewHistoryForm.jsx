import React, { useState } from 'react';
import { supplyChainActor } from '../../utils/icp';

export default function ViewHistoryForm() {
  const [id, setId] = useState('');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    try {
      const result = await supplyChainActor.get_product_history(id);
      if ('Ok' in result) {
        setHistory(result.Ok);
        setError('');
      } else {
        setError(result.Err);
        setHistory([]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h4>Product History</h4>
      <input className="form-control my-2" placeholder="Product ID" value={id} onChange={e => setId(e.target.value)} />
      <button className="btn btn-secondary w-100 mb-2" onClick={fetchHistory}>Get History</button>
      {error && <p className="text-danger text-center">{error}</p>}
      <ul className="list-group">
        {history.map((tx, idx) => (
          <li key={idx} className="list-group-item">
            <strong>{new Date(Number(tx.timestamp) / 1_000_000).toLocaleString()}</strong>:  
            {` ${tx.from} ➡️ ${tx.to}`}
            {tx.metadata && <div><em>Note:</em> {tx.metadata}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
