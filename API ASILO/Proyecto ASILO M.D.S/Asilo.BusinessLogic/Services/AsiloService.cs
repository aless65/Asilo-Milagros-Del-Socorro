using Asilo.DataAccess.Repositories;
using Asilo.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asilo.BusinessLogic.Services
{
    public class AsiloService
    {
        private readonly ActividadesRepository _actividadesRepository;
        private readonly AgendasRepository _agendasRepository;
        private readonly CargosRepository _cargosRepository;
        private readonly CategoriasHabitacionesRepository _categoriasHabitacionesRepository;
        private readonly CentrosRepository _centrosRepository;
        private readonly DietasRepository _dietasRepository;
        private readonly DonacionesRepository _donacionesRepository;
        private readonly EmpleadosRepository _empleadosRepository;
        private readonly EncargadosRepository _encargadosRepository;
        private readonly EnfermedadesRepository _enfermedadesRepository;
        private readonly ExpedientesRepository _expedientesRepository;
        private readonly HabitacionesRepository _habitacionesRepository;
        private readonly HistorialPagosRepository _historialPagosRepository;
        private readonly MedicamentosRepository _medicamentosRepository;
        private readonly MetodosPagoRepository _metodosPagoRepository;
        private readonly MuertosRepository _muertosRepository;
        private readonly ParentescosRepository _parentescosRepository;
        private readonly ProveedoresRepository _proveedoresRepository;
        private readonly ResidentesRepository _residentesRepository;
        private readonly TiposSangreRepository _tiposSangreRepository;

        public AsiloService(ActividadesRepository actividadesRepository, AgendasRepository agendasRepository, CargosRepository cargosRepository, CategoriasHabitacionesRepository categoriasHabitacionesRepository,
                            CentrosRepository centrosRepository, DietasRepository dietasRepository, DonacionesRepository donacionesRepository, EmpleadosRepository empleadosRepository,
                            EncargadosRepository encargadosRepository, EnfermedadesRepository enfermedadesRepository, ExpedientesRepository expedientesRepository, HabitacionesRepository habitacionesRepository,
                            HistorialPagosRepository historialPagosRepository, MedicamentosRepository medicamentosRepository, MetodosPagoRepository metodosPagoRepository, MuertosRepository muertosRepository,
                            ParentescosRepository parentescosRepository, ProveedoresRepository proveedoresRepository, ResidentesRepository residentesRepository, TiposSangreRepository tiposSangreRepository)
        {
            _actividadesRepository = actividadesRepository;
            _agendasRepository = agendasRepository;
            _cargosRepository = cargosRepository;
            _categoriasHabitacionesRepository = categoriasHabitacionesRepository;
            _centrosRepository = centrosRepository;
            _dietasRepository = dietasRepository;
            _donacionesRepository = donacionesRepository;
            _empleadosRepository = empleadosRepository;
            _encargadosRepository = encargadosRepository;
            _enfermedadesRepository = enfermedadesRepository;
            _expedientesRepository = expedientesRepository;
            _habitacionesRepository = habitacionesRepository;
            _historialPagosRepository = historialPagosRepository;
            _medicamentosRepository = medicamentosRepository;
            _metodosPagoRepository = metodosPagoRepository;
            _muertosRepository = muertosRepository;
            _parentescosRepository = parentescosRepository;
            _proveedoresRepository = proveedoresRepository;
            _residentesRepository = residentesRepository;
            _tiposSangreRepository = tiposSangreRepository;
        }

        #region Actividades
        public ServiceResult ListadoActividades()
        {
            var result = new ServiceResult();
            try
            {
                var list = _actividadesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        #endregion

        #region Agendas

        #endregion

        #region Cargos

        #endregion

        #region Categorias Habitaciones
        public ServiceResult ListadoCategoriasHabitaciones()
        {
            var result = new ServiceResult();
            try
            {
                var list = _categoriasHabitacionesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        #endregion

        #region Centros

        #endregion

        #region Dietas

        #endregion

        #region Donaciones

        #endregion

        #region Empleados

        #endregion

        #region Encargados

        #endregion

        #region Enfermedades
        public ServiceResult ListadoEnfermedades()
        {
            var result = new ServiceResult();
            try
            {
                var list = _enfermedadesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult FindEnfermedades(int id)
        {
            var result = new ServiceResult();
            try
            {
                var enfermedad = _enfermedadesRepository.Find(id);
                return result.Ok(enfermedad);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertEnfermedades(tbEnfermedades item)
        {
            var result = new ServiceResult();
            try
            {
                var insert = _enfermedadesRepository.Insert(item);

                if (insert.MessageStatus == "La enfermedad ha sido insertada exitosamente")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Success);
                else if (insert.MessageStatus == "Esta enfermedad ya existe")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult UpdateEnfermedades(tbEnfermedades item)
        {
            var result = new ServiceResult();
            try
            {
                var update = _enfermedadesRepository.Update(item);

                if (update.MessageStatus == "La enfermedad ha sido editada exitosamente")
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Success);
                else if (update.MessageStatus == "La enfermedad ya existe")
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult DeleteEnfermedades(int id)
        {
            var result = new ServiceResult();
            try
            {
                var delete = _enfermedadesRepository.Delete(id);

                if (delete.MessageStatus == "La enfermedad ha sido eliminada")
                    return result.SetMessage(delete.MessageStatus, ServiceResultType.Success);
                else if (delete.MessageStatus == "La enfermedad no puede ser eliminada ya que está siendo usada en otro registro")
                    return result.SetMessage(delete.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(delete.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        #endregion

        #region Expedientes
        public ServiceResult ListadoExpedientes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _expedientesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult ListadoHistorialExpedientesPorExpediente(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _expedientesRepository.ListHistorial(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult FindExpedientes(int id)
        {
            var result = new ServiceResult();
            try
            {
                var enfermedad = _expedientesRepository.Find(id);
                return result.Ok(enfermedad);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertExpedientes(tbExpedientes item)
        {
            var result = new ServiceResult();
            try
            {
                var insert = _expedientesRepository.Insert(item);

                if (insert.MessageStatus == "El expediente ha sido insertado exitosamente")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Success);
                else if (insert.MessageStatus == "Este expediente ya existe")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertHistorialExpedientes(tbHistorialExpedientes item)
        {
            var result = new ServiceResult();
            try
            {
                var insert = _expedientesRepository.InsertHistorial(item);

                if (insert.MessageStatus == "El historial ha sido insertado exitosamente")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Success);
                else if (insert.MessageStatus == "Este historial ya existe")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult UpdateExpedientes(tbExpedientes item)
        {
            var result = new ServiceResult();
            try
            {
                var update = _expedientesRepository.Update(item);

                if (update.MessageStatus == "El expediente ha sido editado exitosamente")
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Success);
                else
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult UpdateHistorialExpedientes(tbHistorialExpedientes item)
        {
            var result = new ServiceResult();
            try
            {
                var update = _expedientesRepository.UpdateHistorial(item);

                if (update.MessageStatus == "El historial ha sido editado exitosamente")
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Success);
                else
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult DeleteExpedientes(int id)
        {
            var result = new ServiceResult();
            try
            {
                var delete = _expedientesRepository.Delete(id);

                if (delete.MessageStatus == "El expediente ha sido eliminado")
                    return result.SetMessage(delete.MessageStatus, ServiceResultType.Success);
                else if (delete.MessageStatus == "El expediente no puede ser eliminado ya que está siendo usado en otro registro")
                    return result.SetMessage(delete.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(delete.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult DeleteHistorialExpedientes(int id)
        {
            var result = new ServiceResult();
            try
            {
                var delete = _expedientesRepository.Delete(id);

                if (delete.MessageStatus == "El historial ha sido eliminado")
                    return result.SetMessage(delete.MessageStatus, ServiceResultType.Success);
                else
                    return result.SetMessage(delete.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        #endregion

        #region Habitaciones

        #endregion

        #region Historial de pagos

        #endregion

        #region Medicamentos
        public ServiceResult ListadoMedicamentos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _medicamentosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult FindMedicamentos(int id)
        {
            var result = new ServiceResult();
            try
            {
                var enfermedad = _medicamentosRepository.Find(id);
                return result.Ok(enfermedad);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertMedicamentos(tbMedicamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var insert = _medicamentosRepository.Insert(item);

                if (insert.MessageStatus == "El medicamento ha sido insertado exitosamente")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Success);
                else if (insert.MessageStatus == "Este medicamento ya existe")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult UpdateMedicamentos(tbMedicamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var update = _medicamentosRepository.Update(item);

                if (update.MessageStatus == "El medicamento ha sido editado exitosamente")
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Success);
                else if (update.MessageStatus == "El medicamento ya existe")
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult DeleteMedicamentos(int id)
        {
            var result = new ServiceResult();
            try
            {
                var delete = _medicamentosRepository.Delete(id);

                if (delete.MessageStatus == "El medicamento ha sido eliminado")
                    return result.SetMessage(delete.MessageStatus, ServiceResultType.Success);
                else if (delete.MessageStatus == "El medicamento no puede ser eliminado ya que está siendo usado en otro registro")
                    return result.SetMessage(delete.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(delete.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        #endregion

        #region Métodos Pago

        #endregion

        #region Muertos

        #endregion

        #region Parentescos

        #endregion

        #region Proveedores

        #endregion

        #region Residentes

        #endregion

        #region Tipos de sangre

        #endregion
    }
}
