import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/definitions';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Handle missing images
  const firstImage =
    product.images?.length > 0
      ? product.images[0]
      : '/placeholder-image/placeholder-image.jpg';

  return (
    <div className="product-card-container">
      <div className="product-card">
        <Image
          src={firstImage}
          alt={product.name}
          className="product-image"
          width={300}
          height={300}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              '/placeholder-image/placeholder-image.jpg';
          }}
        />
        {product.featured && <span className="featured-badge">Featured</span>}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-seller">by {product.seller_name}</p>

        <div className="product-rating">
          {/* Star rating */}
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
            >
              ★
            </span>
          ))}
          <span className="rating-value">{product.rating.toFixed(1)}</span>
        </div>

        <Link href={`/product/${product.id}`} className="view-product-btn">
          View Product
        </Link>
      </div>
    </div>
  );
}