import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoaderService} from '../../core/services/loader.service';
import {LoaderState} from './loader';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
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
export class LoaderComponent implements OnInit, OnDestroy {
  @Input() isVisible = false;

  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.isVisible = state.isVisible;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
