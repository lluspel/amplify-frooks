import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  url = 'https://frooks-api.glitch.me';

  constructor(private http: HttpClient) { }

  getBooks(): any{
    return this.http.get(this.url + '/get');
  }
  getBookId(id: string): any{
    return this.http.get(this.url + '/get/' + id);
  }
  uploadBook(): any{
    return this.http.post(this.url + '/upload', null);
  }
  editBook(): any{
    return this.http.put(this.url + '/edit', null);
  }
  deleteBook(id: string): any{
    return this.http.delete(this.url + '/delete/' + id);
  }
}
