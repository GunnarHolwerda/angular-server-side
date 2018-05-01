import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  title = 'app';
  error = null;

  constructor(private courseData: CourseDataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.params['courseId'];
    this.courseData.getCourseTitle(courseId).subscribe(
      title => this.title = title,
      error => this.error = error
    );
  }
}
