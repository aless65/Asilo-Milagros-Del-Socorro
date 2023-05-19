using Asilo.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asilo.DataAccess.Repositories
{
    public class ResidentesRepository : IRepository<tbResidentes, tbResidentes>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public tbResidentes Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbResidentes item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbResidentes> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbResidentes item)
        {
            throw new NotImplementedException();
        }
    }
}
