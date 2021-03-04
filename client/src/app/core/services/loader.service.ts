import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LoaderState} from '../../shared/loader/loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  private next(isVisible: boolean) {
    this.loaderSubject.next(<LoaderState> {isVisible});
  }

  show() {
    this.next(true);
  }

  hide() {
    this.next(false);
  }
}
