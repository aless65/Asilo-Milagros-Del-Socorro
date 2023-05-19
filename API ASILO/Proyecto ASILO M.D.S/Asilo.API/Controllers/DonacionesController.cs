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
    public class DonacionesController : ControllerBase
    {
        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public DonacionesController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoDonaciones();
            return Ok(list);
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindDonaciones(id);
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(DonacionesViewModel donacion)
        {
            var item = _mapper.Map<tbDonaciones>(donacion);
            var insert = _asiloServivce.InsertDonaciones(item);

            return Ok(insert);
        }

        [HttpPut("Editar")]
        public IActionResult Update(DonacionesViewModel donacion)
        {
            var item = _mapper.Map<tbDonaciones>(donacion);
            var update = _asiloServivce.UpdateDonaciones(item);

            return Ok(update);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var delete = _asiloServivce.DeleteDonaciones(id);

            return Ok(delete);
        }
    }
}
