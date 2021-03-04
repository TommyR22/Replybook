import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient) {
  }

  /**
   * register
   */
  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${environment.basePath}/auth/local/register`, {
      username,
      password,
      email
    })
      .pipe(
        tap(
          () => {
          }
        ),
        catchError(error => throwError(error))
      );
  }

  /**
   * login
   */
  login(identifier: string, password: string): Observable<any> {
    return this.http.post(`${environment.basePath}/auth/local`, {
      identifier,
      password
    })
      .pipe(
        tap(
          () => {
          }
        ),
        catchError(error => throwError(error))
      );
  }

  /**
   * GET: posts
   */
  getPosts(): Observable<any> {
    return this.http.get(`${environment.basePath}/posts`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .pipe(
        tap(
          () => {
          }
        ),
        catchError(error => throwError(error))
      );
  }

  /**
   * GET: getPostsByDate
   */
  getPostsByDate(orderBy): Observable<any> {
    return this.http.get(`${environment.basePath}/posts?_sort=published_at:${orderBy}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .pipe(
        tap(
          () => {
          }
        ),
        catchError(error => throwError(error))
      );
  }

  /**
   * GET: getPostsLimit
   */
  getPostsLimit(limit): Observable<any> {
    return this.http.get(`${environment.basePath}/posts?_limit=${limit}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .pipe(
        tap(
          () => {
          }
        ),
        catchError(error => throwError(error))
      );
  }


  /**
   * GET: getPostsByCategory
   */
  getPostsByCategory(category): Observable<any> {
    return this.http.get(`${environment.basePath}/posts?_where[category]=${category}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .pipe(
        tap(
          () => {
          }
        ),
        catchError(error => throwError(error))
      );
  }


  /**
   * POST: createComment
   */
  createComment(comment: string): Observable<any> {
    return this.http.post(`${environment.basePath}/comments`, {
      author: localStorage.getItem('username'),
      content: comment
    }, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .pipe(
        tap(
          () => {
          }
        ),
        catchError(error => throwError(error))
      );
  }


  /**
   * PUT: addCommentToPost
   */
  addCommentToPost(post: any, idComment: string): Observable<any> {
    const comments = post.comments;
    comments.push({id: idComment});
    return this.http.put(`${environment.basePath}/posts/${post.id}`, {
      comments
    }, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .pipe(
        tap(
          () => {
          }
        ),
        catchError(error => throwError(error))
      );
  }


  /**
   * POST: createPost
   */
  createPost(post: any): Observable<any> {
    return this.http.post(`${environment.basePath}/posts`, {
      title: post.title,
      content: post.content,
      tags: post.tags,
      category: post.category,
      author: localStorage.getItem('username')
    }, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .pipe(
        tap(
          () => {
          }
        ),
        catchError(error => throwError(error))
      );
  }

}
