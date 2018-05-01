import { Injectable } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { of as observableOf } from 'rxjs/observable/of';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class DataService {
  constructor(private state: TransferState, private http: HttpClient) { }

  getResourceTitle(resourceId: string): Observable<string> {
    const RESOURCE_TITLE = makeStateKey(`resourceTitle_${resourceId}`);
    let resourceTitle = this.state.get(RESOURCE_TITLE, '');
    if (resourceTitle !== '') {
      return observableOf(resourceTitle);
    } else {
      return this.http.get<{title: string}>(`http://localhost:4201/api/resource/${resourceId}/title`).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            console.error('An error occured: ', error.error.message);
          } else {
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          }
          return new ErrorObservable(`Something bad happend: please try again later`);
        }),
        map((response) => {
          resourceTitle = response.title;
          this.state.set(RESOURCE_TITLE, resourceTitle);
          return resourceTitle;
        }
      ));
    }
  }
}
