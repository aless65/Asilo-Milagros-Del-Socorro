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
        private readonly AccesoService _accesoService;
        private readonly IMapper _mapper;

        public RolesController(AccesoService accesoService, IMapper mapper)
        {
            _accesoService = accesoService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _accesoService.ListadoRoles();
            return Ok(list);
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _accesoService.FindRoles(id);
            return Ok(list);
        }


        [HttpPost("Insertar")]
        public IActionResult Insert(RolesViewModel rol)
        {
            var item = _mapper.Map<tbRoles>(rol);
            var insert = _accesoService.InsertRoles(item);

            return Ok(insert);
        }

        [HttpPut("Editar")]
        public IActionResult Update(RolesViewModel rol)
        {
            var item = _mapper.Map<tbRoles>(rol);
            var update = _accesoService.UpdateRoles(item);

            return Ok(update);
        }




        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var delete = _accesoService.DeleteRoles(id);

            return Ok(delete);
        }
    }
}
