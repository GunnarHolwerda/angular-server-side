import { Injectable } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { of as observableOf } from 'rxjs/observable/of';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class CourseDataService {
  constructor(private state: TransferState, private http: HttpClient) { }

  getCourseTitle(courseId: string): Observable<string> {
    const COURSE_TITLE = makeStateKey(`courseTitle_${courseId}`);
    let courseTitle = this.state.get(COURSE_TITLE, '');
    if (courseTitle !== '') {
      return observableOf(courseTitle);
    } else {
      return this.http.get<{title: string}>(`http://localhost:4201/api/course/${courseId}/detail`).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            console.error('An error occured: ', error.error.message);
          } else {
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          }
          return new ErrorObservable(`Something bad happend: please try again later`);
        }),
        map((response) => {
          courseTitle = response.title;
          this.state.set(COURSE_TITLE, courseTitle);
          return courseTitle;
        }
      ));
    }
  }
}
