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
    public class HabitacionesController : ControllerBase
    {

        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public HabitacionesController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindHabitaciones(id);
            return Ok(list);
        }
        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoHabitaciones();
            return Ok(list);
        }

        [HttpPut("Editar")]
        public IActionResult Edit(HabitacionesViewModel habi)
        {
            var item = _mapper.Map<tbHabitaciones>(habi);
            var response = _asiloServivce.EditarHabitaciones(item);
            return Ok(response);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(HabitacionesViewModel habi)
        {
            var item = _mapper.Map<tbHabitaciones>(habi);
            var response = _asiloServivce.InsertarHabitaciones(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var result = _asiloServivce.EliminarHabitaciones(id);
            return Ok(result);
        }

        [HttpGet("HabitacionesDisponibles")]
        public IActionResult HabitacionesDisponibles(int cent_Id)
        {
            var list = _asiloServivce.ListadoHabitacionesDisponibles(cent_Id);
            return Ok(list);
        }
    }
}
