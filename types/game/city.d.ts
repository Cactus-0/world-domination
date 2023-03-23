declare interface ICityPublicState {
    ruined: boolean;
    readonly lifeLevel: number;
}

declare interface ICountryPublicState {
    readonly averageLifeLevel: number;
}

declare interface ICityPrivateState {
    hasNukeShield: boolean;
    developmentLevel: number;
    readonly perYearIncome: number;
}

declare interface ICityData {
    readonly name: string;
    readonly previewUrl: string;
}

declare interface ICity extends ICityData, ICityPublicState {
    private?: ICityPrivateState;
}

declare interface ICityAttackInfo {
    source: string;
    targetCountry: string;
    targetCity: string;
    success: boolean;
}
