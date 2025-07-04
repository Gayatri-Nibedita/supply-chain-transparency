import React, { useState } from 'react';
import { supplyChainActor } from '../../utils/icp';

export default function ProductsByOwnerForm() {
  const [owner, setOwner] = useState('');
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const list = await supplyChainActor.get_products_by_owner(owner);
      setProducts(list);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h4>Products Owned</h4>
      <input className="form-control my-2" placeholder="Owner Principal" value={owner} onChange={e => setOwner(e.target.value)} />
      <button className="btn btn-outline-primary w-100 mb-2" onClick={fetchProducts}>Get Products</button>
      <ul className="list-group">
        {products.map((p, idx) => (
          <li key={idx} className="list-group-item">
            <strong>{p.name}</strong> (ID: {p.id}) – From: {p.origin}
          </li>
        ))}
      </ul>
    </div>
  );
}
