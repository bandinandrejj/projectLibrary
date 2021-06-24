import {Directive, ElementRef, HostListener, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[headingTouch]'
})
export class HeadingTouchDirective {


  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
  }

  @HostListener("mouseenter") onMouseEnter() {
    this.setColor('black');
    this.setFontWeight(600);
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.setColor('#8DA1B5');
    this.setFontWeight(500);
  }

  private setFontWeight(val: number) {
    this.renderer.setStyle(this.element.nativeElement, "font-weight", val);
  }

  private setColor(val: string) {
    this.renderer.setStyle(this.element.nativeElement, "color", val);
  }

}
