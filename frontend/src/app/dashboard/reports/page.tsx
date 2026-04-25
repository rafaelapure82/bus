export default function ReportsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Reportes y Analíticas</h2>
          <p className="text-neutral-500 mt-1">Estadísticas de ventas y ocupación de flota.</p>
        </div>
        <button className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-95">
          Exportar PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white/50 dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
          <h3 className="text-neutral-500 font-medium text-sm">Ventas Hoy</h3>
          <p className="text-3xl font-bold text-primary mt-2">$0.00</p>
        </div>
        <div className="p-6 bg-white/50 dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
          <h3 className="text-neutral-500 font-medium text-sm">Boletos Emitidos</h3>
          <p className="text-3xl font-bold text-primary mt-2">0</p>
        </div>
        <div className="p-6 bg-white/50 dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
          <h3 className="text-neutral-500 font-medium text-sm">Viajes Activos</h3>
          <p className="text-3xl font-bold text-primary mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
