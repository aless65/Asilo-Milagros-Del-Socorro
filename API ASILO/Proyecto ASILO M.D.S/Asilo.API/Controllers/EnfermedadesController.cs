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
    public class EnfermedadesController : ControllerBase
    {
        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public EnfermedadesController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoEnfermedades();
            return Ok(list);
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindEnfermedades(id);
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(EnfermedadesViewModel enfermedad)
        {
            var item = _mapper.Map<tbEnfermedades>(enfermedad);
            var insert = _asiloServivce.InsertEnfermedades(item);

            return Ok(insert);
        }

        [HttpPut("Editar")]
        public IActionResult Update(EnfermedadesViewModel enfermedad)
        {
            var item = _mapper.Map<tbEnfermedades>(enfermedad);
            var update = _asiloServivce.UpdateEnfermedades(item);

            return Ok(update);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var delete = _asiloServivce.DeleteEnfermedades(id);

            return Ok(delete);
        }
    }
}