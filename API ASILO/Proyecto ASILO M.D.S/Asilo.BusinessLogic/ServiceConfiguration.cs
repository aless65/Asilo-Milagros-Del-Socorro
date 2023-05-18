
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
           /* service.AddScoped<UsuariosRepository>();*/

           /* AsiloCon.BuildConnectionString(connectionString);*/
        }
        public static void BusinessLogic(this IServiceCollection service)
        {
           /* service.AddScoped<AccesoService>();
            service.AddScoped<GeneralService>();
            service.AddScoped<AsiloService>();*/
           
        }

    }
}
