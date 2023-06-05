using Asilo.Entities.Entities;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asilo.DataAccess.Repositories
{
    public class DonacionesRepository : IRepository<tbDonaciones, VW_tbDonaciones>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@dona_Id", id, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Elimina_Donaciones, parameters, commandType: CommandType.StoredProcedure);

            return result;
        }

        public RequestStatus DeleteDetails(int id)
        {

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@deto_Id", id, DbType.Int32, ParameterDirection.Input);

          var result = db.QueryFirst<int>(ScriptsDataBase.EliminarDetailsDona, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus reques = new()
            {
                CodeStatus = result,
                MessageStatus = "Deatalle eliminado"
            };

            return reques;
        }


        public IEnumerable<VW_DonacionesDetalles> Find2(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parameters = new DynamicParameters();
            parameters.Add("@dona_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.Query<VW_DonacionesDetalles>(ScriptsDataBase.DetallesXdonacion, parameters, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<tbDonacionesXCentro> DonacionesCentro(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parameters = new DynamicParameters();
            parameters.Add("@dona_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.Query<tbDonacionesXCentro>(ScriptsDataBase.DonacionesCentroslist, parameters, commandType: CommandType.StoredProcedure);
        }


        public VW_tbDonaciones Find(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@dona_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbDonaciones>(ScriptsDataBase.UDP_Find_Donaciones, parameters, commandType: CommandType.StoredProcedure);
        }

      

        public RequestStatus InsertarDetails(tbDonacionesDetalles item)
        {

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@dona_Id", item.dona_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@doco_Id", item.doco_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@deto_Cantidad", item.deto_Cantidad, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<int>(ScriptsDataBase.InsertarDetallesDona, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus reques = new()
            {
                CodeStatus = result,
                MessageStatus = "detalle insertado"
            };

            return reques;
        }

        public RequestStatus InsertarDetailsDescip(tbDonacionesDetalles item)
        {

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@dona_Id", item.dona_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@deto_Descripcion", item.deto_Descripcion, DbType.String, ParameterDirection.Input);

            var result = db.QueryFirst<int>(ScriptsDataBase.InsertarDetailDescript, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus reques = new()
            {
                CodeStatus = result,
                MessageStatus = "detalle insertado"
            };

            return reques;
        }


        public IEnumerable<VW_DonacionesaComunes> Listar()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<VW_DonacionesaComunes>(ScriptsDataBase.ListarDonacionesComunes, null, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<VW_tbDonaciones> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<VW_tbDonaciones>(ScriptsDataBase.UDP_Lista_Donaciones, null, commandType: CommandType.StoredProcedure);
        }
        public RequestStatus Insert(tbDonaciones item)
        {
            var parametros = new DynamicParameters();
            parametros.Add("@dona_NombreDonante", item.dona_NombreDonante, DbType.String, ParameterDirection.Input);
            parametros.Add("@dona_Fecha", item.dona_Fecha, DbType.Date, ParameterDirection.Input);
            parametros.Add("@dona_QueEs", item.dona_QueEs, DbType.String, ParameterDirection.Input);
            parametros.Add("@dona_UsuCreacion", item.dona_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var result = db.QueryFirst<int>(ScriptsDataBase.UDP_Inserta_Donaciones, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus reques = new()
            {
                CodeStatus = result,
                MessageStatus = "Donacion insertada"
            };

            if (reques.MessageStatus == "Donacion insertada")
            {



                foreach (var centroId in item.cent_Id)
                {
                    var centro = centroId;
                    var parametros2 = new DynamicParameters();
                    parametros2.Add("@dona_Id", result, DbType.Int32, ParameterDirection.Input);
                    parametros2.Add("@cent_Id", centro, DbType.Int32, ParameterDirection.Input);
                    parametros2.Add("@donacent_UsuCreacion", item.dona_UsuCreacion, DbType.Int32, ParameterDirection.Input);

                    var resp = db.QueryFirst<int>(ScriptsDataBase.InsertarDonacionesXPorcentro, parametros2, commandType: CommandType.StoredProcedure);
                    if (resp == 0)
                    {
                        reques.MessageStatus = "Ha ocurrido un error en la insercciojn de centros";
                        break;
                    }
                }
            }

            return reques;
        }


        public RequestStatus Update(tbDonaciones item)
        {

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@dona_Id", item.dona_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@dona_NombreDonante", item.dona_NombreDonante, DbType.String, ParameterDirection.Input);
            parametros.Add("@dona_QueEs", item.dona_QueEs, DbType.String, ParameterDirection.Input);
            parametros.Add("@dona_Fecha", item.dona_Fecha, DbType.Date, ParameterDirection.Input);
            parametros.Add("@dona_UsuModificacion", item.dona_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<int>(ScriptsDataBase.UDP_Edita_Donaciones, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus reques = new()
            {
                CodeStatus = result,
                MessageStatus = "Donacion actualizada"
            };
            if (reques.MessageStatus == "Donacion actualizada")
            {

                foreach (var centroId in item.cent_Id)
                {
                    var centro = centroId;
                    var parametros2 = new DynamicParameters();
                    parametros2.Add("@dona_Id", item.dona_Id, DbType.Int32, ParameterDirection.Input);
                    parametros2.Add("@cent_Id", centro, DbType.Int32, ParameterDirection.Input);
                    parametros2.Add("@donacent_UsuCreacion", item.dona_UsuModificacion, DbType.Int32, ParameterDirection.Input);

                    var resp = db.QueryFirst<int>(ScriptsDataBase.InsertarDonacionesXPorcentro, parametros2, commandType: CommandType.StoredProcedure);
                    if (resp == 0)
                    {
                        reques.MessageStatus = "Ha ocurrido un error en la inserccion de centros";
                        break;
                    }
                }
            }

            return reques;
        }
    }
}
