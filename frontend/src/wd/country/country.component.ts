import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'wd-country',
    templateUrl: './country.component.html',
    styleUrls: [ './country.component.scss' ]
})
export class CountryComponent implements OnInit {
    @Input('country-info') info!: ICountry;
    @Input('with-cities') withCities: boolean = false;

    public ngOnInit(): void {
        console.log(this.info);
    }

    public get perYearIncome(): number {
        return Object.values(this.info.cities)
            .map(city => city.private?.perYearIncome!)
            .reduce((a, b) => a + b);
    }
}
