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
        public ServiceResult ListadoAgendas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _agendasRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult FindAgendas(int id)
        {
            var result = new ServiceResult();
            try
            {
                var enfermedad = _agendasRepository.Find(id);
                return result.Ok(enfermedad);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult InsertarAgendas(tbAgendas item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _agendasRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);
            }
        }

        public ServiceResult EditarAgendas(tbAgendas item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var edit = _agendasRepository.Update(item);
                if (edit.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (edit.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (edit.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);
            }
        }

        public ServiceResult EliminarAgendas(int id)
        {
            var result = new ServiceResult();

            try
            {
                var delete = _agendasRepository.Delete(id);

                if (delete.CodeStatus == 1)
                {
                    return result.SetMessage("Registro eliminado", ServiceResultType.Success);
                }
                else if (delete.MessageStatus == "La agenda no puede ser eliminada porque está siendo usada")
                {
                    return result.SetMessage("no se pudo", ServiceResultType.Warning);
                }
                else if (delete.CodeStatus == 0)
                {
                    return result.SetMessage("Error Inesperado", ServiceResultType.Error);
                }
                else
                { return result.SetMessage("Conexión perdida", ServiceResultType.Error); }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult ListadoAgendaDetalles(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _agendasRepository.ListDetalles(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        #endregion

        #region Cargos
        public ServiceResult ListadoCargos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _cargosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertCargos(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var insert = _cargosRepository.Insert(item);

                if (insert.MessageStatus == "El cargo ha sido insertado")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Success);
                else if (insert.MessageStatus == "Este cargo ya existe")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult UpdateCargos(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var update = _cargosRepository.Update(item);

                if (update.MessageStatus == "El cargo ha sido editado")
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Success);
                else if (update.MessageStatus == "El cargo ya existe")
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult DeleteCargos(int id)
        {
            var result = new ServiceResult();
            try
            {
                var delete = _cargosRepository.Delete(id);

                if (delete.MessageStatus == "El cargo ha sido eliminado")
                    return result.SetMessage(delete.MessageStatus, ServiceResultType.Success);
                else if (delete.MessageStatus == "El cargo no puede ser eliminado ya que está siendo usado en otro registro")
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
        public ServiceResult ListadoCentros()
        {
            var result = new ServiceResult();
            try
            {
                var list = _centrosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult FindCentros(int id)
        {
            var result = new ServiceResult();
            try
            {
                var enfermedad = _centrosRepository.Find(id);
                return result.Ok(enfermedad);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
       

        public ServiceResult InsertarCentros(tbCentros item)
        {
            var result = new ServiceResult();
            try
            {
                var insert = _centrosRepository.Insert(item);

                if (insert.MessageStatus == "El centro ha sido insertado con éxito")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Success);
                else if (insert.MessageStatus == "El centro ya existe")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EditarCentros(tbCentros item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var edit = _centrosRepository.Update(item);
                if (edit.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (edit.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (edit.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);
            }
        }

        public ServiceResult EliminarCentros(int id)
        {
            var result = new ServiceResult();

            try
            {
                var delete = _centrosRepository.Delete(id);

                if (delete.CodeStatus == 1)
                {
                    return result.SetMessage("Registro eliminado", ServiceResultType.Success);
                }
                else if (delete.MessageStatus == "El registro no puede ser eliminado porque está siendo usado")
                {
                    return result.SetMessage("no se pudo", ServiceResultType.Warning);
                }
                else if (delete.CodeStatus == 0)
                {
                    return result.SetMessage("Error Inesperado", ServiceResultType.Error);
                }
                else
                { return result.SetMessage("Conexión perdida", ServiceResultType.Error); }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Dietas

        #endregion

        #region Donaciones
        public ServiceResult ListadoDonaciones()
        {
            var result = new ServiceResult();
            try
            {
                var list = _donacionesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult FindDonaciones(int id)
        {
            var result = new ServiceResult();
            try
            {
                var enfermedad = _donacionesRepository.Find(id);
                return result.Ok(enfermedad);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertDonaciones(tbDonaciones item)
        {
            var result = new ServiceResult();
            try
            {
                var insert = _donacionesRepository.Insert(item);

                if (insert.MessageStatus == "Ha ocurrido un error")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Error);
                else
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Success);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult UpdateDonaciones(tbDonaciones item)
        {
            var result = new ServiceResult();
            try
            {
                var update = _donacionesRepository.Update(item);

                if (update.MessageStatus == "La donación ha sido editada exitosamente")
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Success);
                else
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult DeleteDonaciones(int id)
        {
            var result = new ServiceResult();
            try
            {
                var delete = _donacionesRepository.Delete(id);

                if (delete.MessageStatus == "La donación ha sido eliminada")
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

        #region Empleados

        public ServiceResult ListadoEmpleados()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult FindEmpleados(int id)
        {
            var result = new ServiceResult();
            try
            {
                var enfermedad = _empleadosRepository.Find(id);
                return result.Ok(enfermedad);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarEmpleados(tbEmpleados item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _empleadosRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);
            }
        }

        public ServiceResult EditarEmpleados(tbEmpleados item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _empleadosRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);
            }
        }

        public ServiceResult EliminarEmpleados(int id)
        {
            var result = new ServiceResult();

            try
            {
                var delete = _empleadosRepository.Delete(id);

                if (delete.CodeStatus == 1)
                {
                    return result.SetMessage("Registro eliminado", ServiceResultType.Success);
                }
                else if (delete.MessageStatus == "El registro del empleado no se puede eliminar porque está siendo usado")
                {
                    return result.SetMessage("no se pudo", ServiceResultType.Warning);
                }
                else if (delete.CodeStatus == 0)
                {
                    return result.SetMessage("Error Inesperado", ServiceResultType.Error);
                }
                else
                { return result.SetMessage("Conexión perdida", ServiceResultType.Error); }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListadoCuidadoresDisponibles(int cent_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadosRepository.ListCuidadoresDisponibles(cent_Id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        #endregion

        #region Encargados
        public ServiceResult ListadoEncargados()
        {
            var result = new ServiceResult();
            try
            {
                var list = _encargadosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult FindEncargados(int id)
        {
            var result = new ServiceResult();
            try
            {
                var encargado = _encargadosRepository.Find(id);
                return result.Ok(encargado);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertEncargados(tbEncargados item)
        {
            var result = new ServiceResult();
            try
            {
                var insert = _encargadosRepository.Insert(item);

                if (insert.MessageStatus == "El encargado ha sido insertado exitosamente")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Success);
                else if (insert.MessageStatus == "Ya existe un encargado con este número de identidad")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult UpdateEncargados(tbEncargados item)
        {
            var result = new ServiceResult();
            try
            {
                var update = _encargadosRepository.Update(item);

                if (update.MessageStatus == "El encargado ha sido editado exitosamente")
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Success);
                else if (update.MessageStatus == "Ya existe un encargado con este número de identidad")
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Warning);
                else
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult DeleteEncargados(int id)
        {
            var result = new ServiceResult();
            try
            {
                var delete = _encargadosRepository.Delete(id);

                if (delete.MessageStatus == "El encargado ha sido eliminado")
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


        public ServiceResult ListadoExpePagan()
        {
            var result = new ServiceResult();
            try
            {
                var list = _expedientesRepository.ListarPagan();
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
        public ServiceResult ListadoHabitaciones()
        {
            var result = new ServiceResult();
            try
            {
                var list = _habitacionesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult FindHabitaciones(int id)
        {
            var result = new ServiceResult();
            try
            {
                var enfermedad = _habitacionesRepository.Find(id);
                return result.Ok(enfermedad);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }


        public ServiceResult InsertarHabitaciones(tbHabitaciones item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _habitacionesRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);
            }
        }

        public ServiceResult EditarHabitaciones(tbHabitaciones item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var edit = _habitacionesRepository.Update(item);
                if (edit.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (edit.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (edit.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);
            }
        }

        public ServiceResult EliminarHabitaciones(int id)
        {
            var result = new ServiceResult();

            try
            {
                var delete = _habitacionesRepository.Delete(id);

                if (delete.CodeStatus == 1)
                {
                    return result.SetMessage("Registro eliminado", ServiceResultType.Success);
                }
                else if (delete.MessageStatus == "El registro no puede ser eliminado porque está siendo usado")
                {
                    return result.SetMessage("no se pudo", ServiceResultType.Warning);
                }
                else if (delete.CodeStatus == 0)
                {
                    return result.SetMessage("Error Inesperado", ServiceResultType.Error);
                }
                else
                { return result.SetMessage("Conexión perdida", ServiceResultType.Error); }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListadoHabitacionesDisponibles(int cent_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _habitacionesRepository.ListHabitacionesDisponibles(cent_Id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        #endregion

        #region Historial de pagos
        public ServiceResult ListadoHistorialPago()
        {
            var result = new ServiceResult();
            try
            {
                var list = _historialPagosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult FindHistorialPago(int id)
        {
            var result = new ServiceResult();
            try
            {
                var enfermedad = _historialPagosRepository.Find(id);
                return result.Ok(enfermedad);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult InsertarHistorialPago(tbHistorialPagos item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _historialPagosRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);
            }
        }

        public ServiceResult EditarHistorialPago(tbHistorialPagos item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var edit = _historialPagosRepository.Update(item);
                if (edit.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
             
                else if (edit.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);
            }
        }

        public ServiceResult EliminarHistorialPago(int id)
        {
            var result = new ServiceResult();

            try
            {
                var delete = _historialPagosRepository.Delete(id);

                if (delete.CodeStatus == 1)
                {
                    return result.SetMessage("Registro eliminado", ServiceResultType.Success);
                }
                else if (delete.MessageStatus == "El registro no puede ser eliminado porque está siendo usado")
                {
                    return result.SetMessage("no se pudo", ServiceResultType.Warning);
                }
                else if (delete.CodeStatus == 0)
                {
                    return result.SetMessage("Error Inesperado", ServiceResultType.Error);
                }
                else
                { return result.SetMessage("Conexión perdida", ServiceResultType.Error); }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
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
        public ServiceResult ListadoMetodosPago()
        {
            var result = new ServiceResult();
            try
            {
                var list = _metodosPagoRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        #endregion

        #region Muertos
        public ServiceResult ListadoMuertos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _muertosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult FindMuertos(int id)
        {
            var result = new ServiceResult();
            try
            {
                var enfermedad = _muertosRepository.Find(id);
                return result.Ok(enfermedad);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertMuertos(tbMuertos item)
        {
            var result = new ServiceResult();
            try
            {
                var insert = _muertosRepository.Insert(item);

                if (insert.MessageStatus == "ha sido insertada")
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Success);
                else
                    return result.SetMessage(insert.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult UpdateMuertos(tbMuertos item)
        {
            var result = new ServiceResult();
            try
            {
                var update = _muertosRepository.Update(item);

                if (update.MessageStatus == "ha sido editado")
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Success);
                else if(update.MessageStatus == "ha sido editado")
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Success);
                else
                    return result.SetMessage(update.MessageStatus, ServiceResultType.Error);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult DeleteMuertos(int id)
        {
            var result = new ServiceResult();
            try
            {
                var delete = _muertosRepository.Delete(id);

                if (delete.MessageStatus == "ha sido eliminado")
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

        #region Parentescos
        public ServiceResult ListadoParentescos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _parentescosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        #endregion

        #region Proveedores
        public ServiceResult ListadoProveedores()
        {
            var result = new ServiceResult();
            try
            {
                var list = _proveedoresRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult FindProveedores(int id)
        {
            var result = new ServiceResult();
            try
            {
                var enfermedad = _proveedoresRepository.Find(id);
                return result.Ok(enfermedad);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult InsertarProveedores(tbProveedores item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _proveedoresRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);
            }
        }

        public ServiceResult EditarProveedores(tbProveedores item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var edit = _proveedoresRepository.Update(item);
                if (edit.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (edit.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (edit.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);
            }
        }

        public ServiceResult EliminarProveedores(int id)
        {
            var result = new ServiceResult();

            try
            {
                var delete = _proveedoresRepository.Delete(id);

                if (delete.CodeStatus == 1)
                {
                    return result.SetMessage("Registro eliminado", ServiceResultType.Success);
                }
                else if (delete.MessageStatus == "El registro no puede ser eliminado porque está siendo usado")
                {
                    return result.SetMessage("no se pudo", ServiceResultType.Warning);
                }
                else if (delete.CodeStatus == 0)
                {
                    return result.SetMessage("Error Inesperado", ServiceResultType.Error);
                }
                else
                { return result.SetMessage("Conexión perdida", ServiceResultType.Error); }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Residentes
        public ServiceResult ListadoResidentes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _residentesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }
        public ServiceResult FindResidentes(int id)
        {
            var result = new ServiceResult();
            try
            {
                var enfermedad = _residentesRepository.Find(id);
                return result.Ok(enfermedad);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarResidentes(tbResidentes item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var list = _residentesRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (list.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (list.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);
            }
        }

        public ServiceResult EditarResidentes(tbResidentes item)
        {
            ServiceResult result = new ServiceResult();
            try
            {
                var edit = _residentesRepository.Update(item);
                if (edit.CodeStatus > 0)
                {
                    return result.SetMessage("Exitoso", ServiceResultType.Success);
                }
                else if (edit.CodeStatus == -2)
                {
                    return result.SetMessage("YaExiste", ServiceResultType.Conflict);
                }
                else if (edit.CodeStatus == 0)
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
                else
                {
                    return result.SetMessage("ErrorInespero", ServiceResultType.Error);
                }
            }
            catch (Exception xe)
            {

                return result.Error(xe.Message);
            }
        }

        public ServiceResult EliminarResidentes(int id)
        {
            var result = new ServiceResult();

            try
            {
                var delete = _residentesRepository.Delete(id);

                if (delete.CodeStatus == 1)
                {
                    return result.SetMessage("Registro eliminado", ServiceResultType.Success);
                }
                else if (delete.MessageStatus == "El registro del Residente no puede ser eliminado porque está siendo usado")
                {
                    return result.SetMessage("no se pudo", ServiceResultType.Warning);
                }
                else if (delete.CodeStatus == 0)
                {
                    return result.SetMessage("Error Inesperado", ServiceResultType.Error);
                }
                else
                { return result.SetMessage("Conexión perdida", ServiceResultType.Error); }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Tipos de sangre

        #endregion
    }
}
