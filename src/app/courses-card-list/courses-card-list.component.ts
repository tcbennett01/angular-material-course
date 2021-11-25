import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Course} from "../model/course";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { MatDialog } from "@angular/material/dialog";
import {filter} from 'rxjs/operators';
import {openEditCourseDialog} from '../course-dialog/course-dialog.component';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

    @Input()
    courses: Course[];

    cols = 3;
    rowHeight = "500px";

    handsetPortrait:boolean = false;


    constructor(
      private dialog: MatDialog,
      private responsive: BreakpointObserver) {
    }

    ngOnInit() {

      this.responsive.observe("(max-width: 959px)")
        .subscribe(result => console.log(result));

      this.responsive.observe([
          Breakpoints.TabletPortrait,
          Breakpoints.TabletLandscape,
          Breakpoints.HandsetPortrait,
          Breakpoints.HandsetLandscape
        ])
        .subscribe(result => {

          this.handsetPortrait = false;

          const breakpoints = result.breakpoints;

          if (breakpoints[Breakpoints.TabletPortrait]) {
            this.cols = 1;
          }
          else if (breakpoints[Breakpoints.HandsetPortrait]) {
            this.handsetPortrait = true;
            this.cols = 1;
            this.rowHeight = "430px";
          }
          else if (breakpoints[Breakpoints.HandsetLandscape]) {
            this.cols = 1;
          }
          else if (breakpoints[Breakpoints.TabletLandscape] ) {
            this.cols = 2;
          }

        });

    }

    editCourse(course:Course) {

        openEditCourseDialog(this.dialog, course)
            .pipe(
                filter(val => !!val)
            )
            .subscribe(
                val => console.log("new course value:", val)
            );


    }

}









