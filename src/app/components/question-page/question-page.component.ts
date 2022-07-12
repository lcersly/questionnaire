import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({id}) => console.info(id));
  }

}
