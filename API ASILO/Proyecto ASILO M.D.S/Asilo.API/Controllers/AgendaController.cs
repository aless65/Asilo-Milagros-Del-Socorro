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
    public class AgendaController : ControllerBase
    {
        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public AgendaController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindAgendas(id);
            return Ok(list);
        }
        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoAgendas();
            return Ok(list);
        }

        [HttpPut("Editar")]
        public IActionResult Edit(AgendaViewModel agenda)
        {
            var item = _mapper.Map<tbAgendas>(agenda);
            var response = _asiloServivce.EditarAgendas(item);
            return Ok(response);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(AgendaViewModel agenda)
        {
            var item = _mapper.Map<tbAgendas>(agenda);
            var response = _asiloServivce.InsertarAgendas(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var result = _asiloServivce.EliminarAgendas(id);
            return Ok(result);
        }

        [HttpGet("ListadoDetalles")]
        public IActionResult IndexDetalles(int id)
        {
            var list = _asiloServivce.ListadoAgendaDetalles(id);
            return Ok(list);
        }

        [HttpPost("InsertarDetalles")]
        public IActionResult InsertarDetalles(AgendaDetallesViewModel[] agenda)
        {
            var item = _mapper.Map<tbAgendaDetalles[]>(agenda);
            var response = _asiloServivce.InsertarAgendaDetalles(item);
            return Ok(response);
        }

    }
}