import { Component, Input, OnInit } from '@angular/core';
import { exit } from 'process';
import { BooksService } from 'src/app/books.service';

@Component({
    selector: 'app-book',
    styleUrls: ['./list.component.css'],
    template: `
        <img src="/assets/img/{{item.image}}" alt="">
        <div class="description">
            <h2> {{ item.bookName }} </h2>
            <p>  {{ item.description }} </p>
        </div>
        <a href="/edit/{{item.id}}"><b>editar</b></a>
    `
})
export class BookComponent implements OnInit {
    @Input() bookId: string;
    item: any = {};
    constructor( private booksData: BooksService) {
    }

    ngOnInit(): void {
        console.log('book', this.bookId);
        this.booksData.getBookId(this.bookId).subscribe((result) => {
            this.item = result;
        });
    }
}
