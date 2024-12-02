'use client'

import { useState } from 'react'
import { IconSend } from '@tabler/icons-react'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Add form submission logic here
    setTimeout(() => setIsSubmitting(false), 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-clash-display text-gray-700 dark:text-gray-300 mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-clash-display text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-clash-display text-gray-700 dark:text-gray-300 mb-2">
          Empresa
        </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="revenue" className="block text-sm font-clash-display text-gray-700 dark:text-gray-300 mb-2">
          Facturación Anual
        </label>
        <select
          id="revenue"
          name="revenue"
          required
          className="w-full px-4 py-3 font-clash-display rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent appearance-none"
        >
          <option className="font-clash-display" value="">Selecciona un rango</option>
          <option className="font-clash-display" value="0-1M">Menos de $1M MXN</option>
          <option className="font-clash-display" value="1M-5M">$1M - $5M MXN</option>
          <option className="font-clash-display" value="5M-10M">$5M - $10M MXN</option>
          <option className="font-clash-display" value="10M-50M">$10M - $50M MXN</option>
          <option className="font-clash-display" value="50M+">Más de $50M MXN</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-clash-display text-gray-700 dark:text-gray-300 mb-2">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-cedi-black text-white py-3 px-6 rounded-lg font-clash-display hover:bg-cedi-black/90 transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          'Enviando...'
        ) : (
          <>
            Enviar mensaje
            <IconSend className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  )
}