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
    private unloggedUserName : string = 'Iniciar Sesión';   
    private unloggedLinkRoute : string [] = ['/authentication/login']
    faUser = faUser;
    username : string = this.unloggedUserName;
    linkRoute : string[] = this.unloggedLinkRoute;
    loggedIn : boolean = false;
    
    private subjects : Subject<void> = new Subject();
    constructor(private authenticationService : AuthenticationService) {
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

    onSignOutClick() : void {
        this.authenticationService.SingOut();
    }

    private setLoggedInUser(data : LoginModel){
        if(data.token){
            this.username = `${data.firstName} ${data.lastName}`;
            this.linkRoute = [];
            this.loggedIn = true;
        }
        else {
            this.username = this.unloggedUserName;
            this.linkRoute = this.unloggedLinkRoute;
            this.loggedIn = false;
        }
    }
}