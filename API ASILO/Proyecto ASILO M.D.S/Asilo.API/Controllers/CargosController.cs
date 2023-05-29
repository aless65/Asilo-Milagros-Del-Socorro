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
    public class CargosController : ControllerBase
    {
        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public CargosController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoCargos();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(CargosViewModel cargo)
        {
            var item = _mapper.Map<tbCargos>(cargo);
            var insert = _asiloServivce.InsertCargos(item);

            return Ok(insert);
        }

        [HttpPut("Editar")]
        public IActionResult Update(CargosViewModel cargo)
        {
            var item = _mapper.Map<tbCargos>(cargo);
            var update = _asiloServivce.UpdateCargos(item);

            return Ok(update);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var delete = _asiloServivce.DeleteCargos(id);

            return Ok(delete);
        }
    }
}
