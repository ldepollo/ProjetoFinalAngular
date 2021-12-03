import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  @Input() cardTitle!: string;
  @Input() cardContent!: string;
  @Input() cardList!: string;

  @Output() clickEvtRemoveCard = new EventEmitter<boolean>();
  @Output() clickEvtUpdateCard = new EventEmitter<object>();

  editMode: boolean = false;
  titleText!: string;
  contentText!: string;

  constructor() { }

  ngOnInit(): void {
    this.titleText = this.cardTitle;
    this.contentText = this.cardContent;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  getEditedContentText(event: any) {
    this.contentText = event.target.value;
  }

  getEditedTitleText(event: any) {
    this.titleText = event.target.value;
  }

  onKeypressEvent(event: any) {
    if (event.key === "Enter") {
      this.saveEditChanges();
      this.toggleEditMode();
    }
  }

  saveEditChanges() {
    this.clickEvtUpdateCard.emit({
      titulo: this.titleText,
      conteudo: this.contentText,
      lista: this.cardList
    });

    this.editMode = !this.editMode;
  }

  moveCardToRightColumn() {
    let targetMoveList = this.cardList;

    if (this.cardList === 'todo') targetMoveList = 'doing';
    if (this.cardList === 'doing') targetMoveList = 'done';

    this.clickEvtUpdateCard.emit({
      titulo: this.cardTitle,
      conteudo: this.cardContent,
      lista: targetMoveList
    });
  }

  moveCardToLeftColumn() {
    let targetMoveList = this.cardList;

    if (this.cardList === 'done') targetMoveList = 'doing';
    if (this.cardList === 'doing') targetMoveList = 'todo';

    this.clickEvtUpdateCard.emit({
      titulo: this.cardTitle,
      conteudo: this.cardContent,
      lista: targetMoveList
    });
  }

  deleteCard() {
    this.clickEvtRemoveCard.emit(true);
  }
}
