import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { authYandexInterceptor } from './auth-yandex-interceptor';

<<<<<<< HEAD
describe('authYandexInterceptorInterceptor', () => {
<<<<<<< HEAD
<<<<<<< HEAD
  const interceptor: HttpInterceptorFn = (req, next) =>
=======
  const interceptor: HttpInterceptorFn = (req, next) => 
>>>>>>> 35bdeac (feat: add nx)
=======
  const interceptor: HttpInterceptorFn = (req, next) => 
=======
  const interceptor: HttpInterceptorFn = (req, next) =>
>>>>>>> 317c51b (feat: make tests to chat service)
>>>>>>> 573f74c (feat: make tests to chat service)
=======
describe('authYandexInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
>>>>>>> 6bd3732 (feat: merge)
    TestBed.runInInjectionContext(() => authYandexInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
