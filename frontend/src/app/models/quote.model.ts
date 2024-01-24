export class Quote {
    id: number;
    text: string;
    author: string;
    userId: number; // Add this property to associate quotes with users

    constructor(id: number, text: string, author: string, userId: number) {
      this.id = id;
      this.text = text;
      this.author = author;
      this.userId = userId;
    }
  }
