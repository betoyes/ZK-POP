import { Link } from 'wouter';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          
          {/* Brand / Big Logo */}
          <div className="md:col-span-6 flex flex-col justify-between h-full">
            <div className="font-display text-[10vw] leading-[0.8] font-bold tracking-tighter opacity-10 select-none">
              ZK REZK
            </div>
            <div className="mt-8 max-w-sm">
              <p className="font-mono text-xs text-muted-foreground uppercase leading-relaxed">
                Criamos objetos de desejo para o mundo moderno. <br/>
                Design atemporal encontra atitude contemporânea.
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest mb-8 text-muted-foreground">Loja</h4>
            <ul className="space-y-4">
              <li><Link href="/shop?category=aneis" className="font-display text-xl hover:text-muted-foreground transition-colors">Anéis</Link></li>
              <li><Link href="/shop?category=colares" className="font-display text-xl hover:text-muted-foreground transition-colors">Colares</Link></li>
              <li><Link href="/shop?category=brincos" className="font-display text-xl hover:text-muted-foreground transition-colors">Brincos</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest mb-8 text-muted-foreground">Empresa</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="font-display text-xl hover:text-muted-foreground transition-colors">Manifesto</Link></li>
              <li><Link href="/contact" className="font-display text-xl hover:text-muted-foreground transition-colors">Contato</Link></li>
              <li><Link href="/admin" className="font-display text-xl hover:text-muted-foreground transition-colors">Admin</Link></li>
            </ul>
          </div>
          
           <div className="md:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest mb-8 text-muted-foreground">Social</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-display text-xl hover:text-muted-foreground transition-colors">Instagram</a></li>
              <li><a href="#" className="font-display text-xl hover:text-muted-foreground transition-colors">Twitter</a></li>
              <li><a href="#" className="font-display text-xl hover:text-muted-foreground transition-colors">TikTok</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          <p>&copy; 2026 ZK REZK JEWELRY. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-foreground">Política de Privacidade</Link>
            <Link href="/terms-of-use" className="hover:text-foreground">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
