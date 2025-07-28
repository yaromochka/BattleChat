import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { GigachatService } from '../services/gigachat-service';
import { catchError, from, switchMap, throwError } from 'rxjs';

export const authGigachatInterceptor: HttpInterceptorFn = (req, next) => {
  const gigachatService = inject(GigachatService);

  if (!req.url.includes('gigachat-api/')) {
    return next(req);
  }

  return from(gigachatService.getToken()).pipe(
    switchMap((token) => {
      if (!token) {
        throw new Error('Не удалось получить токен GigaChat');
      }

      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next(authReq);
    }),
    catchError((error) => {
      console.error('Ошибка в интерцепторе Gigachat:', error);
      return throwError(() => error);
    })
  );
};
