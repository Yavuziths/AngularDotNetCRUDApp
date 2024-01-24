using AngularDotNetCRUDApp.Data;
using AngularDotNetCRUDApp.Models;
using System;
using System.Linq;
using BCrypt.Net;

namespace AngularDotNetCRUDApp.Services
{
    public class AuthService
    {
        private readonly JsonFileRepository<User> _userRepository;

        public AuthService(JsonFileRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public bool ValidateUser(UserLoginModel userLogin)
        {
            var user = _userRepository.GetAll().FirstOrDefault(u => u.Username == userLogin.Username);

            if (user != null)
            {
                return BCrypt.Net.BCrypt.Verify(userLogin.Password, user.PasswordHash);
            }

            return false;
        }

        public bool CreateUser(User newUser)
        {
            var users = _userRepository.GetAll();
            if (users.Any(u => u.Username == newUser.Username))
            {
                return false;
            }

            if (newUser.Password != null)
            {
                newUser.PasswordHash = HashPassword(newUser.Password);
            }

            _userRepository.Add(newUser);
            return true;
        }

        private string HashPassword(string password)
        {
            if (password != null)
            {
                string salt = BCrypt.Net.BCrypt.GenerateSalt(12);
                return BCrypt.Net.BCrypt.HashPassword(password, salt);
            }

            throw new ArgumentNullException(nameof(password), "Password cannot be null.");
        }

        public User GetUserByUsername(string username)
        {
            var user = _userRepository.GetAll().FirstOrDefault(u => u.Username == username);
            if (user == null)
            {
                throw new InvalidOperationException($"User with username '{username}' not found.");
            }
            return user;
        }
    }
}
