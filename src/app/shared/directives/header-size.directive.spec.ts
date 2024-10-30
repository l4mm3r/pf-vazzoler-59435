import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeaderSizeDirective } from './header-size.directive';

// Create a test component that uses the directive
@Component({
    template: `<h1 appHeaderSize>Test Header</h1>`
})
class TestComponent { }

describe('HeaderSizeDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let element: DebugElement;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                HeaderSizeDirective
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement.query(By.css('h1'));
        fixture.detectChanges();
    });

    it('debe crear una instancia', () => {
        const directive = new HeaderSizeDirective(element, fixture.debugElement.injector.get(Renderer2));
        expect(directive).toBeTruthy();
    });

    it('debe setear el font size a 20px', () => {
        const headerElement = element.nativeElement;
        expect(headerElement.style.fontSize).toBe('20px');
    });

});