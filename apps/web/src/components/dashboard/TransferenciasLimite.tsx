export function TransferenciasLimite({ 
  transferenciasRecibidas, 
  className
}: { 
  transferenciasRecibidas: number;
  limite?: number;
  className?: string;
}) {
  const progress = (transferenciasRecibidas / 3000000) * 100;

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full ${className}`}>
      <h2 className="text-sm font-clash-display text-gray-600 dark:text-gray-400 mb-4">
        Transferencias
      </h2>
      
      <div className="mb-4">
        <p className="text-sm font-clash-display text-gray-600 dark:text-gray-400">Transferencias recibidas</p>
        <p className="text-2xl font-clash-display text-gray-900 dark:text-white">
          ${transferenciasRecibidas.toFixed(2)}
        </p>
      </div>

      <div>
        <div className="flex justify-between font-clash-display text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Límite</span>
          <span>$3,000,000</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}