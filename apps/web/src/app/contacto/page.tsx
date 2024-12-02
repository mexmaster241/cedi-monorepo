import { Metadata } from 'next'
import { IconBrandLinkedin, IconBrandTwitter, IconMail } from '@tabler/icons-react'
import Link from 'next/link'
import ContactForm from '@/components/contacto/contact-form'

export const metadata: Metadata = {
  title: 'Contacto | CEDI',
  description: 'Ponte en contacto con nosotros para conocer más sobre nuestras soluciones de pago.',
}

export default function ContactPage() {
  return (
    <div className="bg-cedi-beige">
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left Column - Title and Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-clash-display tracking-tight text-gray-900 dark:text-white">
              Ponte en contacto
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-clash-display">
              Estamos aquí para ayudarte. Cuéntanos sobre tu proyecto y encontraremos la mejor solución para tu empresa.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 font-clash-display">
              Síguenos en redes sociales
            </p>
            <div className="flex gap-4">
              <Link
                href="https://twitter.com"
                target="_blank"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <IconBrandTwitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <IconBrandLinkedin className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:contacto@cedi.com"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <IconMail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="bg-white dark:bg-black rounded-2xl p-8 shadow-lg">
          <ContactForm />
        </div>
      </div>
      </div>
    </div>
  )
}