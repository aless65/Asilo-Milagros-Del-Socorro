using Asilo.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asilo.DataAccess.Repositories
{
    public class MedicamentosRepository : IRepository<tbMedicamentos, tbMedicamentos>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public tbMedicamentos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbMedicamentos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbMedicamentos> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbMedicamentos item)
        {
            throw new NotImplementedException();
        }
    }
}
