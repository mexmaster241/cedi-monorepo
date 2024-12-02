import { IconCreditCard, IconReceipt, IconCash, IconQrcode } from '@tabler/icons-react'

export default function MiniPOSCard() {
  return (
    <div className="w-full bg-white rounded-xl">
      {/* Receipt Header */}
      <div className="border-b p-4">
        <div className="text-center space-y-1">
          <h3 className="font-clash-display">CEDI POS</h3>
          <p className="text-xs font-clash-display text-gray-500">Orden #2024-0123</p>
        </div>
      </div>

      {/* Items List */}
      <div className="p-4 space-y-3 border-b">
        <div className="flex justify-between text-sm">
          <div>
            <p className="font-clash-display">Producto A</p>
            <p className="text-xs font-clash-display text-gray-500">2 x $25.00</p>
          </div>
          <span className="font-medium">$50.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <div>
            <p className="font-clash-display">Producto B</p>
            <p className="text-xs font-clash-display text-gray-500">1 x $30.00</p>
          </div>
          <span className="font-medium">$30.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <div>
            <p className="font-clash-display">Producto C</p>
            <p className="text-xs font-clash-display text-gray-500">3 x $15.00</p>
          </div>
          <span className="font-medium">$45.00</span>
        </div>
      </div>

      {/* Total Section */}
      <div className="p-4 border-b space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-clash-display">Subtotal</span>
          <span>$125.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-clash-display">IVA (16%)</span>
          <span>$20.00</span>
        </div>
        <div className="flex justify-between font-bold mt-2">
          <span className="font-clash-display">Total</span>
          <span>$145.00</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-4">
        <p className="text-sm font-clash-display mb-3">Método de Pago</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
            <IconCreditCard className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-clash-display text-blue-600">Tarjeta</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
            <IconQrcode className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-clash-display text-purple-600">QR</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
            <IconCash className="w-5 h-5 text-green-600" />
            <span className="text-sm font-clash-display text-green-600">Efectivo</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
            <IconReceipt className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-clash-display text-orange-600">Factura</span>
          </button>
        </div>
      </div>
    </div>
  )
}