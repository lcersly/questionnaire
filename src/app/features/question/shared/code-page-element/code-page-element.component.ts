import {Component, Input} from '@angular/core';
import {CodeElement, PageElement} from "../../../../models/page-element.model";

@Component({
  selector: 'app-code-answer-option',
  templateUrl: './code-page-element.component.html',
  styleUrls: ['./code-page-element.component.scss']
})
export class CodePageElementComponent {
  public codeElement: CodeElement | undefined;

  @Input()
  set element(element: PageElement) {
    this.codeElement = element as CodeElement;
  }

  constructor() {
  }
}
