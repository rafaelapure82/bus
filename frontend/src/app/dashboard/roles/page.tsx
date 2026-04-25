export default function RolesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Gestión de Roles</h2>
          <p className="text-neutral-500 mt-1">Administra los permisos y niveles de acceso.</p>
        </div>
        <button className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-95">
          + Nuevo Rol
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 text-sm font-semibold text-neutral-500">
              <th className="py-4 px-4">ID</th>
              <th className="py-4 px-4">Nombre del Rol</th>
              <th className="py-4 px-4">Estado</th>
              <th className="py-4 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-100 dark:border-neutral-800/50 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-colors">
              <td className="py-4 px-4">1</td>
              <td className="py-4 px-4 font-medium">Administrador Global</td>
              <td className="py-4 px-4"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Activo</span></td>
              <td className="py-4 px-4 text-right text-primary hover:underline cursor-pointer">Editar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
