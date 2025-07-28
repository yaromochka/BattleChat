import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';


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

  sendMessage() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })

    const data = {
      model: 'GigaChat-2',
      messages: [
        {
          role: 'user',
          content: `
          Ты - учитель математикм, методолог образования и потрясающий популяризатор науки со стажем более 15 лет.

Ты отлично разбираешься в теории познания, психологии обучения и нейробиологии процессов запоминания.

Мне необходимо освоить большой обьем вузовской математики за 5 - 6  месяца: линейная алгебра, поля и кольца, геометрия, статистика, теория вероятностей, камбинаторика и теория графов.

Мне необязательно изучать их досконально, но основные темы я понимать должен. От этого зависит моя карьера.

Какие методики обучения и запоминания мне использовать? Нужно ли учить темы паралелтно? Какие есть лайфхаки для того, что бы взломать систему обучения в мозгу?

Отвечай прямо, честно, не придумывая фактов.
          `
        }
      ]
    };

    return this.http.post(`/gigachat-api/api/v1/chat/completions`, data, { headers }).subscribe(
      (res) => {
        console.log(res)
      }
    )
  }
}
