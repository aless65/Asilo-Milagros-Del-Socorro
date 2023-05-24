using Asilo.API.Models;
using Asilo.BusinessLogic.Services;
using Asilo.Entities.Entities;
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
    public class RolesController : ControllerBase
    {
        private readonly AccesoService _accesoServivce;
        private readonly IMapper _mapper;

        public RolesController(AccesoService accesoService, IMapper mapper)
        {
            _accesoServivce = accesoService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _accesoServivce.ListadoRol();
            return Ok(list);
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _accesoServivce.FindRol(id);
            return Ok(list);
        }

       
        [HttpPost("Insertar")]
        public IActionResult Insert(RolesViewModel rol)
        {
            var item = _mapper.Map<tbRoles>(rol);
            var insert = _accesoServivce.InsertRol(item);

            return Ok(insert);
        }

        [HttpPut("Editar")]
        public IActionResult Update(RolesViewModel rol)
        {
            var item = _mapper.Map<tbRoles>(rol);
            var update = _accesoServivce.UpdateRol(item);

            return Ok(update);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var delete = _accesoServivce.DeleteRol(id);

            return Ok(delete);
        }
    }
}
