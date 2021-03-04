import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {BackendService} from "../core/services/backend.service";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  password;
  username;
  email;
  register = false;
  error;

  constructor(private backendService: BackendService,
              private router: Router) {
  }

  ngOnInit() {
  }

  access() {
    this.error = null;
    if (this.register) {
      this.backendService.register(this.username, this.password, this.email)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          response => {
            console.log('Response register: ', response);
          },
          resp => {
            console.log(resp);
            this.error = resp.error;
          }
        );
    } else {
      this.backendService.login(this.username, this.password)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          response => {
            localStorage.setItem('jwt', response.jwt);
            localStorage.setItem('username', this.username);
            this.router.navigate(['home']);
          },
          resp => {
            console.log(resp);
            this.error = resp.error;
          }
        );
    }

  }

  public ngOnDestroy(): void {
    // This aborts all HTTP requests.
    this.ngUnsubscribe.next();
    // This completes the subject properlly.
    this.ngUnsubscribe.complete();
  }
}
