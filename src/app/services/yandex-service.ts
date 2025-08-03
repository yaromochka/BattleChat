import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ChatServices } from './chat-services';

@Injectable({
  providedIn: 'root'
})
export class YandexService {
  private readonly apiUrl = 'yandex-api/foundationModels/v1';

  constructor(private http: HttpClient, private chatService: ChatServices) { }

  sendMessage(message: string): Observable<YandexGPTResponse> {
    const messagesHistory = this.chatService.getMessagesHistory();
    const URL = `${this.apiUrl}/completion`;
    const data = {
      modelUri: `gpt://${environment.YANDEX_FOLDER_ID}/yandexgpt`,
      messages: [
        ...messagesHistory.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          text: Array.isArray(msg.text) ? msg.text.join('\n') : msg.text
        }) as BotRequest),
        { role: 'user', text: message }],
      completionOptions: {
        temperature: 0.1
      }
    };

    console.log(data);

    return this.http.post<YandexGPTResponse>(URL, data);
  }

  getToken(): Observable<YandexAuthResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      yandexPassportOauthToken: `${environment.YANDEX_TOKEN}`
    };

    return this.http.post<YandexAuthResponse>('yandex-auth-api/v1/tokens', body, { headers })
  }
}
