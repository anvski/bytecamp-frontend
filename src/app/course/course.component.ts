import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  courseUrl = '/courses';
  id: string | null = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      console.log('ID', val['id']);
      this.id = val['id'];
      this.links[0].url = `/home/courses/${val['id']}`;
      this.links[1].url = `/home/courses/${val['id']}/quiz/${val['id']}`;
      this.activeLink = this.links[0].url;
    });
  }
  links = [
    { text: 'Преглед', url: '/courses' },
    { text: 'Квиз', url: '/courses/quiz' },
  ];
  activeLink = '/courses';
}
