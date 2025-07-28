import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

export const authYandexInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  if (!req.url.includes('yandex-api/')) {
    return next(req);
  }
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${environment.YANDEX_IAM_TOKEN}`
    }
  });

  return next(authReq).pipe(
    catchError(error => {
      console.error('Yandex API error:', error);
      return throwError(() => error);
    })
  );
};
