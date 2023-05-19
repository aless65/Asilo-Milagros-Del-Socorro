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
        }

    }
}
