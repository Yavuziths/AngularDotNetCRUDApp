using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace AngularDotNetCRUDApp.Data
{
    public class JsonFileRepository<T> where T : class
    {
        private readonly string _jsonFilePath;

        public JsonFileRepository(string jsonFilePath)
        {
            _jsonFilePath = jsonFilePath;
        }

        public List<T> GetAll()
        {
            var json = File.ReadAllText(_jsonFilePath);
            var items = JsonSerializer.Deserialize<List<T>>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            // Check if 'items' is null and return an empty list if it is
            return items ?? new List<T>();
        }

        public T? Get(int id)
        {
            var items = GetAll();
            return items?.FirstOrDefault(item => GetId(item) == id);
        }

        public void Add(T item)
        {
            var items = GetAll();
            var propertyInfo = typeof(T).GetProperty("Id");

            if (propertyInfo != null)
            {
                if (items.Any())
                {
                    // Generate a new ID for the item
                    var maxId = items.Max(item => GetId(item));
                    propertyInfo.SetValue(item, maxId + 1);
                }
                else
                {
                    // If the collection is empty, start with ID 1
                    propertyInfo.SetValue(item, 1);
                }

                items.Add(item);
                SaveAll(items);
            }
            else
            {
                throw new InvalidOperationException("The object does not have an 'Id' property.");
            }
        }

        public void Update(T updatedItem)
        {
            var items = GetAll();
            var existingItem = items.FirstOrDefault(item => GetId(item) == GetId(updatedItem));

            if (existingItem != null)
            {
                items.Remove(existingItem);
                items.Add(updatedItem);
                SaveAll(items);
            }
        }

        public void Delete(int id)
        {
            var items = GetAll();
            var itemToRemove = items.FirstOrDefault(item => GetId(item) == id);

            if (itemToRemove != null)
            {
                items.Remove(itemToRemove);
                SaveAll(items);
            }
        }

        public void SaveAll(List<T> items)
        {
            var jsonString = JsonSerializer.Serialize(items, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_jsonFilePath, jsonString);
        }

        private int GetId(T item)
        {
            var propertyInfo = item.GetType().GetProperty("Id");
            if (propertyInfo != null)
            {
                var idValue = propertyInfo.GetValue(item);
                if (idValue != null && int.TryParse(idValue.ToString(), out var id))
                {
                    return id;
                }
            }
            throw new InvalidOperationException("The object does not have a valid 'Id' property.");
        }
    }
}
