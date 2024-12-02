'use client'

import Image from "next/image";

export function DashboardPreview() {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        {/* Background Image */}
        <Image
          src="/logotipo.png"
          alt="Dashboard background"
          fill
          className="object-cover opacity-50"
        />
  
        {/* Decorative Card */}
        <div className="absolute right-[-20%] top-1/2 transform -translate-y-1/2 w-[600px] h-[400px] rotate-[-8deg]">
          <div className="bg-white rounded-xl shadow-2xl p-6 
            transform transition-all duration-500 ease-out
            hover:rotate-[-4deg] hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
            group cursor-pointer
            motion-safe:animate-float"
          >
            {/* Card Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-1 transition-transform duration-500 group-hover:translate-x-2">
                <h3 className="font-clash-display text-xl font-bold">Dashboard</h3>
                <p className="text-gray-500 font-clash-display text-sm">Vista general de tu cuenta</p>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 transition-transform duration-300 group-hover:scale-110" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 transition-transform duration-300 group-hover:scale-110" />
                <div className="w-3 h-3 rounded-full bg-green-500 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
  
            {/* Mock Content */}
            <div className="space-y-4">
              {/* Balance Section */}
              <div className="bg-gray-50 rounded-lg p-4 transition-all duration-500 group-hover:bg-gray-100 group-hover:translate-y-[-4px]">
                <p className="text-sm text-gray-500 font-clash-display">Balance Total</p>
                <p className="text-2xl font-bold font-clash-display">$52,400.50</p>
              </div>
  
              {/* Activity Graph */}
              <div className="bg-gray-50 rounded-lg h-32 flex items-end p-4 gap-2 transition-all duration-500 group-hover:bg-gray-100">
                {[40, 70, 45, 90, 65, 85, 50].map((height, i) => (
                  <div
                    key={i}
                    className="w-full bg-cedi-black/80 rounded-t transition-all duration-300"
                    style={{ 
                      height: `${height}%`,
                      transform: `scaleY(${1})`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = `scaleY(1.1)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = `scaleY(1)`;
                    }}
                  />
                ))}
              </div>
  
              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3">
                {['Transferir', 'Pagos', 'Tarjetas'].map((action) => (
                  <div
                    key={action}
                    className="bg-gray-50 rounded-lg p-3 text-center font-clash-display text-sm
                      transition-all duration-300 
                      hover:bg-gray-100 hover:translate-y-[-2px] hover:shadow-md"
                  >
                    {action}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-cedi-beige/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cedi-beige to-transparent" />
      </div>
    )
  }