using Asilo.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asilo.DataAccess.Repositories
{
    public class EnfermedadesRepository : IRepository<tbEnfermedades, VW_tbEnfermedades>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbEnfermedades Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbEnfermedades item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbEnfermedades> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbEnfermedades item)
        {
            throw new NotImplementedException();
        }
    }
}
