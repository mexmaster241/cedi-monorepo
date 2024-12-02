import { CheckCircle2, AlertCircle, Clock } from "lucide-react"

interface Transaction {
  producto: string;
  tipo: string;
  estatus: string;
  monto: number;
  date: string;
}

const getStatusIcon = (status: string) => {
  switch(status.toLowerCase()) {
    case 'completado':
      return <CheckCircle2 className="w-5 h-5 text-green-600" />
    case 'procesando':
      return <Clock className="w-5 h-5 text-orange-600" />
    case 'fallido':
      return <AlertCircle className="w-5 h-5 text-red-600" />
    default:
      return <Clock className="w-5 h-5 text-gray-600" />
  }
}

const getStatusColor = (status: string) => {
  switch(status.toLowerCase()) {
    case 'completado':
      return 'text-green-600 group-hover:text-green-400'
    case 'procesando':
      return 'text-orange-600 group-hover:text-orange-400'
    case 'fallido':
      return 'text-red-600 group-hover:text-red-400'
    default:
      return 'text-gray-600 group-hover:text-gray-400'
  }
}

export function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="bg-cedi-light-gray dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mt-4">
      <h2 className="text-lg font-clash-display font-semibold mb-4 text-gray-900 dark:text-white">
        Transacciones Recientes
      </h2>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div 
            key={index} 
            className="flex flex-col sm:flex-row justify-between border-b border-gray-200 dark:border-gray-700 pb-4 hover:bg-cedi-dark-gray group transition-all rounded-lg p-2 cursor-pointer"
          >
            {/* Mobile View */}
            <div className="block sm:hidden space-y-2 w-full">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Producto</p>
                  <p className="text-gray-900 dark:text-white group-hover:text-white font-clash-display">
                    {transaction.producto}
                  </p>
                </div>
                <span
                  className={`font-clash-display whitespace-nowrap ${
                    transaction.monto > 0 
                      ? 'text-green-600 group-hover:text-green-400' 
                      : 'text-red-600 group-hover:text-red-400'
                  }`}
                >
                  ${Math.abs(transaction.monto).toFixed(2)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tipo</p>
                  <p className="text-gray-900 dark:text-white group-hover:text-white font-clash-display">
                    {transaction.tipo}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Estatus</p>
                  <div className="flex items-center mt-1">
                    {getStatusIcon(transaction.estatus)}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fecha</p>
                  <p className="text-gray-900 dark:text-white group-hover:text-white font-clash-display">
                    {transaction.date}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:grid grid-cols-4 gap-4 flex-grow mr-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Producto</p>
                <p className="text-gray-900 dark:text-white group-hover:text-white font-clash-display">
                  {transaction.producto}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tipo</p>
                <p className="text-gray-900 dark:text-white group-hover:text-white font-clash-display">
                  {transaction.tipo}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Estatus</p>
                <p className={`font-clash-display ${getStatusColor(transaction.estatus)}`}>
                  {transaction.estatus}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fecha</p>
                <p className="text-gray-900 dark:text-white group-hover:text-white font-clash-display">
                  {transaction.date}
                </p>
              </div>
            </div>
            <span
              className={`hidden sm:block font-clash-display whitespace-nowrap ${
                transaction.monto > 0 
                  ? 'text-green-600 group-hover:text-green-400' 
                  : 'text-red-600 group-hover:text-red-400'
              }`}
            >
              ${Math.abs(transaction.monto).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
