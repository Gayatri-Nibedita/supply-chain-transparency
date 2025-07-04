import React, { useState } from 'react';
import { supplyChainActor } from '../../utils/icp';

export default function ViewProductForm() {
  const [id, setId] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const fetchDetails = async () => {
    try {
      const result = await supplyChainActor.get_product(id);
      if ('Ok' in result) {
        setProduct(result.Ok);
        setError('');
      } else {
        setError(result.Err);
        setProduct(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h4>Product Details</h4>
      <input className="form-control my-2" placeholder="Product ID" value={id} onChange={e => setId(e.target.value)} />
      <button className="btn btn-dark w-100 mb-2" onClick={fetchDetails}>Get Product</button>
      {error && <p className="text-danger text-center">{error}</p>}
      {product && (
        <div>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Origin:</strong> {product.origin}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Owner:</strong> {product.current_owner}</p>
          <p><strong>Certifications:</strong> {product.certifications.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
