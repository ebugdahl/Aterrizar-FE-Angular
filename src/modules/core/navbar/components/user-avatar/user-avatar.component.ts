import { Component, OnDestroy } from "@angular/core";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from "rxjs";
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
    private subjects : Subject<void> = new Subject();

    
    constructor(authenticationService : AuthenticationService) {
        authenticationService.loginSubject
            .asObservable()
            .pipe(takeUntil(this.subjects))
            .subscribe( data => {
                this.username = data.token ? `${data.firstName} ${data.lastName}`  : 'Iniciar Sesión';
            });
    }


    ngOnDestroy(): void {
        this.subjects.next();
        this.subjects.complete();
    }

}