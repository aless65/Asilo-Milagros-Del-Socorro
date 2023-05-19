using Asilo.API.Models;
using Asilo.BusinessLogic.Services;
using Asilo.Entities.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProveedoresController : ControllerBase
    {
        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public ProveedoresController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindProveedores(id);
            return Ok(list);
        }
        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoProveedores();
            return Ok(list);
        }

        [HttpPut("Editar")]
        public IActionResult Edit(ProveedorViewModel prov)
        {
            var item = _mapper.Map<tbProveedores>(prov);
            var response = _asiloServivce.EditarProveedores(item);
            return Ok(response);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(ProveedorViewModel prove)
        {
            var item = _mapper.Map<tbProveedores>(prove);
            var response = _asiloServivce.InsertarProveedores(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var result = _asiloServivce.EliminarProveedores(id);
            return Ok(result);
        }
    }
}
