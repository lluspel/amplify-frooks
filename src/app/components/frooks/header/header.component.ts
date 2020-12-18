import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  async signOut(): Promise<void> {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
}
