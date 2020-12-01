import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  data: any = [];
  constructor( private booksData: BooksService) {
  }

  ngOnInit(): void {
    this.booksData.getBooks().subscribe((result) => {
      this.data = result;
    });
  }
}
