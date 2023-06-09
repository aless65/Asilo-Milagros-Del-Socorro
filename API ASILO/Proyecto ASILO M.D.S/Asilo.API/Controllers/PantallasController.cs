﻿using Asilo.BusinessLogic.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PantallasController : ControllerBase
    {
        private readonly AccesoService _accesoService;
        private readonly IMapper _mapper;

        public PantallasController(AccesoService accesoService, IMapper mapper)
        {
            _accesoService = accesoService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _accesoService.ListadoPantallas();
            return Ok(list);
        }

        [HttpGet("ListadoMenu")]
        public IActionResult IndexMenu(bool esAdmin, int role_Id)
        {
            var list = _accesoService.ListadoPantallasMenu(esAdmin, role_Id);
            return Ok(list);
        }

        [HttpGet("ListadoXRoles")]
        public IActionResult IndexRolesXPantalla(int id)
        {
            var list = _accesoService.ListadoPantallasXRoles(id);
            return Ok(list);
        }

        [HttpGet("PantallasAccesos")]
        public IActionResult PantallasAccesos(int role_Id, bool esAdmin, string pant_Nombre)
        {
            var list = _accesoService.AccesoPantallas(role_Id, esAdmin, pant_Nombre);
            return Ok(list);
        }
    }
}