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
           CreateMap<EnfermedadesViewModel, tbEnfermedades>().ReverseMap();
           CreateMap<MedicamentosViewModel, tbMedicamentos>().ReverseMap();
           CreateMap<ExpedientesViewModel, tbExpedientes>().ReverseMap();
           CreateMap<HistorialExpedientesViewModel, tbHistorialExpedientes>().ReverseMap();
           CreateMap<DonacionesViewModel, tbDonaciones>().ReverseMap();
           CreateMap<EncargadosViewModel, tbEncargados>().ReverseMap();
           CreateMap<MuertosViewModel, tbMuertos>().ReverseMap();
        }

    }
}
