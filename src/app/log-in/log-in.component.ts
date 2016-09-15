import {
    Component, Socket,
} from '../shared/importer';

@Component({
    selector: 'log-in',  // <login></login>
    providers: [],
    styleUrls: ['./log-in.style.scss'],
    templateUrl: './log-in.template.html'
})
export class LogIn {

    private login: string;
    private password: string;

    constructor() {

    }

    ngOnInit() {
        console.log('hello `LogIn` component');
    }

    private logIn() {
        console.log(`logIn`);
        Socket.socket.post('/user/log-in', {
            login: this.login,
            password: this.password,
        });
    }

    private signUp() {
        console.log(`signUp`);
    }
}
