using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.src.Abstraction;
using Microsoft.AspNetCore.Mvc;
using Domain.src.Shared;

namespace Controller.src.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CrudController<T, TReadDto, TCreateDto, TUpdateDto>: ControllerBase
    {
        protected IBaseService<T, TReadDto, TCreateDto, TUpdateDto> _baseService;
        // private readonly IBaseService<T, TReadDto, TCreateDto, TUpdateDto> _baseService;


        public CrudController(IBaseService<T, TReadDto, TCreateDto, TUpdateDto> BaseService){
            _baseService = BaseService;
        }

        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TReadDto>>> GetAll([FromQuery]QueryOptions queryOptions){
            return Ok(await _baseService.GetAll(queryOptions));
        }

        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TReadDto>> GetOneById ([FromRoute]Guid id){
            return Ok(await _baseService.GetOneById(id));
        }

        [HttpPost]
        public virtual async Task<ActionResult<TReadDto>> CreateOne([FromBody] TCreateDto dto){
            var createObj = await _baseService.CreateOne(dto);
            return CreatedAtAction(nameof(CreateOne), createObj); //be aware for later
        }

        [HttpPatch("{id}")]
        public virtual async Task<ActionResult<TReadDto>> UpdateOneById([FromRoute] Guid id,[FromForm] TUpdateDto update){
            var updateObj = await _baseService.UpdateOneById(id, update);
            return Ok(updateObj);
        }

        // [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteOneById([FromRoute] Guid id){
            return StatusCode(204, await _baseService.DeleteOneById(id));
        }

    }
}