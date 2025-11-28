import { useProducts } from '@/context/ProductContext';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Wishlist() {
  const { products, wishlist, toggleWishlist } = useProducts();
  
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 border-b border-border pb-8">
           <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-4">Wishlist</h1>
           <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest max-w-md">
             Sua seleção pessoal de artefatos.
           </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24 bg-secondary/20 border border-border">
            <Heart className="h-12 w-12 mx-auto mb-6 text-muted-foreground/50" />
            <h2 className="font-display text-3xl mb-4">Sua lista está vazia</h2>
            <p className="text-muted-foreground mb-8">Explore nosso arquivo e salve seus itens favoritos.</p>
            <Link href="/shop">
              <Button className="rounded-none bg-black text-white hover:bg-primary uppercase tracking-widest font-mono text-xs h-12 px-8">
                Explorar Loja
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
            {wishlistProducts.map((product, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={product.id} 
                className="group cursor-pointer relative"
              >
                <button 
                   onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                   className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 hover:bg-black hover:text-white transition-colors rounded-none"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>

                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-[3/4] bg-secondary overflow-hidden mb-6">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display text-xl leading-none mb-2 group-hover:underline underline-offset-4 decoration-1">{product.name}</h3>
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{product.collection}</span>
                    </div>
                    <p className="font-mono text-sm">R$ {product.price.toLocaleString('pt-BR')}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
