import {Component, OnDestroy, OnInit} from '@angular/core';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {BackendService} from '../core/services/backend.service';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  title;
  tags;
  content;
  sortByDate;
  limit;
  category;
  filterByCategory;
  posts = [];
  tagsList = [];
  basePath = environment.basePath;
  comment;

  constructor(private backendService: BackendService) {
  }


  ngOnInit(): void {
    this.getPosts();
  }


  getPosts() {
    this.backendService.getPosts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          this.posts = response;
        },
        resp => {
          console.log(resp);
        }
      );
  }

  sortPostsByDate(orderBy) {
    this.backendService.getPostsByDate(orderBy)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          this.limit = null;
          this.filterByCategory = null;
          this.posts = response;
        },
        resp => {
          console.log(resp);
        }
      );
  }

  limitPosts(limit) {
    this.backendService.getPostsLimit(limit)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          this.sortByDate = null;
          this.filterByCategory = null;
          this.posts = response;
        },
        resp => {
          console.log(resp);
        }
      );
  }

  sortByCategory(category) {
    this.backendService.getPostsByCategory(category)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          this.sortByDate = null;
          this.limit = null;
          this.posts = response;
        },
        resp => {
          console.log(resp);
        }
      );
  }

  getTags(listTags) {
    return listTags.split(',');
  }

  public ngOnDestroy(): void {
    // This aborts all HTTP requests.
    this.ngUnsubscribe.next();
    // This completes the subject properlly.
    this.ngUnsubscribe.complete();
  }

  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals = {
        'year': 31536000,
        'month': 2592000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + i + 's ago'; // plural (2 days ago)
          }
      }
    }
    return value;
  }


  sendComment(post: any, comment: string) {
    this.backendService.createComment(comment)
      .pipe(
        mergeMap(responseA => {
            return this.backendService.addCommentToPost(post, responseA.id);
          }
        ), mergeMap(responseB => {
            return this.backendService.getPosts();
          }
        ))
      .subscribe(
        response => {
          // update all
          this.comment = null;
          this.posts = response;
        },
        error => {
          console.log(error);
        });
  }

  sendPost(post) {
    this.backendService.createPost(post)
      .pipe(
        takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          this.title = null;
          this.content = null;
          this.tags = null;
          this.category = null;
          // update all
          this.posts.push(response);
        },
        error => {
          console.log(error);
        });
  }

}
