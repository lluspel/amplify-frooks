import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BooksService } from 'src/app/books.service';
import {Book} from '../book';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  book: any = {
    id: 0,
    bookName: 'Name of the book',
    description: 'description'
  };
  id: string;
  tittle = 'Nuevo';
  isOn = false;

  constructor(
    private booksData: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.booksData.getBookId(this.id).subscribe((result) => {
      this.book = result;
      this.tittle = 'Editar';
    });
  }

  save(): void{
    this.booksData.uploadBook().subscribe((result) => {});
    alert('save');
    this.router.navigate(['']);
  }

  delete(): void{
    this.booksData.deleteBook(this.id).subscribe((result) => {});
    alert('deleted');
    this.router.navigate(['']);
  }

  exit(): void{
    this.booksData.deleteBook(this.id).subscribe((result) => {});
    alert('deleted');
    this.router.navigate(['']);
  }

  cancel(): void{
    this.router.navigate(['']);
  }
}
