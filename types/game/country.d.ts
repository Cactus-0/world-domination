declare interface ICountryPrivateState {
    hasNuclearTechnology: boolean;
    nuclearBombs: number;
    budget: number;
    ecology: number;
    order: IOrder;
    sanctionsFrom: string[];
}

declare interface ICountryData {
    readonly name: string;
    readonly flagUrl: string;
    readonly cities: ICityData[];
}

declare interface ICountry extends Omit<ICountryData, 'cities'>, ICountryPublicState {
    readonly cities: Dict<ICity>;
    private?: ICountryPrivateState;
}
