import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authToken = localStorage.getItem('authToken');
  const authReq = authToken ? req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      switch (error.status) {
        case 0:
          errorMessage = 'Network error: Please check your internet connection.';
          break;
        case 400:
          errorMessage = 'Bad Request: Please check the submitted data.';
          break;
        case 401:
          errorMessage = 'Unauthorized: Session expired or invalid credentials.';
          localStorage.removeItem('authToken');
          break;
        case 403:
          errorMessage = 'Forbidden: You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'Not Found: The requested resource does not exist.';
          break;
        case 500:
          errorMessage = 'Server Error: Please try again later.';
          break;
        default:
          errorMessage = `Unexpected Error: ${error.message}`;
      }

      console.error('HTTP Error:', errorMessage, error);
      window.alert(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
