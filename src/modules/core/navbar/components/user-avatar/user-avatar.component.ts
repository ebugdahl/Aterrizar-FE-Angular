import { Component, OnDestroy } from "@angular/core";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from "rxjs";
import { LoginModel } from "src/modules/authentication/models/login-model";
import { AuthenticationService } from "src/modules/authentication/services/authentication.service";


@Component({
    selector: 'app-user-avatar',
    templateUrl: './user-avatar.component.html',
    styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnDestroy
{
    faUser = faUser;
    username : string = 'Iniciar Sesión';
    loggedIn : boolean = false;
    linkRoute : string[] = ['/authentication/login'];
    
    private subjects : Subject<void> = new Subject();
    
    constructor(authenticationService : AuthenticationService) {
        let storedUser = localStorage.getItem('user');

        if(storedUser){
            this.setLoggedInUser(JSON.parse(storedUser));
        }

        authenticationService.loginSubject
            .asObservable()
            .pipe(takeUntil(this.subjects))
            .subscribe(data => {
                this.setLoggedInUser(data);
            }
        );
    }

    ngOnDestroy(): void {
        this.subjects.next();
        this.subjects.complete();
    }

    private setLoggedInUser(data : LoginModel){
        if(data.token){
            this.username = `${data.firstName} ${data.lastName}`;
            this.linkRoute = [];
        }
    }
}