import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { NavBarComponent } from './navbar.component';

describe('NavbarComponent', () => {
    let fixture : ComponentFixture<NavBarComponent>

    beforeEach(async () => {
       await TestBed.configureTestingModule({
        declarations: [
            NavBarComponent,
            UserAvatarComponent
        ],
        imports: [
            RouterTestingModule
        ]
       }).compileComponents();

       fixture = TestBed.createComponent(NavBarComponent);
       fixture.detectChanges();
    });

    it('should contain the company logo', () => {
        // Arrange & Act
        let img = fixture.debugElement.query(By.css('img'));

        // Assert
        expect(img).toBeTruthy();
    });

    it('should contain the company name', () => {
        // Arrange & Act
        let link = fixture.debugElement.query(By.css('a'));

         // Assert
         expect(link.nativeElement.innerText).toBe('Aterrizar');
    });

    it('when clicking on logo navigates to root path', () => {
        // Arrange
        let img = fixture.debugElement.query(By.css('img'));

        // Act
        let pathToRedirect = img.nativeElement.getAttribute('ng-reflect-router-link');

        // Assert
        expect(pathToRedirect).toBe('/');
    });

    it('when clicking on company name navigates to root path', () => {
        // Arrange
        let link = fixture.debugElement.query(By.css('a'));

        // Act
        let href = link.nativeElement.getAttribute('href');

        // Assert
        expect(href).toBe('/');
    });

});