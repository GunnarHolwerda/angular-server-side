import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TransferState } from '@angular/platform-browser';
import { CourseDataService } from './course-data.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  error = null;

  constructor(private courseData: CourseDataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.params['courseId'];
    console.log(this.route.snapshot);
    this.courseData.getCourseTitle(courseId).subscribe(
      title => this.title = title,
      error => this.error = error
    );
  }
}
