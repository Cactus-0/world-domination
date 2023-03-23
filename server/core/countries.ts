const defaultCityImage = '/assets/cities/default.webp';

export const countries: ICountryData[] = [
    {
        name: 'Жидостан',
        flagUrl: '/assets/israel.svg',
        cities: [
            {
                name: 'Иерусалим',
                previewUrl: '/assets/cities/israel/jerusalem.jpg'
            },
            {
                name: 'Хайфа',
                previewUrl: '/assets/cities/israel/haifa.jpg'
            },
            {
                name: 'Тель-Авив',
                previewUrl: '/assets/cities/israel/tel-aviv.jpg'
            },
            {
                name: 'Эйлад',
                previewUrl: defaultCityImage
            }
        ],
    },
    {
        name: 'Албания' ,
        flagUrl: '/assets/albania.svg',
        cities: [
            {
                name: 'Тирана',
                previewUrl: defaultCityImage
            },
            {
                name: 'Приштина',
                previewUrl: defaultCityImage
            },
            {
                name: 'Дуррес',
                previewUrl: defaultCityImage
            },
            {
                name: 'Фиери',
                previewUrl: defaultCityImage
            }
        ],
    },
    {
        name: 'Украина',
        flagUrl: '/assets/ukraine.svg',
        cities: [
            {
                name: 'Киев',
                previewUrl: defaultCityImage
            },
            {
                name: 'Днепр',
                previewUrl: defaultCityImage
            },
            {
                name: 'Львов',
                previewUrl: defaultCityImage
            },
            {
                name: 'Севастополь',
                previewUrl: defaultCityImage
            }
        ],
    },
    {
        name: 'Северная Корея',
        flagUrl: '/assets/north-korea.svg',
        cities: [
            {
                name: 'Пхеньян',
                previewUrl: defaultCityImage
            },
            {
                name: 'Синпхо',
                previewUrl: defaultCityImage
            },
            {
                name: 'Чхонджин',
                previewUrl: defaultCityImage
            },
            {
                name: 'Самджиён',
                previewUrl: defaultCityImage
            }
        ],
    },
    {
        name: 'Немеция',
        flagUrl: '/assets/germany.svg',
        cities: [
            {
                name: 'Берлин',
                previewUrl: defaultCityImage
            },
            {
                name: 'Кёнигсберг',
                previewUrl: defaultCityImage
            },
            {
                name: 'Мюнхен',
                previewUrl: defaultCityImage
            },
            {
                name: 'Гамбург',
                previewUrl: defaultCityImage
            }
        ]
    }
];
