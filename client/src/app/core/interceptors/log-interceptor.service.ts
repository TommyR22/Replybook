import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';


@Injectable()
export class LogInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        let result: string;

        // extend server response observable with logging
        return next.handle(request)
            .pipe(
                tap(
                    // Succeeds when there is a response; ignore other events
                    event => result = event instanceof HttpResponse ? 'succeeded' : '',
                    // Operation failed; error is an HttpErrorResponse
                    error => result = 'failed'
                ),
                // Log when response observable either completes or errors
                finalize(() => {
                    const elapsed = Date.now() - started;
                    const msg = `[Network] ${request.method} "${request.urlWithParams}" - ${result} in ${elapsed} ms.`;
                    console.log(msg);
                })
            );
    }
}
