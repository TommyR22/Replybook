import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {PopupState} from './popup';
import {PopupService} from '../../core/services/popup.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [   // :enter is alias to 'void => *'
                style({opacity: 0}),
                animate(200, style({opacity: 1}))
            ]),
            transition(':leave', [   // :leave is alias to '* => void'
                animate(200, style({opacity: 0}))
            ])
        ])
    ]
})
export class PopupComponent implements OnInit, OnDestroy {
    @Input() isVisible: boolean;
    @Input() title: string;
    @Input() description: string;
    @Input() hideX?: boolean;
    @Input() textButton?: string = null;
    @Output() clickButton = new EventEmitter();

    private subscription: Subscription;

    constructor(private popupService: PopupService) {
    }

    ngOnInit() {
        this.subscription = this.popupService.popupState
            .subscribe((state: PopupState) => {
                this.isVisible = state.isVisible;
                this.title = state.title;
                this.description = state.description;
                this.hideX = state.hideX;
                this.textButton = state.textButton;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    click() {
        this.clickButton.emit();
    }

}
