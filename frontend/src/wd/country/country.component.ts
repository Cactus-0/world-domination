import { Component, Input } from '@angular/core';

@Component({
    selector: 'wd-country',
    templateUrl: './country.component.html',
    styleUrls: [ './country.component.scss' ]
})
export class CountryComponent {
    @Input('country-info') info!: ICountry;
    @Input('with-cities') withCities: boolean = false;

    public get perYearIncome(): number {
        return this.info.cities
            .map(city => city.private?.perYearIncome!)
            .reduce((a, b) => a + b);
    }
}
