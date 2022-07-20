import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { LoginModel } from "src/modules/authentication/models/login-model";
import { AuthenticationService } from "src/modules/authentication/services/authentication.service";
import { UserAvatarComponent } from "./user-avatar.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from "@angular/router/testing";
import { UiModule } from "src/modules/ui/ui.module";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { BehaviorSubject } from "rxjs";

describe('UserAvatarComponent', () => {

    let fakeAuthenticationService : AuthenticationService;
    let component : UserAvatarComponent;
    let fixture : ComponentFixture<UserAvatarComponent>;


    beforeEach(async ()=> {
        await TestBed.configureTestingModule({
            declarations : [UserAvatarComponent],
            imports: [ 
                HttpClientTestingModule,
                RouterTestingModule,
                MatButtonModule, 
                MatMenuModule,
                UiModule,
                FontAwesomeModule,
             ],
             providers: [
                { provide : AuthenticationService, useClass : FakeAuthenticationService},
             ],
             schemas : [NO_ERRORS_SCHEMA]

        })
        .compileComponents();

        fixture = TestBed.createComponent(UserAvatarComponent);
        component = fixture.componentInstance;
        fakeAuthenticationService = TestBed.inject(AuthenticationService);
        fixture.detectChanges();
    });

    it('should create compoent', () => {
        expect(component).toBeTruthy();
    });

    it('displays firstname and lastname if the user is logged in', () => {
        // Arrange
        const loginModel : LoginModel = {
            lastName : 'lastname',
            email : 'email',
            firstName : 'firstname',
            id : 'asd',
            token : 'token'
        };

        const link = fixture.debugElement.query(By.css('a'));
        
        // Act
        fakeAuthenticationService.NotifyChanges(loginModel);
        fixture.detectChanges();

        // Assert
        expect(link.nativeElement.innerHTML).toBe('firstname lastname');
    });

    it('displays Iniciar Sesion if user is not logged in', () => {
        // Arrange & Act
        const link = fixture.debugElement.query(By.css('a'));

        // Assert
        expect(link.nativeElement.innerHTML).toBe('Iniciar Sesión');
    });

    it('Iniciar Sesion link navigates to log in', () => {
        // Arrange & Act
        const link = fixture.debugElement.query(By.css('a'));

        let href = link.nativeElement.getAttribute('href');

        // Assert
        expect(href).toBe('/authentication/login');
    });

    it('does not navigate if user is logged in', () => {
        // Arrange
        const loginModel : LoginModel = {
            lastName : 'lastname',
            email : 'email',
            firstName : 'firstname',
            id : 'asd',
            token : 'token'
        };

        const link = fixture.debugElement.query(By.css('a'));
        
        let href = link.nativeElement.getAttribute('href');
        
        // Act
        fakeAuthenticationService.NotifyChanges(loginModel);

        // Assert
        expect(href).toBe('/authentication/login');
    });

    it('sign out button triggers sigout process', () => {
        // Arrange 
        spyOn(fakeAuthenticationService, 'SignOut').and.callThrough();
        
        // Act
        component.onSignOutClick();

        // Assert
        expect(fakeAuthenticationService.SignOut).toHaveBeenCalled();
    });

    it('menu button is disabled if user is not logged in', () => {
         // Arrange
         const button = fixture.debugElement.query(By.css('#menu_button'));

         // Act
         const disabled = button.nativeElement.disabled;
 
         // Assert
         expect(disabled).toBeTrue();
    });
    
    it('menu button is enabled if user is logged in', () => {
        // Arrange
        const loginModel : LoginModel = {
            lastName : 'lastname',
            email : 'email',
            firstName : 'firstname',
            id : 'asd',
            token : 'token'
        };

        fakeAuthenticationService.NotifyChanges(loginModel);
        
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('#menu_button'));

        // Act
        const disabled = button.nativeElement.disabled;

        // Assert
        expect(disabled).toBeFalse();
   });
});

class FakeAuthenticationService { 
    public loginSubject : BehaviorSubject<LoginModel> = new  BehaviorSubject({email : '', firstName : '', id : '', lastName : '', token : ''});

    public signOutCalls : number = 0;

    NotifyChanges(loginModel : LoginModel) : void {
        this.loginSubject.next(loginModel);
    }

    SignOut() : void {
        this.signOutCalls ++;
    }
}