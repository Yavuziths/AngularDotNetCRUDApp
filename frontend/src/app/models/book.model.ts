export class Book {
    id: number;
    title: string;
    author: string;
    publishDate: Date;

    constructor() {
        this.id = 0;
        this.title = '';
        this.author = '';
        this.publishDate = new Date();
    }
}
