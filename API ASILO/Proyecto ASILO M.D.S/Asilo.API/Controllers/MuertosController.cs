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
    public class MuertosController : ControllerBase
    {
        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public MuertosController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoMuertos();
            return Ok(list);
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindMuertos(id);
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(MuertosViewModel muerto)
        {
            var item = _mapper.Map<tbMuertos>(muerto);
            var insert = _asiloServivce.InsertMuertos(item);

            return Ok(insert);
        }

        [HttpPut("Editar")]
        public IActionResult Update(MuertosViewModel muerto)
        {
            var item = _mapper.Map<tbMuertos>(muerto);
            var update = _asiloServivce.UpdateMuertos(item);

            return Ok(update);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var delete = _asiloServivce.DeleteMuertos(id);

            return Ok(delete);
        }
    }
}