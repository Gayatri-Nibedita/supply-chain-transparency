import React from 'react';

import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';

import AddProductForm from './components/forms/AddProductForm';
import TransferOwnershipForm from './components/forms/TransferOwnershipForm';
import AddCertificationForm from './components/forms/AddCertificationForm';
import ProductsByOwnerForm from './components/forms/ProductsByOwnerForm';
import VerifyOwnershipForm from './components/forms/VerifyOwnershipForm';
import ViewHistoryForm from './components/forms/ViewHistoryForm';
import ViewProductForm from './components/forms/ViewProductForm';

function App() {
  return (
    <>
      <Navbar />
      <LandingPage />

      <div id="forms" className="container mt-5">
      <h2 className="text-center mb-4">🛠️  Supply Chain  Dashboard</h2>
      <AddProductForm />
      <TransferOwnershipForm />
      <AddCertificationForm />
      <ProductsByOwnerForm />
      <VerifyOwnershipForm />
      <ViewHistoryForm />
      <ViewProductForm />
    </div>
    </>
  );
}

export default App;
