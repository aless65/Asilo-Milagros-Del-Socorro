﻿using Asilo.Entities.Entities;
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
    public class CentrosRepository : IRepository<tbCentros, VW_tbCentros>
    {

        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@cent_Id", id, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.EliminarCentro, parametros, commandType: System.Data.CommandType.StoredProcedure);

            result.CodeStatus = resultado;

            return result;
        }

        public VW_tbCentros Find(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@cent_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbCentros>(ScriptsDataBase.CentroFind, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbCentros item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@cent_Nombre", item.cent_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@cent_Direccion", item.cent_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@cent_UsuCreacion", item.cent_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.AgregarCentro, parametros, commandType: CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbCentros> List()
        {

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();

            return db.Query<VW_tbCentros>(ScriptsDataBase.CentroList, null, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<GraficaCentros> Grafica()
        {

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();

            return db.Query<GraficaCentros>(ScriptsDataBase.GraficaEnfemedadXCentros, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbCentros item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@cent_Id", item.cent_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cent_Nombre", item.cent_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@cent_Direccion", item.cent_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@cent_UsuModificacion", item.cent_UsuModificacion, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.ActualizarCentro, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.CodeStatus = resultado;
            return result;
        }  
    }
}
