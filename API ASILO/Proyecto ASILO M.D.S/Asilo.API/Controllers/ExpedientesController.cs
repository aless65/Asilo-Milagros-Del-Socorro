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
    public class ExpedientesController : Controller
    {
        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public ExpedientesController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoExpedientes();
            return Ok(list);
        }

        [HttpGet("ListadoPagan")]
        public IActionResult Pagan()
        {
            var list = _asiloServivce.ListadoExpePagan();
            return Ok(list);
        }


        [HttpGet("ListadoHistorial")]
        public IActionResult IndexHistorial(int id)
        {
            var list = _asiloServivce.ListadoHistorialExpedientesPorExpediente(id);
            return Ok(list);
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindExpedientes(id);
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(ExpedientesViewModel expediente)
        {
            var item = _mapper.Map<tbExpedientes>(expediente);
            var insert = _asiloServivce.InsertExpedientes(item);

            return Ok(insert);
        }

        [HttpPost("InsertarHistorial")]
        public IActionResult InsertHistorial(HistorialExpedientesViewModel expediente)
        {
            var item = _mapper.Map<tbHistorialExpedientes>(expediente);
            var insert = _asiloServivce.InsertHistorialExpedientes(item);

            return Ok(insert);
        }

        [HttpPut("Editar")]
        public IActionResult Update(ExpedientesViewModel expediente)
        {
            var item = _mapper.Map<tbExpedientes>(expediente);
            var update = _asiloServivce.UpdateExpedientes(item);

            return Ok(update);
        }

        [HttpPut("EditarHistorial")]
        public IActionResult UpdateHistorial(HistorialExpedientesViewModel expediente)
        {
            var item = _mapper.Map<tbHistorialExpedientes>(expediente);
            var update = _asiloServivce.UpdateHistorialExpedientes(item);

            return Ok(update);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var delete = _asiloServivce.DeleteEnfermedades(id);

            return Ok(delete);
        }

        [HttpPut("EliminarHistorial")]
        public IActionResult DeleteHistorial(int id)
        {
            var delete = _asiloServivce.DeleteHistorialExpedientes(id);

            return Ok(delete);
        }
    }
}
