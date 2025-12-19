import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Loader2, CheckCircle, XCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function VerifyEmail() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Token de verificação não encontrado.");
      return;
    }

    fetch(`/api/auth/verify-email?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.message);
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Erro ao verificar email. Tente novamente.");
      });
  }, []);

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resendEmail) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, informe seu email.",
      });
      return;
    }

    setIsResending(true);

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resendEmail }),
      });

      const data = await res.json();
      
      setResendSuccess(true);
      toast({
        title: "Email enviado",
        description: "Se o email estiver cadastrado, você receberá um novo link de verificação.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao enviar email. Tente novamente.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200">
        <div className="text-center">
          {status === "loading" && (
            <>
              <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-gray-400" />
              <h1 className="text-2xl font-light tracking-wide mb-2">Verificando...</h1>
              <p className="text-gray-500">Aguarde enquanto verificamos seu email.</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h1 className="text-2xl font-light tracking-wide mb-2">Email Verificado!</h1>
              <p className="text-gray-500 mb-6">{message}</p>
              <Link href="/login">
                <Button 
                  className="w-full bg-black text-white hover:bg-gray-800"
                  data-testid="button-go-to-login"
                >
                  Fazer Login
                </Button>
              </Link>
            </>
          )}

          {status === "error" && !showResend && !resendSuccess && (
            <>
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <h1 className="text-2xl font-light tracking-wide mb-2">Erro na Verificação</h1>
              <p className="text-gray-500 mb-6">{message}</p>
              <div className="space-y-3">
                <Button 
                  onClick={() => setShowResend(true)}
                  className="w-full bg-black text-white hover:bg-gray-800"
                  data-testid="button-resend-verification"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Solicitar Novo Email
                </Button>
                <Link href="/login">
                  <Button 
                    variant="outline"
                    className="w-full"
                    data-testid="button-go-to-login"
                  >
                    Voltar para o Login
                  </Button>
                </Link>
              </div>
            </>
          )}

          {status === "error" && showResend && !resendSuccess && (
            <>
              <Mail className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h1 className="text-2xl font-light tracking-wide mb-2">Reenviar Verificação</h1>
              <p className="text-gray-500 mb-6">
                Informe seu email para receber um novo link de verificação.
              </p>
              <form onSubmit={handleResendVerification} className="space-y-4">
                <div className="text-left">
                  <Label htmlFor="resend-email" className="text-sm font-medium">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="resend-email"
                      type="email"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                      className="pl-10"
                      placeholder="seu@email.com"
                      data-testid="input-resend-email"
                    />
                  </div>
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800"
                  disabled={isResending}
                  data-testid="button-submit-resend"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Novo Link"
                  )}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowResend(false)}
                  data-testid="button-cancel-resend"
                >
                  Voltar
                </Button>
              </form>
            </>
          )}

          {resendSuccess && (
            <>
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h1 className="text-2xl font-light tracking-wide mb-2">Email Enviado!</h1>
              <p className="text-gray-500 mb-6">
                Se o email estiver cadastrado, você receberá um novo link de verificação. 
                Verifique também sua pasta de spam.
              </p>
              <Link href="/login">
                <Button 
                  className="w-full bg-black text-white hover:bg-gray-800"
                  data-testid="button-go-to-login"
                >
                  Voltar para o Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
