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
    public class EmpleadosController : ControllerBase
    {
        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public EmpleadosController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindEmpleados(id);
            return Ok(list);
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoEmpleados();
            return Ok(list);
        }

        [HttpPut("Editar")]
        public IActionResult Edit(EmpleadosViewModel empe)
        {
            var item = _mapper.Map<tbEmpleados>(empe);
            var response = _asiloServivce.EditarEmpleados(item);
            return Ok(response);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(EmpleadosViewModel empe)
        {
            var item = _mapper.Map<tbEmpleados>(empe);
            var response = _asiloServivce.InsertarEmpleados(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var result = _asiloServivce.EliminarEmpleados(id);
            return Ok(result);
        }

        [HttpGet("CuidadoresDisponibles")]
        public IActionResult CuidadoresDisponibles(int cent_Id, int resi_Id)
        {
            var list = _asiloServivce.ListadoCuidadoresDisponibles(cent_Id, resi_Id);
            return Ok(list);
        }
    }
}
