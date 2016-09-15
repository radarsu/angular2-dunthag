import {
    CenteredPanel, Component, NgZone, Router, Socket, Title,
} from '../shared/importer';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'connect',  // <connect></connect>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [Title],
    // Our list of styles in our component. We may add more to compose many styles together
    styleUrls: ['./connect.style.scss'],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './connect.template.html',
})
export class Connect {

    private version = '0.0.0';
    private status = 'Proszę czekać';
    private comment = 'Sprawdzanie łączności...';
    private loading = true;

    constructor(public title: Title, private router: Router, private zone: NgZone) {
        //
    }

    private ngOnInit() {
        console.log('hello `Connect` component');
        this.proceed().catch((err) => {
            //
        });
    }

    private async proceed() {
        let socket = new Socket('http://localhost:5000');

        await socket.connect().catch((err) => {
            this.setOfflineMessages();
        });

        await socket.reconnectIntervally(Infinity).catch((err) => {
            throw err;
        });

        this.onConnected(socket);
    }

    private onConnected(socket: Socket) {
        // global signal handlers
        socket.on('disconnect', (data) => this.onDisconnected(data));
        socket.on('error', (data) => this.onDisconnected(data));
        socket.on('toastr', (data) => this.onToastr(data));
        socket.on('path', (data) => this.onPath(data));

        this.title.setTitle('Dunthag - Online');
        this.status = 'Serwer online';
        this.comment = 'Połączono z serwerem.';
        this.loading = false;
        this.router.navigate(['/log-in']);
    }

    private onDisconnected(reason: any) {
        this.router.navigate(['/']);
        this.setOfflineMessages();
    }

    private onToastr(data: any) {
        alert(JSON.stringify(data));
    }

    private onPath(data: any) {
        this.router.navigate([data.path]);
    }

    private setOfflineMessages() {
        this.status = 'Serwer offline';
        this.comment = 'Strona połączy się automatycznie, gdy tylko będzie to możliwe.';
    }
}
