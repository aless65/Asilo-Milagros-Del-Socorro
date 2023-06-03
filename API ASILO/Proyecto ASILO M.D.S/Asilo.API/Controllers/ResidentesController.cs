using Asilo.API.Models;
using Asilo.BusinessLogic.Services;
using Asilo.Entities.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Asilo.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResidentesController : ControllerBase
    {
        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public ResidentesController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _asiloServivce.FindResidentes(id);
            return Ok(list);
        }

        [HttpGet("IdentidadExiste")]
        public IActionResult IdentidadExiste(string resi_Identidad, bool isEdit, int resi_Id)
        {
            var list = _asiloServivce.IdentidadExisteResi(resi_Identidad, isEdit, resi_Id);
            return Ok(list);
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _asiloServivce.ListadoResidentes();
            return Ok(list);
        }

        [HttpPut("Editar")]
        public IActionResult Edit(ResidentesViewModel resi)
        {
            var item = _mapper.Map<tbResidentes>(resi);
            var response = _asiloServivce.EditarResidentes(item);
            return Ok(response);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(ResidentesViewModel resi)
        {
            var item = _mapper.Map<tbResidentes>(resi);
            var response = _asiloServivce.InsertarResidentes(item);
            return Ok(response);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var result = _asiloServivce.EliminarResidentes(id);
            return Ok(result);
        }


        [HttpPost("InsertarPrincipal")]
        public IActionResult InsertarPrincipal(VW_tbResidentes_Form resi)
        {
            //var item = _mapper.Map<VW_tbResidentes_Form>(resi);
            var response = _asiloServivce.InsertarResidentesForm(resi);
            return Ok(response);
        }


        [HttpPut("EditPrincipal")]
        public IActionResult EditPrincipal(VW_tbResidentes_Form resi)
        {
            var response = _asiloServivce.InsertarResidentesForm(resi);
            return Ok(response);
        }
    }
}
