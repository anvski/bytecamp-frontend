import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/course';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CourseOverviewComponent implements OnInit {
  content: Course | undefined;
  contentImg = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      console.log('URL course/', val['id']);
      this.http.get<Course>(`course/${val['id']}`).subscribe((val) => {
        this.content = val;
        this.contentImg = `../assets/images/${this.content?.name.toLocaleLowerCase()}.png`;
      });
    });
  }

  backToTop() {
    window.scroll(0, 0);
  }
}
