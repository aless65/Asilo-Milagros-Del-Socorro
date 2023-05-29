
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
    public class UsuarioController : ControllerBase
    {
        private readonly AccesoService _seguridadServivce;
        private readonly IMapper _mapper;

        public UsuarioController(AccesoService seguridadService, IMapper mapper)
        {
            _seguridadServivce = seguridadService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult Index()
        {
            var list = _seguridadServivce.ListadoUsuarios();
            return Ok(list);
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _seguridadServivce.FindUsuarios(id);
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(UsuarioViewModel usuario)
        {
            var item = _mapper.Map<tbUsuarios>(usuario);
            var insert = _seguridadServivce.InsertUsuarios(item);

            return Ok(insert);
        }

        [HttpPut("Editar")]
        public IActionResult Update(UsuarioViewModel usuario)
        {
            var item = _mapper.Map<tbUsuarios>(usuario);
            var update = _seguridadServivce.UpdateUsuarios(item);

            return Ok(update);
        }

        [HttpPut("Eliminar")]
        public IActionResult Delete(int id)
        {
            var delete = _seguridadServivce.DeleteUsuarios(id);

            return Ok(delete);
        }


        [HttpGet("Login")]
        public IActionResult Login(string usuario, string contrasena)
        {
            var list = _seguridadServivce.Login(usuario, contrasena);
            return Ok(list);
        }
    }
}
