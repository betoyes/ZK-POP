import { motion } from 'framer-motion';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl md:text-5xl mb-8">Termos de Uso</h1>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-12">
            Última atualização: Novembro 2026
          </p>

          <div className="space-y-12 font-light leading-relaxed text-muted-foreground">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar o site da ZK REZK, você aceita e concorda em estar vinculado a estes Termos de Uso. 
                Se você não concordar com estes termos, não deve usar nosso site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">2. Produtos e Serviços</h2>
              <p>
                Todos os produtos estão sujeitos à disponibilidade. Reservamo-nos o direito de limitar as quantidades 
                de qualquer produto ou serviço que oferecemos. Todas as descrições de produtos ou preços de produtos 
                estão sujeitos a alterações a qualquer momento sem aviso prévio.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">3. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo incluído neste site, como texto, gráficos, logotipos, imagens e software, 
                é propriedade da ZK REZK ou de seus fornecedores de conteúdo e protegido pelas leis de direitos autorais.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">4. Limitação de Responsabilidade</h2>
              <p>
                A ZK REZK não será responsável por quaisquer danos diretos, indiretos, incidentais, punitivos 
                ou consequentes decorrentes do uso ou da incapacidade de usar nossos produtos ou serviços.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
