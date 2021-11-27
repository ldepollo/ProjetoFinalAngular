import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Card } from './models/card.model';

@Injectable()
export class HttpService {

  apiUrl = 'http://localhost:5000/cards';
  authToken!: string;

  constructor(
    private http: HttpClient
  ) { }

  getAuthToken(): Observable<string> {
    let user = { "login": "letscode", "senha": "lets@123" };
    let header = { 'Content-type': 'application/json' }
    return this.http.post<string>(`http://localhost:5000/login`, user, { headers: header })
  }

  fetchCardsFromApi(): Observable<Card[]> {
    const options = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      }
    };
    return this.http.get<Card[]>(this.apiUrl, options).pipe(catchError(this.handleError));
  }

  removeCard(cardId: any): Observable<Card[]> {
    const options = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      }
    };

    return this.http.delete<Card[]>(`${this.apiUrl}/${cardId}`, options).pipe(catchError(this.handleError));
  }

  updateCard(updatedCard: Card): Observable<Card[]> {
    const options = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      }
    };
    return this.http.put<Card[]>(`${this.apiUrl}/${updatedCard.id}`, updatedCard, options).pipe(catchError(this.handleError));
  }

  createCard(): Observable<Card[]> {
    const newCard = {
      titulo: 'Título',
      conteudo: 'Descrição',
      lista: 'todo'
    };

    const options = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      }
    };

    return this.http.post<Card[]>(this.apiUrl, newCard, options).pipe(catchError(this.handleError));
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
