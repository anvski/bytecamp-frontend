import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../models/course';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  contentImg = '';
  ngOnInit(): void {
    this.contentImg = `../assets/images/${this.content?.name.toLocaleLowerCase()}.png`;
  }
  @Input() content: Course | undefined;
}
