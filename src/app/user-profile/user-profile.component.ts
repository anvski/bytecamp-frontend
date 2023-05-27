import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassedExam } from '../models/passed-exam';
import { UserProfile } from '../models/user';
import { Renderer2 } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userProfileUrl = '/user/profile';
  passedExamsUrl = '/exam/check';
  exams: PassedExam[] = [];
  user: UserProfile | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['home']);
    }
    this.http
      .get<PassedExam[]>(
        `${this.passedExamsUrl}/${localStorage.getItem('user')}`
      )
      .subscribe((val) => {
        this.exams = val;
      });

    this.http
      .get<UserProfile>(
        `${this.userProfileUrl}/${localStorage.getItem('user')}`
      )
      .subscribe((val) => (this.user = val));
  }
  generatePDF(passed: PassedExam) {
    const data = {
      content: [
        `BYTECAMP`,
        `Сертификат за успешно завршен курс : ${passed.course.name}`,
        `Добиен за: ${this.user?.firstName} ${this.user?.lastName}`,
        `На дата: ${new Date(Date.parse(passed.passedDate)).toUTCString()}`,
      ],
    };
    pdfMake
      .createPdf(data)
      .download(
        `${this.user?.username}-${passed.course.name}-${new Date(
          Date.parse(passed.passedDate)
        ).toUTCString()}.pdf`
      );
  }
}
