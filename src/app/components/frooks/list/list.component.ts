import { Component, Input, OnInit } from '@angular/core';
import { API } from 'aws-amplify';
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
    this.fetchBooks();
  }

  async fetchBooks() {
    const allBooksData = await API.get('bookapi', '/items', {});
    this.data = allBooksData.data.Items;
  }
}
