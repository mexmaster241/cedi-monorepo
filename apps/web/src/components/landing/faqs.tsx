'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CardContainer, CardBody, CardItem } from '../ui/3d-card';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "¿Cómo puedo empezar a usar Cedi?",
    answer: "Para comenzar, simplemente regístrate en nuestra plataforma proporcionando la información básica de tu negocio. Una vez verificada tu cuenta, podrás acceder a todas nuestras herramientas financieras."
  },
  {
    question: "¿Qué tipos de pagos puedo aceptar?",
    answer: "Con Cedi, puedes aceptar pagos con tarjetas de crédito y débito, transferencias bancarias, pagos con CoDi, y más. Nuestra plataforma está diseñada para adaptarse a las necesidades de tu negocio."
  },
  {
    question: "¿Cuáles son las comisiones por transacción?",
    answer: "Nuestras comisiones son transparentes y competitivas. Varían según el volumen de transacciones y el tipo de pago. Contáctanos para obtener una cotización personalizada para tu negocio."
  },
  {
    question: "¿Qué medidas de seguridad implementan?",
    answer: "Implementamos los más altos estándares de seguridad en la industria, incluyendo encriptación de datos, autenticación de dos factores y monitoreo continuo de transacciones para proteger tu negocio."
  }
];

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="container py-12 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-4 sm:px-6">
        {/* Left Column - Title and FAQs */}
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl font-clash-display leading-tight">
              Moderniza tu negocio con Cedi
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground font-clash-display">
              Encuentra respuestas a las preguntas más comunes sobre nuestros servicios y cómo podemos ayudar a tu negocio.
            </p>
          </div>

          {/* FAQs */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4 sm:p-6 bg-card hover:bg-accent text-left"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <span className="font-clash-display text-base sm:text-lg pr-4">{faq.question}</span>
                  <span className="transform transition-transform duration-200 text-xl sm:text-2xl flex-shrink-0">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4 sm:p-6 bg-card/50 font-clash-display text-sm sm:text-base text-muted-foreground">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - 3D Card */}
        <div className="flex items-center justify-center mt-8 lg:mt-0">
          <CardContainer className="font-clash-display">
            <CardBody className="bg-card relative group/card dark:hover:shadow-2xl dark:hover:shadow-primary/[0.1] border-border w-full max-w-[320px] sm:max-w-[400px] h-auto rounded-xl p-4 sm:p-6 border">
              <CardItem
                translateZ="50"
                className="text-lg sm:text-xl font-clash-display text-foreground"
              >
                Centraliza tus finanzas
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-sm sm:text-base text-muted-foreground max-w-sm mt-2 font-clash-display"
              >
                Descubre cómo Cedi puede ayudarte a gestionar mejor tus finanzas empresariales
              </CardItem>
              <CardItem
                translateZ="100"
                rotateX={20}
                rotateZ={-10}
                className="w-full mt-4"
              >
                <Image
                  src="/foto-restaurante.jpg"
                  height={400}
                  width={600}
                  className="h-48 sm:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="Dashboard Preview"
                />
              </CardItem>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-8 sm:mt-12">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-clash-display text-foreground hover:bg-accent"
                >
                  Conoce más →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-clash-display hover:bg-primary/90"
                >
                  Comienza ahora
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </section>
  );
}