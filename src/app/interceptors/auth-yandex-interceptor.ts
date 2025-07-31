import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { YandexService } from '../services/yandex-service';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

export const authYandexInterceptor: HttpInterceptorFn = (req, next) => {
  const gigachatService = inject(YandexService);

  if (!req.url.includes('yandex-api/')) {
    return next(req);
  }

  return from(gigachatService.getToken()).pipe(
    switchMap((response: YandexAuthResponse) => {
      const token = response.iamToken;
      console.log('Яндекс токен', token)
      if (!token) {
        throw new Error('Не удалось получить токен Yandex');
      }

      const authReq = req.clone({
        setHeaders: {
        'Authorization': `Bearer ${token}`,
        'x-folder-id': environment.YANDEX_FOLDER_ID
        }
      });

      return next(authReq);
    }),
    catchError((error) => {
      console.error('Ошибка в интерцепторе Yandex:', error);
      return throwError(() => error);
    })
  );
};
