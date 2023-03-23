import { Component, Input } from '@angular/core';

@Component({
    selector: 'wd-image-card',
    templateUrl: './image-card.component.html',
    styleUrls: [ './image-card.component.scss' ]
})
export class ImageCardComponent {
    @Input('title') title!: string;
}
