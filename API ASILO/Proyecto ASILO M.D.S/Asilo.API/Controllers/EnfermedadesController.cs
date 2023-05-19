using Asilo.BusinessLogic.Services;
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
    }
}
