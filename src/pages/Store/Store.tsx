import React, { useState, useEffect } from 'react';
import * as S from './styles';

// Define interfaces based on Fourthwall API
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: Array<{url: string}>;
  variants: Array<{
    id: string;
    price: {
      amount: number;
      currency: string;
    };
  }>;
}

export const Store: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<{id: string, name: string, slug: string}[]>([]);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get environment variables with NO fallbacks
  const STOREFRONT_TOKEN = process.env.REACT_APP_FOURTHWALL_STOREFRONT_TOKEN;
  const CURRENCY = process.env.REACT_APP_FOURTHWALL_CURRENCY;
  const STORE_URL = process.env.REACT_APP_FOURTHWALL_STORE_URL;
  
  useEffect(() => {
    // Validate environment variables first
    if (!STOREFRONT_TOKEN || !CURRENCY || !STORE_URL) {
      setError('Missing environment variables. Please check your configuration.');
      setLoading(false);
      return;
    }
    
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch collections first
        const collectionsResponse = await fetch(
          `https://storefront-api.fourthwall.com/v1/collections?storefront_token=${STOREFRONT_TOKEN}`, 
          { headers: { 'Accept': 'application/json' } }
        );
        
        if (!collectionsResponse.ok) {
          throw new Error(`Collections API returned status ${collectionsResponse.status}`);
        }
        
        const collectionsData = await collectionsResponse.json();
        setCollections(collectionsData.results || []);
        
        // If we have collections, set the first one as active and fetch its products
        if (collectionsData.results && collectionsData.results.length > 0) {
          const firstCollection = collectionsData.results[0];
          setActiveCollection(firstCollection.slug);
          await fetchProductsByCollection(firstCollection.slug);
        } else {
          // Otherwise, just fetch all products
          await fetchAllProducts();
        }
        
      } catch (err) {
        console.error('Error initializing store:', err);
        setError('Failed to load store data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, [STOREFRONT_TOKEN, CURRENCY, STORE_URL]);
  
  const fetchAllProducts = async () => {
    try {
      const productsResponse = await fetch(
        `https://storefront-api.fourthwall.com/v1/products?storefront_token=${STOREFRONT_TOKEN}&currency=${CURRENCY}`, 
        { headers: { 'Accept': 'application/json' } }
      );
      
      if (!productsResponse.ok) {
        throw new Error(`Products API returned status ${productsResponse.status}`);
      }
      
      const productsData = await productsResponse.json();
      setProducts(productsData.results || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    }
  };
  
  const fetchProductsByCollection = async (collectionSlug: string) => {
    try {
      const productsResponse = await fetch(
        `https://storefront-api.fourthwall.com/v1/collections/${collectionSlug}/products?storefront_token=${STOREFRONT_TOKEN}&currency=${CURRENCY}`, 
        { headers: { 'Accept': 'application/json' } }
      );
      
      if (!productsResponse.ok) {
        throw new Error(`Collection products API returned status ${productsResponse.status}`);
      }
      
      const productsData = await productsResponse.json();
      setProducts(productsData.results || []);
    } catch (err) {
      console.error(`Error fetching products for collection ${collectionSlug}:`, err);
      setError('Failed to load collection products. Please try again later.');
    }
  };
  
  const handleCollectionChange = async (collectionSlug: string) => {
    setActiveCollection(collectionSlug);
    setLoading(true);
    await fetchProductsByCollection(collectionSlug);
    setLoading(false);
  };
  
  const getProductUrl = (productSlug: string) => {
    if (!STORE_URL) return '#';
    return `${STORE_URL}/products/${productSlug}`;
  };
  
  return (
    <S.Container>
      <S.Header>
        <S.Title>Shop</S.Title>
        <S.Description>
          Support my work with exclusive merch and products
        </S.Description>
        
        {collections.length > 0 && (
          <S.CollectionsNav>
            {collections.map(collection => (
              <S.CollectionButton 
                key={collection.slug}
                $isActive={activeCollection === collection.slug}
                onClick={() => handleCollectionChange(collection.slug)}
              >
                {collection.name}
              </S.CollectionButton>
            ))}
          </S.CollectionsNav>
        )}
      </S.Header>
      
      {loading ? (
        <S.LoadingWrapper>
          <S.LoadingCircle />
          <div>Loading products...</div>
        </S.LoadingWrapper>
      ) : error ? (
        <S.ErrorWrapper>
          <div>{error}</div>
        </S.ErrorWrapper>
      ) : products.length === 0 ? (
        <S.EmptyState>
          <i className='bx bx-shopping-bag' style={{ fontSize: '3rem' }}></i>
          <div>No products available.</div>
        </S.EmptyState>
      ) : (
        <S.ProductsGrid>
          {products.map(product => (
            <S.ProductCard 
              key={product.id}
              as="a" 
              href={getProductUrl(product.slug)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <S.ProductImageWrapper>
                {product.images && product.images.length > 0 ? (
                  <S.ProductImage 
                    style={{ backgroundImage: `url(${product.images[0].url})` }} 
                  />
                ) : (
                  <S.PlaceholderImage>
                    <i className='bx bx-image'></i>
                  </S.PlaceholderImage>
                )}
              </S.ProductImageWrapper>
              
              <S.ProductContent>
                <S.ProductTitle>{product.name}</S.ProductTitle>
                
                <S.PriceButtonContainer>
                  <S.ViewButton>
                    <span>View Product</span>
                    <i className='bx bx-right-arrow-alt'></i>
                  </S.ViewButton>
                </S.PriceButtonContainer>
              </S.ProductContent>
            </S.ProductCard>
          ))}
        </S.ProductsGrid>
      )}
      
      <S.StoreFooter>
        <S.ViewStoreButton 
          href={STORE_URL || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Full Store
          <i className='bx bx-store'></i>
        </S.ViewStoreButton>
      </S.StoreFooter>
    </S.Container>
  );
};

export default Store;