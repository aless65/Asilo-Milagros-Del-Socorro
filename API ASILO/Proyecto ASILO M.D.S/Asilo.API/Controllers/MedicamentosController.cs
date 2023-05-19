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
    public class MedicamentosController : ControllerBase
    {
        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public MedicamentosController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoMedicamentos();
            return Ok(list);
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindMedicamentos(id);
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(MedicamentosViewModel medicamento)
        {
            var item = _mapper.Map<tbMedicamentos>(medicamento);
            var insert = _asiloServivce.InsertMedicamentos(item);

            return Ok(insert);
        }

        [HttpPut("Editar")]
        public IActionResult Update(MedicamentosViewModel medicamento)
        {
            var item = _mapper.Map<tbMedicamentos>(medicamento);
            var update = _asiloServivce.UpdateMedicamentos(item);

            return Ok(update);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var delete = _asiloServivce.DeleteMedicamentos(id);

            return Ok(delete);
        }
    }
}
