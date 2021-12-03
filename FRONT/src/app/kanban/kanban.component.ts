import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  cards!: Card[];

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.fetchCards();
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
}
