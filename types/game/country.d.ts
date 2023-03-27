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

declare interface ICountry extends ICountryData, ICountryPublicState {
    readonly cities: ICity[];
    private?: ICountryPrivateState;
}
