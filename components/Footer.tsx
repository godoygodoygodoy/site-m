export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Sobre o Bookshelve</h3>
            <p className="text-gray-400 text-sm">
              Plataforma completa para comprar livros e compartilhar reviews com
              a comunidade.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="/profile" className="text-gray-400 hover:text-white transition-colors">
                  Meu Perfil
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="text-gray-400 hover:text-white transition-colors">
                  Cadastro
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <p className="text-gray-400 text-sm">
              Email: contato@bookshelve.com
              <br />
              Telefone: (11) 99999-9999
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bookshelve. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
