import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hinvHover]'
})
export class HoverDirective implements OnInit{

  @Input() hinvHover: string = 'red';

  //color: string = 'red';

  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
    console.log(this.element.nativeElement);
   }

  ngOnInit(): void {
    this.element.nativeElement.style.color = this.hinvHover;
    // this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'grey');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'grey');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'white');
  }

}
