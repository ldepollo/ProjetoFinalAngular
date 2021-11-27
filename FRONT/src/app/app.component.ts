import { Component, OnChanges, OnInit } from '@angular/core';
import { HttpService } from './http.service';

import { Card } from './models/card.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FRONT';

  cards!: Card[];
  authToken!: string;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getAuthToken();
  }

  getAuthToken() {
    this.httpService.getAuthToken().subscribe(response => {
      this.httpService.authToken = response;
      this.fetchCards();
    });
  }

  fetchCards() {
    this.httpService.fetchCardsFromApi().subscribe(response => this.cards = response);
  }

  removeCard(cardId: any) {
    this.httpService.removeCard(cardId).subscribe(response => this.cards = response);
  }

  updateCard(event: any, cardId: any) {
    let updatedCard = {
      id: cardId,
      titulo: event.titulo,
      conteudo: event.conteudo,
      lista: event.lista
    };

    this.httpService.updateCard(updatedCard).subscribe(response => this.fetchCards());
  }

  createNewCard() {
    this.httpService.createCard().subscribe(response => this.fetchCards());
  }
};
