import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../models/course';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  ngOnInit(): void {
    console.log('ID', this.content?.id);
  }
  @Input() content: Course | undefined;
}
