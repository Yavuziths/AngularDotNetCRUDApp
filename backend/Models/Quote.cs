public class Quote
{
    public int Id { get; set; }
    public int UserId { get; set; } // Add a UserId property to associate quotes with users
    public string? Text { get; set; } // Make Text nullable by using '?'
    public string? Author { get; set; } // Make Author nullable by using '?'

    public Quote()
    {
        // Assign default values if needed
        Text = null;
        Author = null;
    }
}
