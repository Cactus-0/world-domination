import type { IConfig } from './type';

export const defaultConfig: IConfig = {
    port: 3000,
    defaults: {
        rounds: 6,
        startCountryBudget: 1500,
        startCountryEcologyLevel: 0.5,
        startCityDevelopmentLevel: 0.3,
        maxPerYearIncome: 500,
        nuclearTechnologyPrice: 500,
        nuclearBombPrice: 150,
        sanctionsAffect: 0.75,
        nuclearBombCreationEcologyAffect: 0.1,
        buildCityShieldPrice: 300,
        cityDevelopmentPrice: 350,
        ecologyImprovementPrice: 550,
        perLevelCityDevelopmentImprovement: 0.2,
        perLevelEcologyImprovement: 0.1
    }
}
