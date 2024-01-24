using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AngularDotNetCRUDApp.Services;
using AngularDotNetCRUDApp.Models;
using System.Collections.Generic;

namespace AngularDotNetCRUDApp.Controllers
{
    [ApiController]
    [Route("api/quotes")]
    [Authorize] // Ensure this attribute is added
    public class QuotesController : ControllerBase
    {
        private readonly QuoteService _quoteService;

        public QuotesController(QuoteService quoteService)
        {
            _quoteService = quoteService;
        }

        [HttpGet]
        public IActionResult GetQuotes()
        {
            var quotes = _quoteService.GetQuotes();
            return Ok(quotes);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetUserQuotes(int userId)
        {
            var userQuotes = _quoteService.GetQuotesForUser(userId);
            return Ok(userQuotes);
        }

        [HttpPost]
        public IActionResult AddQuote([FromBody] Quote newQuote)
        {
            _quoteService.AddQuote(newQuote);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateQuote(int id, [FromBody] Quote updatedQuote)
        {
            updatedQuote.Id = id;
            _quoteService.UpdateQuote(updatedQuote);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteQuote(int id)
        {
            _quoteService.DeleteQuote(id);
            return Ok();
        }
    }
}
