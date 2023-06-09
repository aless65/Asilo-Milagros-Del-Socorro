﻿using Asilo.Entities.Entities;
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
    public class EstadosCivilesRepository : IRepository<tbEstadosCiviles, tbEstadosCiviles>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public tbEstadosCiviles Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbEstadosCiviles item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbEstadosCiviles> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<tbEstadosCiviles>(ScriptsDataBase.UDP_Lista_EstadosCiviles, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbEstadosCiviles item)
        {
            throw new NotImplementedException();
        }
    }
}
