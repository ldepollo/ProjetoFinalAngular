import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable()
export class HttpService {

  apiUrl = 'http://localhost:5000/cards';
  authToken: string | null = localStorage.getItem('token');

  options = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', `Bearer ${this.authToken}`);

  constructor(
    private http: HttpClient
  ) { }

  fetchCardsFromApi(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl, { headers: this.options }).pipe(catchError(this.handleError));
  }

  removeCard(cardId: any): Observable<Card[]> {
    return this.http.delete<Card[]>(`${this.apiUrl}/${cardId}`, { headers: this.options }).pipe(catchError(this.handleError));
  }

  updateCard(updatedCard: Card): Observable<Card[]> {
    return this.http.put<Card[]>(`${this.apiUrl}/${updatedCard.id}`, updatedCard, { headers: this.options }).pipe(catchError(this.handleError));
  }

  createCard(): Observable<Card[]> {
    const newCard = {
      titulo: 'Título',
      conteudo: 'Descrição',
      lista: 'todo'
    };

    return this.http.post<Card[]>(this.apiUrl, newCard, { headers: this.options }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      switch (error.status) {
        case 400:
          errorMessage = `Código do erro: ${error.status}. Os dados inseridos estão incorretos e/ou o ID do card está incorreto.`;
          break;
        case 401:
          errorMessage = `Código do erro: ${error.status}. Existe um erro referente ao token de validação.`
          break;
        case 404:
          errorMessage = `Código do erro: ${error.status}. Não foi encontrado o card com o ID passado.`
          break;
        default:
          errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}.`
          break;
      }
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  };
}
