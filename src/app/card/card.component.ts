import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  title = 'app';
  error = null;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const resourceId = this.route.snapshot.params['id'];
    this.dataService.getResourceTitle(resourceId).subscribe(
      title => this.title = title,
      error => this.error = error
    );
  }

  onClick(): void {
    console.log(this.title);
  }
}
