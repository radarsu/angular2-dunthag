import {
    ActivatedRoute, Component, Router, Socket,
} from '../shared/importer';

@Component({
    selector: 'user-view',  // <user-view></user-view>
    providers: [],
    styleUrls: ['./user-view.style.scss'],
    templateUrl: './user-view.template.html'
})
export class UserView {

    private user: any = {};

    constructor(private route: ActivatedRoute, private router: Router) {

    }

    private ngOnInit() {
        console.log('hello `UserView` component');
        Socket.socket.get('/user/self', (response) => {
            this.user = response;
        });
    }

    private characterCreate() {
        this.route.params.subscribe((params: any) => {
            this.router.navigate([`/user/${params.login}/character-create`]);
        });
    }
}
