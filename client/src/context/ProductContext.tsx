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
  
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  
  addCollection: (collection: Omit<Collection, 'id'>) => Promise<void>;
  deleteCollection: (id: number) => Promise<void>;
  
  addPost: (post: Omit<JournalPost, 'id' | 'date'>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  updatePost: (id: number, post: Partial<JournalPost>) => Promise<void>;
  
  updateOrder: (id: string, status: string) => void;
  toggleWishlist: (productId: number) => void;
  updateBranding: (newBranding: Partial<Branding>) => Promise<void>;
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

  // Products - now persisted to backend
  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newProduct)
      });
      if (response.ok) {
        const product = await response.json();
        setProducts(prev => [...prev, product]);
      } else {
        console.error('Failed to add product:', await response.text());
      }
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  const updateProduct = async (id: number, updatedFields: Partial<Product>) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedFields)
      });
      if (response.ok) {
        const updated = await response.json();
        setProducts(prev => prev.map(p => (p.id === id ? updated : p)));
      } else {
        console.error('Failed to update product:', await response.text());
      }
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      } else {
        console.error('Failed to delete product:', await response.text());
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  // Categories - now persisted to backend
  const addCategory = async (newCategory: Omit<Category, 'id'>) => {
    try {
      const slug = newCategory.name.toLowerCase().replace(/\s+/g, '-');
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...newCategory, slug })
      });
      if (response.ok) {
        const category = await response.json();
        setCategories(prev => [...prev, category]);
      } else {
        console.error('Failed to add category:', await response.text());
      }
    } catch (err) {
      console.error('Failed to add category:', err);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        setCategories(prev => prev.filter(c => c.id !== id));
      } else {
        console.error('Failed to delete category:', await response.text());
      }
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  // Collections - now persisted to backend
  const addCollection = async (newCollection: Omit<Collection, 'id'>) => {
    try {
      const slug = newCollection.name.toLowerCase().replace(/\s+/g, '-');
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          ...newCollection, 
          slug,
          image: newCollection.image || ringImage 
        })
      });
      if (response.ok) {
        const collection = await response.json();
        setCollections(prev => [...prev, collection]);
      } else {
        console.error('Failed to add collection:', await response.text());
      }
    } catch (err) {
      console.error('Failed to add collection:', err);
    }
  };

  const deleteCollection = async (id: number) => {
    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        setCollections(prev => prev.filter(c => c.id !== id));
      } else {
        console.error('Failed to delete collection:', await response.text());
      }
    } catch (err) {
      console.error('Failed to delete collection:', err);
    }
  };
  
  // Posts - now persisted to backend
  const addPost = async (newPost: Omit<JournalPost, 'id' | 'date'>) => {
    try {
      const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...newPost, date })
      });
      if (response.ok) {
        const post = await response.json();
        setPosts(prev => [...prev, post]);
      } else {
        console.error('Failed to add post:', await response.text());
      }
    } catch (err) {
      console.error('Failed to add post:', err);
    }
  };

  const deletePost = async (id: number) => {
    try {
      const response = await fetch(`/api/journal/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        setPosts(prev => prev.filter(p => p.id !== id));
      } else {
        console.error('Failed to delete post:', await response.text());
      }
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  const updatePost = async (id: number, updatedFields: Partial<JournalPost>) => {
    try {
      const response = await fetch(`/api/journal/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedFields)
      });
      if (response.ok) {
        const updated = await response.json();
        setPosts(prev => prev.map(p => (p.id === id ? updated : p)));
      } else {
        console.error('Failed to update post:', await response.text());
      }
    } catch (err) {
      console.error('Failed to update post:', err);
    }
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
