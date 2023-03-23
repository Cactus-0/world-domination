export namespace price {
    export function order(defaults: IDefaults, order: IOrder): number {
        return +order.buyNuclearTechnology * defaults.nuclearTechnologyPrice
            + +order.improveEcology * defaults.ecologyImprovementPrice
            + order.buildNuke * defaults.nuclearBombPrice
            + order.cityDevelopments.length * defaults.cityDevelopmentPrice
            + order.buildCityShields.length * defaults.buildCityShieldPrice
    }
}
