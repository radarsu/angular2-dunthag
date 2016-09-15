import {
    Connect, DataResolver, ErrorView, LogIn, NoContent, RouterModule, Routes, SocketConnected, UserView,
    CharacterCreate,
} from './shared/importer';

export const ROUTES: Routes = [{
    path: '',
    component: Connect,
}, {
    path: 'log-in',
    component: LogIn,
    canActivate: [SocketConnected],
}, {
    path: 'user/:login',
    component: UserView,
    canActivate: [SocketConnected],
}, {
    path: 'user/:login/character-create',
    component: CharacterCreate,
    canActivate: [SocketConnected],
},
// {
//     path: 'user/:login/:character',
//     component: CharacterView,
//     canActivate: [SocketConnected],
// },
{
    path: 'error',
    component: ErrorView,
}, {
    path: 'detail',
    loadChildren: () => System.import('./+detail'),
}, {
    path: '**',
    component: NoContent,
}];
