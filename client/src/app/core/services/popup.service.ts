import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {PopupState} from '../../shared/popup/popup';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupSubject = new Subject<PopupState>();
  popupState = this.popupSubject.asObservable();

  constructor() {
  }

  show(title, description, hideX, textButton) {
    this.popupSubject.next(<PopupState> {isVisible: true, title: title, description: description, hideX: hideX, textButton: textButton});
  }

  hide() {
    this.popupSubject.next(<PopupState> {isVisible: false});
  }
}
