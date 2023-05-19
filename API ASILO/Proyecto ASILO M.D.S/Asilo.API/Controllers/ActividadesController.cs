using Asilo.BusinessLogic.Services;
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
    public class ActividadesController : ControllerBase
    {
        private readonly AsiloService _asiloServivce;
        private readonly IMapper _mapper;

        public ActividadesController(AsiloService asiloService, IMapper mapper)
        {
            _asiloServivce = asiloService;
            _mapper = mapper;
        }

        /*metodos get, post and put*/
    }
}
