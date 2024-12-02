import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-cedi-dark-gray text-white">
      <div className="flex h-full items-center px-6">
        <div className="container mx-auto">
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {/* Logo and Description */}
              <div className="col-span-1 md:col-span-2 text-center md:text-left">
                <Image
                  src="/logotipo-white.png"
                  alt="Cedi"
                  width={120}
                  height={40}
                  className="mb-4 mx-auto md:mx-0"
                />
                <p className="text-gray-400 font-clash-display mt-4 max-w-sm mx-auto md:mx-0">
                  Centraliza tu dinero en un solo lugar y ten un mejor control de las finanzas de tu empresa.
                </p>
              </div>

              {/* Products */}
              <div className="text-center md:text-left">
                <h3 className="font-clash-display text-lg mb-4">Productos</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white font-clash-display">
                      Transferencias
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white font-clash-display">
                      MiPOS
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white font-clash-display">
                      E-commerce
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div className="text-center md:text-left">
                <h3 className="font-clash-display text-lg mb-4">Compañía</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white font-clash-display">
                      Acerca de
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white font-clash-display">
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white font-clash-display">
                      Soporte
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-700 mt-8 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400 font-clash-display text-sm text-center md:text-left">
                  © 2024 Cedi. Todos los derechos reservados.
                </p>
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
                  <Link href="#" className="text-gray-400 hover:text-white font-clash-display text-sm text-center md:text-left whitespace-nowrap">
                    Términos y condiciones
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white font-clash-display text-sm text-center md:text-left">
                    Privacidad
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}