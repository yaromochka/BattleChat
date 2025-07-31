import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YandexService {
  private readonly apiUrl = 'yandex-api/foundationModels/v1';

  constructor(private http: HttpClient) { }

  testConnection() {
    console.log('Попытка обратиться к ЯндексГПТ')
    const testUrl = `${this.apiUrl}/completion`;
    const testBody = {
      modelUri: `gpt://${environment.YANDEX_FOLDER_ID}/yandexgpt-lite/latest`,
      messages: [{ role: 'user', text: 'Ответь одним словом: работаешь?' }],
      completionOptions: {
        stream: false,
        temperature: 0.1
      }
    };

    const headers = new HttpHeaders({
      'Authorization': `B earer ${this.getToken()}`
    })

    console.log('Отправка запроса на URL:', testUrl, { headers }); // Должен показать полный URL

    return this.http.post(testUrl, testBody).pipe(
      tap({
        next: (response) => console.log('Успешный ответ:', response),
        error: (error) => this.logErrorDetails(error, testBody)
      })
    );
  }

  private logErrorDetails(error: any, requestBody: any) {
    console.group('Диагностика ошибки 403');
    console.log('URL запроса:', error.url);
    console.log('Статус:', error.status);
    
    // Анализ заголовков запроса
    const requestHeaders = error.headers?.keys().map((k: string) => `${k}: ${error.headers.get(k)}`);
    console.log('Заголовки запроса:', requestHeaders);
    
    console.log('Тело запроса:', requestBody);
    console.log('Полный ответ сервера:', error.error);
    
    // Проверка IAM-токена
    const authHeader = error.headers?.get('Authorization');
    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];
      console.log('IAM-токен:', token?.slice(0, 10) + '...' + token?.slice(-10));
    }
    
    console.groupEnd();
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
