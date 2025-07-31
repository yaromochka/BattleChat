import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GigachatService {
  constructor(private http: HttpClient) { }

  async getToken(): Promise<string> {
    const rqUID: string = crypto.randomUUID();
    const body = new URLSearchParams();
    body.set('scope', 'GIGACHAT_API_PERS');

    const response = await fetch('gigachat-auth-api/api/v2/oauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': `Basic ${environment.GIGACHAT_AUTHORIZATION_KEY}`,
        'RqUID': rqUID
      },
      body: body.toString()
    })

    if (!response.ok) {
      throw new Error(`Ошибка получения токена: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse.access_token || null;
  }

  getModels() {
    this.http.get('/gigachat-api/api/v1/models').subscribe(
      (res) => {
        console.log(res)
      }
    )
  }

  sendMessage(message: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })

    const data = {
      model: 'GigaChat-2',
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    };

    return this.http.post<GigachatResponse>(`/gigachat-api/api/v1/chat/completions`, data, { headers })
  }
}


