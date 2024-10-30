import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component"
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../../../shared/shared.module";




describe ("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [HttpClientModule, SharedModule],
            providers: [
                provideHttpClientTesting()
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

    })

    it("El componente debe haber sido instanciado", () => {
        expect(component).toBeTruthy();
    })

    it("Debe contener un formulario de login", () => {
        expect(component.loginForm).toBeTruthy();
        expect(component.loginForm.get('email')).toBeTruthy();
        expect(component.loginForm.get('password')).toBeTruthy();
    })

    it("Debe contener toggle para visibilidad de contraseña", () => {
        expect(component.passwordInputType).toBe
        component.togglePasswordVisibility();
        expect(component.passwordInputType).toBe('text');
        component.togglePasswordVisibility();
    })

    it("No debe hacer login si el formulario es invalido", () => {
        spyOn(component, 'doLogin');
        component.loginForm.setValue({ email: '', password: '' });
        component.onSubmit();
        expect(component.doLogin).not.toHaveBeenCalled();
    })

    it("Debe hacer login si el formulario es valido", () => {
        spyOn(component, 'doLogin');
        component.loginForm.setValue({ email: 'fG6kI@example.com', password: '123456' });
        component.onSubmit();
        expect(component.doLogin).toHaveBeenCalled();
    })
})