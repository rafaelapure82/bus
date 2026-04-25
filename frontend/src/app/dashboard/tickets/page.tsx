export default function TicketsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Venta de Boletos</h2>
          <p className="text-neutral-500 mt-1">Gestión de reservas, pasajeros y emisión de billetes.</p>
        </div>
        <button className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-95">
          + Emitir Boleto
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 text-sm font-semibold text-neutral-500">
              <th className="py-4 px-4">PNR / Reserva</th>
              <th className="py-4 px-4">Pasajero</th>
              <th className="py-4 px-4">Viaje</th>
              <th className="py-4 px-4">Estado</th>
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
