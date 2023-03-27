declare interface IDefaults {
    rounds: number;
    sanctionsAffect: number;

    startCityDevelopmentLevel: number;
    startCountryBudget: number;
    startCountryEcologyLevel: number;
    
    nuclearTechnologyPrice: number;
    nuclearBombPrice: number;
    nuclearBombCreationEcologyAffect: number;

    cityDevelopmentPrice: number;
    buildCityShieldPrice: number;
    ecologyImprovementPrice: number;

    perLevelEcologyImprovement: number;
    perLevelCityDevelopmentImprovement: number;

    maxPerYearIncome: number;
}

declare interface IGameState {
    admin?: string;
    winner?: string;
    year: number;
    defaults: IDefaults;
    phase: GamePhase;
    countries: ICountry[];
    players: IPlayer[]
}
