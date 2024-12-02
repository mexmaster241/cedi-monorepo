const QUICK_ACTIONS = ['Enviar', 'Recibir'] as const;

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-8">
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action}
          className="p-4 bg-cedi-light-gray dark:bg-gray-800 rounded-lg shadow-md hover:bg-cedi-dark-gray hover:shadow-lg transition-all group"
        >
          <span className="block text-center text-gray-900 dark:text-white font-clash-display group-hover:text-white transition-colors">
            {action}
          </span>
        </button>
      ))}
    </div>
  );
}
