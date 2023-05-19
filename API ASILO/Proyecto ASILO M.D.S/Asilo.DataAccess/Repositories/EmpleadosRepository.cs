using Asilo.Entities.Entities;
using System;
using System.Collections.Generic;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Asilo.DataAccess.Repositories
{
    public class EmpleadosRepository : IRepository<tbEmpleados, VW_tbEmpleados>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@empe_Id", id, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.EliminarEmpleados, parametros, commandType: System.Data.CommandType.StoredProcedure);

            result.CodeStatus = resultado;

            return result;
        }

        public VW_tbEmpleados Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbEmpleados item)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@empe_Nombres", item.empe_Nombres, DbType.String, ParameterDirection.Input);
            parameters.Add("@empe_Apellidos", item.empe_Apellidos, DbType.String, ParameterDirection.Input);
            parameters.Add("@empe_Identidad", item.empe_Identidad, DbType.String, ParameterDirection.Input);
            parameters.Add("@empe_Sexo", item.empe_Sexo, DbType.String, ParameterDirection.Input);
            parameters.Add("@estacivi_Id", item.estacivi_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@empe_Nacimiento", item.empe_Nacimiento, DbType.Date, ParameterDirection.Input);
            parameters.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parameters.Add("@empe_Direccion", item.empe_Direccion, DbType.String, ParameterDirection.Input);
            parameters.Add("@empe_Telefono", item.empe_Telefono, DbType.String, ParameterDirection.Input);
            parameters.Add("@empe_Correo", item.empe_Correo, DbType.String, ParameterDirection.Input);
            parameters.Add("@carg_Id", item.carg_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@cent_Id", item.cent_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@empe_UsuCreacion", item.empe_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var result = db.QueryFirst<int>(ScriptsDataBase.AgregarEmpleados, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus reques = new()
            {
                CodeStatus = result,
                MessageStatus = "Empleado insertado"
            };

            return reques;
        }

        public IEnumerable<VW_tbEmpleados> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbEmpleados>(ScriptsDataBase.EmpleadosList, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbEmpleados item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parameters = new DynamicParameters();
            parameters.Add("@empe_Id", item.empe_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@empe_Nombres", item.empe_Nombres, DbType.String, ParameterDirection.Input);
            parameters.Add("@empe_Apellidos", item.empe_Apellidos, DbType.String, ParameterDirection.Input);
            parameters.Add("@empe_Identidad", item.empe_Identidad, DbType.String, ParameterDirection.Input);
            parameters.Add("@empe_Sexo", item.empe_Sexo, DbType.String, ParameterDirection.Input);
            parameters.Add("@estacivi_Id", item.estacivi_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@empe_Nacimiento", item.empe_Nacimiento, DbType.Date, ParameterDirection.Input);
            parameters.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parameters.Add("@empe_Direccion", item.empe_Direccion, DbType.String, ParameterDirection.Input);
            parameters.Add("@empe_Telefono", item.empe_Telefono, DbType.String, ParameterDirection.Input);
            parameters.Add("@empe_Correo", item.empe_Correo, DbType.String, ParameterDirection.Input);
            parameters.Add("@carg_Id", item.carg_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@cent_Id", item.cent_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@empe_UsuModificacion", item.empe_UsuModificacion, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.ActualizarEmpleados, parameters, commandType: System.Data.CommandType.StoredProcedure);
            result.CodeStatus = resultado;
            return result;
        }

    }
}
