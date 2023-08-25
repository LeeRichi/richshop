using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// using Microsoft.AspNetCore.Mvc;
using Business.src.Abstraction;
using Domain.src.Shared;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;



namespace Controller.src.Controllers
{
    // [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/v1/[controller]s")]
    public class CrudController<T, TReadDto, TCreateDto, TupdateDto> : ControllerBase
    {
        private readonly IBaseService<T, TReadDto, TCreateDto, TupdateDto> _baseService;

        public CrudController(IBaseService<T, TReadDto, TCreateDto, TupdateDto> BaseService){
            _baseService = BaseService;
        }

        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TReadDto>>> GetAll([FromQuery]QueryOptions queryOptions){
            return Ok(await _baseService.GetAll(queryOptions));
        }

        [HttpGet("{id:Guid}")]
        public virtual async Task<ActionResult<TReadDto>> GetOneById ([FromRoute]Guid id){
            return Ok(await _baseService.GetOneById(id));
        }

        [HttpPost]
        public virtual async Task<ActionResult<TReadDto>> CreateOne([FromBody] TCreateDto dto){
            var createObj = await _baseService.CreateOne(dto);
            return CreatedAtAction(nameof(CreateOne), createObj); //be aware for later
        }

        [HttpPatch("{id:Guid}")]
        public virtual async Task<ActionResult<TReadDto>> UpdateOneById([FromRoute] Guid id,[FromForm] TupdateDto update){
            var updateObj = await _baseService.UpdateOneById(id, update);
            return Ok(updateObj);
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> DeleteOneById([FromRoute] Guid id){
            return StatusCode(204, await _baseService.DeleteOneById(id));
        }
    }
}