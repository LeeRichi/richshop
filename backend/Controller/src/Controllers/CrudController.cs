using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Controller.src.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]s")]
    public class CrudController<T, TReadDto, TCreateDto, TupdateDto> : ControllerBase
    {
        private readonly IBaseService<T, TReadDto, TCreateDto, TupdateDto> _baseService;

        public CrudController(IBaseService<T, TReadDto, TCreateDto, TupdateDto> BaseService){
            _baseService = BaseService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TReadDto>>> GetAll([FromQuery]QueryOptions queryOptions){
            return Ok(await _baseService.GetAll(queryOptions));
        }

        [HttpGet("{id}")]
        public async TaskTask<ActionResult<TReadDto>> GetOneById ([FromRoute]string id){
            return Ok(await _baseService.GetOneById(id));
        }

        [HttpPost]
        public async Task<ActionResult<TReadDto>> CreateOne([FromBody] TupdateDto dto){
            var createObj = _baseService.CreateOne(dto);
            return CreateAtAction("Created", createObj);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<TReadDto>> UpdateOneById([FromRoute] string id,[FromForm] TupdateDto update){
            var updateObj = await _baseService.UpdateOneById(id, update);
            return Ok(UpdateOneById);
        }

        [HttpDelete("{id}")]
        public async Tasl<ActionResult<bool>> DeleteOneById([FromRoute] string id){
            return StatusCode(204, await _baseService.DeleteOneById(id));
        }

    }

    
}