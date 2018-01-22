using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CustomerActionApp.Models;

namespace CustomerActionApp.Controllers
{
    [Produces("application/json")]
    [Route("api/CustomerActions")]
    public class CustomerActionsController : Controller
    {
        private readonly CustomerAppDbContext _context;

        public CustomerActionsController(CustomerAppDbContext context)
        {
            _context = context;
        }

        [Route("~/api/GetAllCustomerActions")]
        [HttpGet]
        public IEnumerable<CustomerActions> GetCustomerActions()
        {
            return _context.CustomerActions;
        }

        [Route("~/api/GetCustomerActions")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerActions([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customerActions = await _context.CustomerActions.SingleOrDefaultAsync(m => m.ActId == id);

            if (customerActions == null)
            {
                return NotFound();
            }

            return Ok(customerActions);
        }

        [Route("~/api/UpdateCustomerAction")]
        public async Task<IActionResult> PutCustomerActions([FromBody] CustomerActions customerActions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(customerActions).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

            }

            return NoContent();
        }

        [Route("~/api/AddCustomerAction")]
        [HttpPost]
        public async Task<IActionResult> PostCustomerActions([FromBody] CustomerActions customerActions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CustomerActions.Add(customerActions);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomerActions", new { id = customerActions.ActId }, customerActions);
        }

        [Route("~/api/DeleteCustomerAction/{id}")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerActions([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customerActions = await _context.CustomerActions.SingleOrDefaultAsync(m => m.ActId == id);
            if (customerActions == null)
            {
                return NotFound();
            }

            _context.CustomerActions.Remove(customerActions);
            await _context.SaveChangesAsync();

            return Ok(customerActions);
        }

        private bool CustomerActionsExists(int id)
        {
            return _context.CustomerActions.Any(e => e.ActId == id);
        }
    }
}