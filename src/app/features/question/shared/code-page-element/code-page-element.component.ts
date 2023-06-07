import {Component, Input} from '@angular/core';
import {CodeElement, PageElement} from "../../../../models/page-element.model";
import { HighlightModule } from 'ngx-highlightjs';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-code-answer-option',
    templateUrl: './code-page-element.component.html',
    styleUrls: ['./code-page-element.component.scss'],
    standalone: true,
    imports: [NgIf, HighlightModule]
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
