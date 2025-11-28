import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl md:text-5xl mb-8">Política de Privacidade</h1>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-12">
            Última atualização: Novembro 2026
          </p>

          <div className="space-y-12 font-light leading-relaxed text-muted-foreground">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">1. Coleta de Informações</h2>
              <p>
                Coletamos informações que você nos fornece diretamente ao fazer uma compra, criar uma conta, 
                se inscrever em nossa newsletter ou entrar em contato conosco. As informações podem incluir seu nome, 
                endereço de e-mail, endereço postal, número de telefone e informações de pagamento.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">2. Uso das Informações</h2>
              <p>
                Utilizamos as informações coletadas para processar suas transações, enviar confirmações de pedidos, 
                responder às suas solicitações de atendimento ao cliente e enviar atualizações sobre nossos produtos e serviços.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">3. Compartilhamento de Dados</h2>
              <p>
                Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros, exceto quando necessário 
                para fornecer nossos serviços (como processadores de pagamento e empresas de transporte) ou conforme exigido por lei.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-4">4. Segurança</h2>
              <p>
                Implementamos medidas de segurança para manter a segurança de suas informações pessoais. 
                Seus dados de pagamento são processados através de gateways seguros e não são armazenados em nossos servidores.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
