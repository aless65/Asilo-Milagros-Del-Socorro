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
    public class ProveedoresRepository : IRepository<tbProveedores, VW_tbProveedores>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@prov_Id", id, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.EliminarProveedores, parametros, commandType: System.Data.CommandType.StoredProcedure);

            result.CodeStatus = resultado;

            return result;
        }

        public VW_tbProveedores Find(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@prov_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbProveedores>(ScriptsDataBase.ResidentesFind, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbProveedores item)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@prov_Nombre", item.prov_Nombre, DbType.String, ParameterDirection.Input);
            parameters.Add("@prov_CorreoElectronico", item.prov_CorreoElectronico, DbType.String, ParameterDirection.Input);
            parameters.Add("@prov_Telefono", item.prov_Telefono, DbType.String, ParameterDirection.Input);
            parameters.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parameters.Add("@prov_Direccion", item.prov_Direccion, DbType.String, ParameterDirection.Input);
            parameters.Add("@prov_UsuCreacion", item.prov_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var result = db.QueryFirst<int>(ScriptsDataBase.AgregarProveedores, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus reques = new()
            {
                CodeStatus = result,
                MessageStatus = "Proveedor insertado"
            };

            return reques;
        }

        public IEnumerable<VW_tbProveedores> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();

            return db.Query<VW_tbProveedores>(ScriptsDataBase.ProveedoresList, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbProveedores item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@prov_Id", item.prov_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@prov_Nombre", item.prov_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_CorreoElectronico", item.prov_CorreoElectronico, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Telefono", item.prov_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Direccion", item.prov_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_UsuModificacion", item.prov_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.ActualizarProveedores, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.CodeStatus = resultado;
            return result;
        }



     
    }
}
