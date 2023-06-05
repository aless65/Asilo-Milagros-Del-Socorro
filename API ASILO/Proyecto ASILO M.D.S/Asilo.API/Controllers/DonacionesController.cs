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

        [HttpGet("ListadoDonacionesComunes")]
        public IActionResult List()
        {
            var list = _asiloServivce.ListadoDonacionesComunes();
            return Ok(list);
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindDonaciones(id);
            return Ok(list);
        }


        [HttpGet("FindDetalles")]
        public IActionResult Find2(int id)
        {
            var list = _asiloServivce.FindDonacionesDetalles(id);
            return Ok(list);
        }

        [HttpGet("DonacionesCentros")]
        public IActionResult donacionesCent(int id)
        {
            var list = _asiloServivce.DonacionesCentro(id);
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(DonacionesViewModel donacion)
        {
            var item = _mapper.Map<tbDonaciones>(donacion);
            var insert = _asiloServivce.InsertDonaciones(item);

            return Ok(insert);
        }


        [HttpPost("InsertarDetails")]
        public IActionResult InsertDetails(DonacionesDetallesViewModel donacion)
        {
            var item = _mapper.Map<tbDonacionesDetalles>(donacion);
            var insert = _asiloServivce.InsertDetallesDonas(item);

            return Ok(insert);
        }

        [HttpPost("InsertarDetailsDescrp")]
        public IActionResult InsertDetailsDescrip(DonacionesDetallesViewModel donacion)
        {
            var item = _mapper.Map<tbDonacionesDetalles>(donacion);
            var insert = _asiloServivce.InsertDetallesDescrip(item);

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

        [HttpPut("EliminaDetailr")]
        public IActionResult DeleteDetail(int id)
        {
            var delete = _asiloServivce.DeleteDonacionesDetails(id);

            return Ok(delete);
        }
    }
}
