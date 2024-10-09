import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHeaderSize]'
})
export class HeaderSizeDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setFontSize();
  }

  private setFontSize() {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '20px');
  }
}
