import { useProducts } from '@/context/ProductContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import lookbookVideo from '@assets/generated_videos/cinematic_black_and_white_jewelry_fashion_video.mp4';

export default function Lookbook() {
  const { collections } = useProducts();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={ref} className="bg-black text-white">
      <div className="h-screen flex items-center justify-center sticky top-0 overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src={lookbookVideo} type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-display text-8xl md:text-[12rem] leading-none mb-8 tracking-tighter mix-blend-difference"
          >
            LOOKBOOK
          </motion.h1>
          <p className="font-mono text-sm md:text-base uppercase tracking-[0.5em] text-white/80">
            Coleção Outono/Inverno 2026
          </p>
        </div>
      </div>

      {collections.map((collection, i) => (
        <div key={collection.id} className="min-h-screen flex items-center justify-center relative py-24 border-t border-white/10 bg-black">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`order-2 ${i % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
            >
              <span className="font-mono text-xs text-white/50 uppercase tracking-widest mb-4 block">Coleção {i + 1}</span>
              <h2 className="font-display text-6xl md:text-8xl mb-8">{collection.name}</h2>
              <p className="text-xl font-light text-white/70 leading-relaxed mb-12 max-w-md">
                {collection.description} Uma exploração de formas, texturas e a beleza intrínseca dos materiais preciosos.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className={`order-1 ${i % 2 === 0 ? 'md:order-2' : 'md:order-1'} aspect-[3/4] relative`}
            >
              <img 
                src={collection.image} 
                alt={collection.name} 
                className="w-full h-full object-cover grayscale transition-all duration-1000"
              />
            </motion.div>
          </div>
        </div>
      ))}

      <div className="h-[50vh] flex items-center justify-center bg-white text-black">
        <div className="text-center">
          <h2 className="font-display text-6xl mb-8">Descubra ZK REZK</h2>
          <a href="/shop" className="inline-block border-b border-black pb-1 font-mono text-sm uppercase tracking-widest hover:text-black/60 transition-colors">
            Ir para a Loja
          </a>
        </div>
      </div>
    </div>
  );
}
