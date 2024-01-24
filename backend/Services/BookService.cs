using AngularDotNetCRUDApp.Data;
using AngularDotNetCRUDApp.Models;

namespace AngularDotNetCRUDApp.Services
{
    public class BookService
    {
        private readonly JsonFileRepository<Book> _repository;

        public BookService(JsonFileRepository<Book> repository)
        {
            _repository = repository;
        }

        public List<Book> GetBooks()
        {
            return _repository.GetAll();
        }

        public Book GetBookById(int id)
        {
            var book = _repository.Get(id);
            if (book == null)
            {
                return new Book { Id = 0, Title = "Not Found", Author = "Unknown", PublishDate = DateTime.MinValue };
            }

            return book;
        }

        public void AddBook(Book newBook)
        {
            var books = GetBooks();
            newBook.Id = books.Any() ? books.Max(b => b.Id) + 1 : 1;
            books.Add(newBook);
            _repository.SaveAll(books);
        }

        public void UpdateBook(Book updatedBook)
        {
            var books = GetBooks();
            var existingBook = books.FirstOrDefault(b => b.Id == updatedBook.Id);
            if (existingBook != null)
            {
                existingBook.Title = updatedBook.Title;
                existingBook.Author = updatedBook.Author;
                existingBook.PublishDate = updatedBook.PublishDate;
                _repository.SaveAll(books);
            }
        }

        public void DeleteBook(int id)
        {
            var books = GetBooks();
            var bookToRemove = books.FirstOrDefault(b => b.Id == id);
            if (bookToRemove != null)
            {
                books.Remove(bookToRemove);
                _repository.SaveAll(books);
            }
        }
    }
}
