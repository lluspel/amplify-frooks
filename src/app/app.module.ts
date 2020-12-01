import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/frooks/header/header.component';
import { ListComponent } from './components/frooks/list/list.component';
import { BookComponent } from './components/frooks/list/book.component';
import { FrooksComponent } from './components/frooks/frooks.component';
import { FormComponent } from './components/frooks/form/form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    BookComponent,
    FrooksComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
