using Asilo.API.Models;
using Asilo.Entities.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Extensions
{
    public class MappingProfileExtensions : Profile
    {
        public MappingProfileExtensions()
        {
           
           CreateMap<UsuarioViewModel, tbUsuarios>().ReverseMap();
            CreateMap<RolesViewModel, tbRoles>().ReverseMap();
            CreateMap<EnfermedadesViewModel, tbEnfermedades>().ReverseMap();
            CreateMap<CargosViewModel, tbCargos>().ReverseMap();
            CreateMap<MedicamentosViewModel, tbMedicamentos>().ReverseMap();
           CreateMap<ExpedientesViewModel, tbExpedientes>().ReverseMap();
           CreateMap<HistorialExpedientesViewModel, tbHistorialExpedientes>().ReverseMap();

           CreateMap<HistorialPagosViewModel, tbHistorialPagos>().ReverseMap();
           CreateMap<EmpleadosViewModel, tbEmpleados>().ReverseMap();
           CreateMap<ResidentesViewModel, tbResidentes>().ReverseMap();
           CreateMap<AgendaViewModel, tbAgendas>().ReverseMap();
            CreateMap<AgendaDetallesViewModel, tbAgendaDetalles>().ReverseMap();
            CreateMap<CentrosViewModel, tbCentros>().ReverseMap();
           CreateMap<ProveedorViewModel, tbProveedores>().ReverseMap();
            CreateMap<HabitacionesViewModel, tbHabitaciones>().ReverseMap();

           CreateMap<DonacionesViewModel, tbDonaciones>().ReverseMap();
           CreateMap<EncargadosViewModel, tbEncargados>().ReverseMap();
           CreateMap<MuertosViewModel, tbMuertos>().ReverseMap();
        }

    }
}
