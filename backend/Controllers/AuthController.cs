using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using AngularDotNetCRUDApp.Services;
using System;
using System.Linq;
using AngularDotNetCRUDApp.Models;
using BCrypt.Net;

namespace AngularDotNetCRUDApp.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] UserLoginModel user)
        {
            var userValidated = _authService.ValidateUser(user);
            if (!userValidated)
            {
                return Unauthorized();
            }

            var token = GenerateJwtToken(user.Username);
            return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public ActionResult Register([FromBody] UserLoginModel newUser)
        {
            var user = new User
            {
                Username = newUser.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(newUser.Password)
            };

            var userCreated = _authService.CreateUser(user);
            if (!userCreated)
            {
                return BadRequest("User already exists or invalid data.");
            }

            return Ok("User created successfully.");
        }

        private string GenerateJwtToken(string username)
        {
            var user = _authService.GetUserByUsername(username);
            if (user == null)
            {
                throw new InvalidOperationException("User not found");
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ExampleKey1234567890ExampleKey1234567890"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim("userId", user.Id.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: "AngularDotNetCRUDApp.Local",
                audience: "AngularDotNetCRUDApp.Users",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Additional methods for registration, token refresh, etc., as needed
    }
}
