'use client';

import { useState } from 'react';
import EditAccountForm from './EditForm/editAccountForm';
import CreateProductForm from './CreateForm/createProductForm';
import UserReviewsTable from '@/components/reviewList/reviewList';
// Import your component to view products here, e.g.:
import SellerProductsList from './ViewProducts/SellerProductsList'; // hypothetical component
import './AccountPage.css';

interface AccountPageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export default function ClientAccountPage({ user }: AccountPageProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showViewProducts, setShowViewProducts] = useState(false);

  const handleToggleEdit = () => setShowEdit((prev) => !prev);
  const handleToggleCreateProduct = () => setShowCreateProduct((prev) => !prev);
  const handleToggleViewProducts = () => setShowViewProducts((prev) => !prev);

  return (
    <div className='account-page'>
      <div className='account-container'>
        <h1 className='account-title'>My Account</h1>

        {/* 1. Current Information */}
        <section className='account-section'>
          <h2>Current Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role.toUpperCase().slice(0, 1) + user.role.slice(1)}</p>
        </section>

        {/* 2. Edit Account Info */}
        <section className='account-section'>
          <h2>Edit Your Info</h2>
          <button onClick={handleToggleEdit}>
            {showEdit ? 'Cancel' : 'Edit Account Info'}
          </button>
          {showEdit && (
            <EditAccountForm
              initialData={{
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              }}
            />
          )}
        </section>

        {/* 3. Create Product — Only for sellers */}
        {user.role === 'seller' && (
          <section className='account-section'>
            <h2>Create Product</h2>
            <button onClick={handleToggleCreateProduct}>
              {showCreateProduct ? 'Cancel' : 'Add New Product'}
            </button>
            {showCreateProduct && (
              <CreateProductForm sellerId={user.id} sellerName={user.name} />
            )}
          </section>
        )}

        {/* 4. View Products — Only for sellers */}
        {user.role === 'seller' && (
          <section className='account-section'>
            <h2>View Products</h2>
            <button onClick={handleToggleViewProducts}>
              {showViewProducts ? 'Hide Products' : 'Show My Products'}
            </button>
            {showViewProducts && (
              <SellerProductsList sellerId={user.id} />
            )}
          </section>
        )}

        {/* 5. User Reviews */}
        <section className='account-section'>
          <h2>Your Reviews</h2>
          <UserReviewsTable userId={user.id} />
        </section>
      </div>
    </div>
  );
}