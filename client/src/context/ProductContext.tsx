import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, products as initialProducts, Category, categories as initialCategories, Collection, collections as initialCollections, Branding, initialBranding, JournalPost, initialPosts } from '@/lib/mockData';
import ringImage from '@assets/generated_images/diamond_ring_product_shot.png';

interface ProductContextType {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  orders: any[];
  customers: any[];
  posts: JournalPost[];
  wishlist: number[];
  branding: Branding;
  
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  
  addCollection: (collection: Omit<Collection, 'id'>) => void;
  deleteCollection: (id: string) => void;
  
  addPost: (post: Omit<JournalPost, 'id' | 'date'>) => void;
  deletePost: (id: number) => void;
  updatePost: (id: number, post: Partial<JournalPost>) => void;
  
  updateOrder: (id: string, status: string) => void;
  toggleWishlist: (productId: number) => void;
  updateBranding: (newBranding: Partial<Branding>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [orders, setOrders] = useState<any[]>([]);
  const [customers] = useState<any[]>([]);
  const [posts, setPosts] = useState<JournalPost[]>(initialPosts);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [branding, setBranding] = useState<Branding>(initialBranding);

  // Load data from server on mount
  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()).then(data => setProducts(data || [])).catch(() => setProducts([])),
      fetch('/api/categories').then(r => r.json()).then(data => setCategories(data || [])).catch(() => setCategories([])),
      fetch('/api/collections').then(r => r.json()).then(data => setCollections(data || [])).catch(() => setCollections([])),
      fetch('/api/journal').then(r => r.json()).then(data => setPosts(data || [])).catch(() => setPosts([])),
      fetch('/api/branding').then(r => r.json()).then(data => setBranding(data || initialBranding)).catch(() => setBranding(initialBranding)),
    ]).catch(err => console.error('Failed to load initial data:', err));
  }, []);

  // Branding
  const updateBranding = async (newBranding: Partial<Branding>) => {
    try {
      const response = await fetch('/api/branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBranding)
      });
      if (response.ok) {
        const data = await response.json();
        setBranding(data);
      }
    } catch (err) {
      console.error('Failed to update branding:', err);
      setBranding(prev => ({ ...prev, ...newBranding }));
    }
  };

  // Products
  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts([...products, { ...newProduct, id }]);
  };

  const updateProduct = (id: number, updatedFields: Partial<Product>) => {
    setProducts(products.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Categories
  const addCategory = (newCategory: Omit<Category, 'id'>) => {
    const id = newCategory.name.toLowerCase().replace(/\s+/g, '-');
    setCategories([...categories, { ...newCategory, id }]);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  // Collections
  const addCollection = (newCollection: Omit<Collection, 'id'>) => {
    const id = newCollection.name.toLowerCase().replace(/\s+/g, '-');
    // Use a placeholder image if none provided (mock behavior)
    const collectionWithImage = { 
      ...newCollection, 
      id,
      image: newCollection.image || ringImage 
    };
    setCollections([...collections, collectionWithImage]);
  };

  const deleteCollection = (id: string) => {
    setCollections(collections.filter(c => c.id !== id));
  };
  
  // Posts
  const addPost = (newPost: Omit<JournalPost, 'id' | 'date'>) => {
    const id = Math.max(...posts.map(p => p.id), 0) + 1;
    const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    setPosts([...posts, { ...newPost, id, date }]);
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const updatePost = (id: number, updatedFields: Partial<JournalPost>) => {
    setPosts(posts.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));
  };

  // Orders
  const updateOrder = (id: string, status: string) => {
    setOrders(orders.map(o => (o.id === id ? { ...o, status } : o)));
  };

  // Wishlist
  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <ProductContext.Provider value={{ 
      products, categories, collections, orders, customers, posts, wishlist,
      addProduct, updateProduct, deleteProduct,
      addCategory, deleteCategory,
      addCollection, deleteCollection,
      addPost, deletePost, updatePost,
      updateOrder, toggleWishlist,
      branding, updateBranding
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
