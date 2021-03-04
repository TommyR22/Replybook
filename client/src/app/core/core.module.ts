import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CapitalizeFirstPipe} from './pipes/capitalize-first.pipe';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestInterceptor} from './interceptors/request-interceptor.service';
import {LogInterceptor} from './interceptors/log-interceptor.service';
import {LoaderInterceptor} from './interceptors/loader-interceptor.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CapitalizeFirstPipe
    ],
    exports: [
        CapitalizeFirstPipe
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LogInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
}
