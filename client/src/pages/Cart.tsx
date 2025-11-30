import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { X, Minus, Plus, ArrowRight } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { useState, useEffect } from 'react';

// Mock cart data initialized with a few items
const initialCartItems = [
  { productId: 1, quantity: 1 },
  { productId: 3, quantity: 1 },
];

export default function Cart() {
  const { products, collections } = useProducts();
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Enrich cart items with product data from context
  const enrichedCartItems = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return product ? { ...item, product } : null;
  }).filter(item => item !== null) as { productId: number, quantity: number, product: any }[];

  const updateQuantity = (productId: number, delta: number) => {
    setCartItems(items => items.map(item => {
      if (item.productId === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (productId: number) => {
    setCartItems(items => items.filter(item => item.productId !== productId));
  };

  const subtotal = enrichedCartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-4xl mb-12 text-center">Sua Sacola</h1>

        {enrichedCartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">Sua sacola está vazia.</p>
            <Link href="/shop">
              <Button className="rounded-none uppercase tracking-widest">Continuar Comprando</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="border-b border-border pb-4 mb-4 hidden md:flex text-xs uppercase tracking-widest text-muted-foreground">
                <div className="flex-1">Produto</div>
                <div className="w-32 text-center">Quantidade</div>
                <div className="w-32 text-right">Total</div>
                <div className="w-12"></div>
              </div>

              <div className="space-y-8">
                {enrichedCartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="flex flex-col md:flex-row items-center gap-6 border-b border-border pb-8 md:pb-4 md:border-none">
                    <div className="w-full md:flex-1 flex items-center gap-6">
                      <div className="h-24 w-24 bg-secondary/20 overflow-hidden shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-xs text-primary uppercase tracking-wider mb-1">{collections.find(c => c.id === product.collectionId)?.name || ''}</div>
                        <h3 className="font-serif text-lg">{product.name}</h3>
                        <p className="text-sm text-muted-foreground md:hidden mt-1">R$ {product.price.toLocaleString('pt-BR')}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-6 md:gap-0">
                      <div className="flex items-center border border-input">
                        <button onClick={() => updateQuantity(product.id, -1)} className="p-2 hover:bg-secondary transition-colors"><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-sm">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, 1)} className="p-2 hover:bg-secondary transition-colors"><Plus className="h-3 w-3" /></button>
                      </div>

                      <div className="w-32 text-right font-medium hidden md:block">
                        R$ {(product.price * quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>

                      <button onClick={() => removeItem(product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="w-full lg:w-96 bg-secondary/20 p-8 h-fit">
              <h3 className="font-serif text-xl mb-6">Resumo do Pedido</h3>
              <div className="space-y-4 text-sm mb-8">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full rounded-none h-12 bg-black text-white hover:bg-primary uppercase tracking-widest flex items-center justify-center gap-2">
                  Finalizar Compra <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
