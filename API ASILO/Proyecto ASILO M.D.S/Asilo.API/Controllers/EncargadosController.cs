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
    public class EncargadosController : ControllerBase
    {
        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public EncargadosController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoEncargados();
            return Ok(list);
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindEncargados(id);
            return Ok(list);
        }

        [HttpGet("IdentidadExiste")]
        public IActionResult IdentidadExiste(string enca_Identidad)
        {
            var list = _asiloServivce.IdentidadExisteEnca(enca_Identidad);
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(EncargadosViewModel encargado)
        {
            var item = _mapper.Map<tbEncargados>(encargado);
            var insert = _asiloServivce.InsertEncargados(item);

            return Ok(insert);
        }

        [HttpPut("Editar")]
        public IActionResult Update(EncargadosViewModel encargado)
        {
            var item = _mapper.Map<tbEncargados>(encargado);
            var update = _asiloServivce.UpdateEncargados(item);

            return Ok(update);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var delete = _asiloServivce.DeleteEncargados(id);

            return Ok(delete);
        }
    }
}
