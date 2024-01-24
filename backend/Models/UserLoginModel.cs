public class UserLoginModel
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string PasswordHash { get; set; }

    public UserLoginModel()
    {
        Username = string.Empty;
        Password = string.Empty;
        PasswordHash = string.Empty;
    }
}
