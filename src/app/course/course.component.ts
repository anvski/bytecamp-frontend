import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';

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
      if (!localStorage.getItem('user')) {
        this.links[1].url = '/login';
      }
    });
    this.router.events.subscribe((val) => {
      console.log(val);
      if (val instanceof Scroll) {
        console.log('AND HERE');
        this.activeLink = val.routerEvent.url;
      }
    });
  }
  links = [
    { text: 'Преглед', url: '/courses', disabled: false },
    { text: 'Квиз', url: '/courses/quiz', disabled: false },
  ];
  activeLink = '/courses';
}
