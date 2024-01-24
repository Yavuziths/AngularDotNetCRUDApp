using AngularDotNetCRUDApp.Data;
using AngularDotNetCRUDApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AngularDotNetCRUDApp.Services
{
    public class QuoteService
    {
        private readonly JsonFileRepository<Quote> _repository;

        public QuoteService(JsonFileRepository<Quote> repository)
        {
            _repository = repository;
        }

        public List<Quote> GetQuotes()
        {
            return _repository.GetAll();
        }

        public List<Quote> GetQuotesForUser(int userId)
        {
            return _repository.GetAll().Where(quote => quote.UserId == userId).ToList();
        }

        public Quote GetQuoteById(int id)
        {
            var quote = _repository.Get(id);
            if (quote == null)
            {
                return new Quote { Id = 0, Text = "Not Found", Author = "Unknown" };
            }
            return quote;
        }

        public void AddQuote(Quote newQuote)
        {
            var quotes = GetQuotes();
            newQuote.Id = quotes.Any() ? quotes.Max(q => q.Id) + 1 : 1;
            quotes.Add(newQuote);
            _repository.SaveAll(quotes);
        }

        public void UpdateQuote(Quote updatedQuote)
        {
            var quotes = GetQuotes();
            var existingQuote = quotes.FirstOrDefault(q => q.Id == updatedQuote.Id);
            if (existingQuote != null)
            {
                existingQuote.Text = updatedQuote.Text;
                existingQuote.Author = updatedQuote.Author;
                _repository.SaveAll(quotes);
            }
        }

        public void DeleteQuote(int id)
        {
            var quotes = GetQuotes();
            var quoteToRemove = quotes.FirstOrDefault(q => q.Id == id);
            if (quoteToRemove != null)
            {
                quotes.Remove(quoteToRemove);
                _repository.SaveAll(quotes);
            }
        }
    }
}
