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
    public class HistorialPagosController : ControllerBase
    {

        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public HistorialPagosController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }
        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindHistorialPago(id);
            return Ok(list);
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoHistorialPago();
            return Ok(list);
        }

        [HttpPut("Editar")]
        public IActionResult Edit(HistorialPagosViewModel pago)
        {
            var item = _mapper.Map<tbHistorialPagos>(pago);
            var response = _asiloServivce.EditarHistorialPago(item);
            return Ok(response);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(HistorialPagosViewModel pago)
        {
            var item = _mapper.Map<tbHistorialPagos>(pago);
            var response = _asiloServivce.InsertarHistorialPago(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var result = _asiloServivce.EliminarHistorialPago(id);
            return Ok(result);
        }


    }
}
