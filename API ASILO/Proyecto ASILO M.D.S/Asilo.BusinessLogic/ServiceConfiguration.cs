
using Asilo.BusinessLogic.Services;
using Asilo.DataAccess;
using Asilo.DataAccess.Repositories;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asilo.BusinessLogic
{
    public static class ServiceConfiguration
    {
        public static void DataAccess(this IServiceCollection service, string connectionString)
        {
            #region Acceso
            service.AddScoped<UsuariosRepository>();
            service.AddScoped<PantallasRepository>();
            service.AddScoped<RolesRepository>();
            #endregion

            #region General
            service.AddScoped<DepartamentosRepository>();
            service.AddScoped<MunicipiosRepository>();
            service.AddScoped<EstadosCivilesRepository>();
            #endregion

            #region Asilo
            service.AddScoped<ActividadesRepository>();
            service.AddScoped<AgendasRepository>();
            service.AddScoped<CargosRepository>();
            service.AddScoped<CategoriasHabitacionesRepository>();
            service.AddScoped<CentrosRepository>();
            service.AddScoped<DietasRepository>();
            service.AddScoped<EmpleadosRepository>();
            service.AddScoped<EncargadosRepository>();
            service.AddScoped<EnfermedadesRepository>();
            service.AddScoped<ExpedientesRepository>();
            service.AddScoped<HabitacionesRepository>();
            service.AddScoped<HistorialPagosRepository>();
            service.AddScoped<MedicamentosRepository>();
            service.AddScoped<MetodosPagoRepository>();
            service.AddScoped<MuertosRepository>();
            service.AddScoped<ParentescosRepository>();
            service.AddScoped<ProveedoresRepository>();
            service.AddScoped<ResidentesRepository>();
            service.AddScoped<TiposSangreRepository>();
            #endregion

            AsiloContext.BuildConnectionString(connectionString);
        }
        public static void BusinessLogic(this IServiceCollection service)
        {
            service.AddScoped<AccesoService>();
            service.AddScoped<GeneralService>();
            service.AddScoped<AsiloService>();
        }

    }
}
