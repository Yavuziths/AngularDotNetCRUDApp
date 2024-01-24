using Microsoft.AspNetCore.Mvc;
using AngularDotNetCRUDApp.Models;
using AngularDotNetCRUDApp.Services;

namespace AngularDotNetCRUDApp.Controllers
{
    [ApiController]
    [Route("api/books")]
    public class BooksController : ControllerBase
    {
        private readonly BookService _bookService;

        public BooksController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public ActionResult<List<Book>> Get()
        {
            var books = _bookService.GetBooks();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public ActionResult<Book> Get(int id)
        {
            var book = _bookService.GetBookById(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public IActionResult Post(Book newBook)
        {
            try
            {
                Console.WriteLine($"Received book: {newBook.Title}, {newBook.Author}, {newBook.PublishDate}");
                _bookService.AddBook(newBook);
                return CreatedAtAction(nameof(Get), new { id = newBook.Id }, newBook);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Book updatedBook)
        {
            var existingBook = _bookService.GetBookById(id);
            if (existingBook == null)
            {
                return NotFound();
            }
            updatedBook.Id = id;
            _bookService.UpdateBook(updatedBook);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingBook = _bookService.GetBookById(id);
            if (existingBook == null)
            {
                return NotFound();
            }
            _bookService.DeleteBook(id);
            return NoContent();
        }
    }
}
