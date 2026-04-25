export default function CouponsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Cupones</h2>
          <p className="text-neutral-500 mt-1">Gestión de códigos de descuento promocionales.</p>
        </div>
        <button className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-95">
          + Nuevo Cupón
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 text-sm font-semibold text-neutral-500">
              <th className="py-4 px-4">Código</th>
              <th className="py-4 px-4">Descuento</th>
              <th className="py-4 px-4">Válido Hasta</th>
              <th className="py-4 px-4">Uso</th>
              <th className="py-4 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-100 dark:border-neutral-800/50 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-colors">
              <td className="py-4 px-4 text-neutral-400">Sin datos</td>
              <td className="py-4 px-4 text-neutral-400">...</td>
              <td className="py-4 px-4 text-neutral-400">...</td>
              <td className="py-4 px-4 text-neutral-400">...</td>
              <td className="py-4 px-4 text-neutral-400 text-right">...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
