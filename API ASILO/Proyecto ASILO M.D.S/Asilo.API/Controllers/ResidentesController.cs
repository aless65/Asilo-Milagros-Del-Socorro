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
        public async Task<IActionResult> InsertarPrincipal(VW_tbResidentes_Form resi)
        {
            using (HttpClient httpClient = new HttpClient())
            {
                var imageUrl = resi.expe_Fotografia;

                // Read the image file as bytes
                var imageBytes = System.IO.File.ReadAllBytes(imageUrl);

                // Convert the image bytes to base64 string
                var base64Image = Convert.ToBase64String(imageBytes);

                // Build the request content with the base64 image data
                var requestContent = new StringContent($"image={base64Image}", Encoding.UTF8, "application/x-www-form-urlencoded");

                // Send the POST request to the upload endpoint
                var uploadUrl = "https://api.imgbb.com/1/upload?key=96b1424888dd1c81d857d9611cbc22ee";
                var responseImg = await httpClient.PostAsync(uploadUrl, requestContent);


                if (responseImg.IsSuccessStatusCode)
                {
                    var content = await responseImg.Content.ReadAsStringAsync();
                    var json = JObject.Parse(content);
                    var urlValue = json["data"]["url"].ToString();

                    resi.expe_Fotografia = urlValue;
                }
                else
                {
                    Console.WriteLine($"API request failed: {responseImg.StatusCode}");
                }
            }
            //var item = _mapper.Map<VW_tbResidentes_Form>(resi);
            var response = _asiloServivce.InsertarResidentesForm(resi);
            return Ok(response);
        }
    }
}
