import { useProducts } from '@/context/ProductContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Journal() {
  const { posts } = useProducts();

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 border-b border-border pb-8 flex flex-col md:flex-row justify-between items-end">
           <div>
             <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-4">Journal</h1>
             <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest max-w-md">
               Histórias, inspirações e o mundo Aurum.
             </p>
           </div>
           <div className="font-mono text-xs mt-4 md:mt-0">
             EDITORIAL 2025
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Featured Post */}
          <div className="lg:col-span-2 group cursor-pointer relative h-[70vh] overflow-hidden">
            <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10 transition-colors" />
            <img 
              src={posts[0].image} 
              alt={posts[0].title} 
              className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20 text-white max-w-4xl">
              <div className="font-mono text-xs uppercase tracking-widest mb-4 flex gap-4">
                <span>{posts[0].category}</span>
                <span>{posts[0].date}</span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl mb-6 leading-none">{posts[0].title}</h2>
              <p className="text-lg md:text-xl font-light text-white/90 max-w-2xl mb-8">{posts[0].excerpt}</p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none uppercase tracking-widest font-mono text-xs h-12 px-8">
                Ler Artigo
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.slice(1).map((post) => (
            <Link key={post.id} href="#" className="group block">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-secondary">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 flex justify-between">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="font-display text-2xl leading-tight mb-3 group-hover:underline underline-offset-4 decoration-1">
                {post.title}
              </h3>
              <p className="text-muted-foreground font-light line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest group-hover:gap-4 transition-all">
                Ler Mais <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
