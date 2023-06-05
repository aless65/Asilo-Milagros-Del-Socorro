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
    public class CentrosController : ControllerBase
    {
        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public CentrosController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }
        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindCentros(id);
            return Ok(list);
        }
        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoCentros();
            return Ok(list);
        }


        [HttpGet("Grafica")]
        public IActionResult Grafica()
        {
            var list = _asiloServivce.Grafica();
            return Ok(list);
        }

        [HttpPut("Editar")]
        public IActionResult Edit(CentrosViewModel centro)
        {
            var item = _mapper.Map<tbCentros>(centro);
            var response = _asiloServivce.EditarCentros(item);
            return Ok(response);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(CentrosViewModel centro)
        {
            var item = _mapper.Map<tbCentros>(centro);
            var response = _asiloServivce.InsertarCentros(item);
            return Ok(response);
        }

       

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var result = _asiloServivce.EliminarCentros(id);
            return Ok(result);
        }
    }
}
