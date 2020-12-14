import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BooksService } from 'src/app/books.service';
import {Book} from '../book';
import { API, Storage } from 'aws-amplify';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  book: any = {
    id: '0',
    bookName: 'Name of the book',
    description: 'Description',
    image: 'image.png',
  };

  idBook: string;
  tittle = 'Nuevo';
  isOn = false;
  isNew = true;

  constructor(
    private booksData: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idBook = this.route.snapshot.paramMap.get('id');
    if (this.idBook){
      this.fetchBook();
    }
    else{
      this.book.id = this.id();
    }
  }

  async fetchBook(): Promise<void> {
    const bookData = await API.get('bookapi', `/items/${this.idBook}` , {});
    this.book = bookData.data.Item;
    this.isNew = false;
    this.tittle = 'Editar';
}

  id(): any{
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  handleFileInput(file: any[]): any{
    const fileObj = file[0];
    Storage.put(`${this.book.id}/image/${fileObj.name}`, fileObj, {
      contentType: 'image/png'
    })
    .then((result: any) => {
      this.book.image = result.key;
    })
    .catch(err => console.log(err));
  }

  save(): void{
    this.createBook();
    this.router.navigate(['']);
  }

  async createBook(): Promise<void> {
    const data = {
      body: {
        id: this.book.id,
        bookName: this.book.bookName,
        description: this.book.description,
        image: this.book.image,
        book: this.book.image,
      }
    };
    const apiData = await API.post('bookapi', '/items', data);
  }

  delete(): void{
    this.deleteBook();
    this.router.navigate(['']);
  }

  async deleteBook(): Promise<void> {
    const data = {
      body: {
        id: this.book.id,
        bookName: this.book.bookName,
        description: this.book.description,
        image: this.book.image,
        book: this.book.image,
      }
    };
    return await API.del('bookapi', '/items', data);
  }

  exit(): void{
    this.booksData.deleteBook(this.idBook).subscribe((result) => {});
    alert('deleted');
    this.router.navigate(['']);
  }

  cancel(): void{
    this.router.navigate(['']);
  }
}
