import { Component, Input, OnInit } from '@angular/core';
import { exit } from 'process';
import { BooksService } from 'src/app/books.service';
import { API, Storage } from 'aws-amplify';

@Component({
    selector: 'app-book',
    styleUrls: ['./list.component.css'],
    template: `
        <img src="{{imagen}}" alt="">
        <div class="description">
            <h2> {{ item.bookName }} </h2>
            <p>  {{ item.description }} </p>
        </div>
        <a href="/edit/{{item.id}}"><b>editar</b></a>
    `
})
export class BookComponent implements OnInit {
    pepe = 'js10.png';
    imagen: any;
    @Input() bookId: string;
    item: any = {};
    constructor( private booksData: BooksService) {
    }

    ngOnInit(): void {
        this.fetchBook();
    }

    async fetchBook(): Promise<void> {
        const bookData = await API.get('bookapi', `/items/${this.bookId}` , {});
        this.item = bookData.data.Item;
        this.getImage();
    }
    async getImage(): Promise<void> {
        const imagen = await Storage.get(this.item.image) as string;
        this.imagen = imagen;
    }
}
