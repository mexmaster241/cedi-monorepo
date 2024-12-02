import React from 'react';
import HeroProductos from '@/components/landing/productos/hero-productos'
import ProductFeatures from '@/components/landing/productos/product-features';

const ProductosPage = () => {

  return (
    <div className="bg-cedi-beige">
      <HeroProductos />
      <ProductFeatures />
    </div>
  );
};

export default ProductosPage;