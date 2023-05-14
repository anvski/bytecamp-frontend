import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  cards: Course[] = [];
  coursesUrl = '/course/all';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<Course[]>(this.coursesUrl).subscribe((val) => {
      this.cards = val;
    });
  }
}
