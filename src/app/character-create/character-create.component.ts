import {
    Component,
} from '../shared/importer';

@Component({
    selector: 'character-create',  // <character-create></character-create>
    providers: [],
    styleUrls: ['./character-create.style.scss'],
    templateUrl: './character-create.template.html'
})
export class CharacterCreate {

    constructor() {

    }

    ngOnInit() {
        console.log('hello `CharacterCreate` component');
    }
}
