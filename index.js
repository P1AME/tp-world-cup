const countries = require('./countries.json');

const orderByField = (countries, field, asc = false, fieldType = false) => {
    return countries.sort((a, b) => {
        if (asc) {
            if (!fieldType) {
                return a[field] - b[field];
            } else if (fieldType === 'array') {
                return a[field].length - b[field].length;
            }
        } else {
            if (!fieldType) {
                return b[field] - a[field];
            } else if (fieldType === 'array') {
                return b[field].length - a[field].length;
            }
        }
    });
}

const getDeltaBetweenFields = (countries, field1, field2) => {
    return countries.map(country => {
        return {
            ...country,
            delta: country[field1].length - country[field2].length
        }
    });
}

const returnName = (countries) => {
    if (countries.name !== undefined) {
        return countries.name;
    } else if (countries.length === 1) {
        return countries[0].name;
    } else {
        return countries.map(country => country.name);
    }
}

const assertIsSameArrayValues = (array1, array2) => {
    if (array1.length !== array2.length) {
        return false;
    }
    return array1.every((value, index) => value === array2[index]);
}

const getWinAtLeastAFinal = (countries) => {
    return returnName(countries.filter(country => country.victories.length >= 1));
}

console.log('Equipes ayant gagné au moins une finale :');
console.log(getWinAtLeastAFinal(countries));

const getWonEveryFinal = (countryes) => {
    return returnName(countryes.filter((countries) => assertIsSameArrayValues(countries.victories, countries.finals) && countries.victories.length > 0));
}
console.log('Equipes ayant gagné toutes leurs finales :');
console.log(getWonEveryFinal(countries));

const getNeverWonAFinal = (countries) => {
    return returnName(countries.filter(country => (
        country.victories.length < 1
    )));
}

console.log('Equipes n\'ayant jamais gagné de finale :');
console.log(getNeverWonAFinal(countries));

const getWonAtLeastOneFinalAndLostAtLeastOneFinal = (countries) => {
    return returnName(countries.filter(country => (
        country.victories.length >= 1 && country.finals.length >= 1 && !assertIsSameArrayValues(country.victories, country.finals)
    )));
}

console.log('Equipes ayant gagné au moins une finale et perdu au moins une finale :');
console.log(getWonAtLeastOneFinalAndLostAtLeastOneFinal(countries));

const getPlayedMostFinals = (countries) => {
    return returnName(orderByField(countries, 'finals', true, 'array').reverse()[0]);
}

console.log('Equipe ayant joué le plus de finales :')
console.log(getPlayedMostFinals(countries));

const getLostMostFinals = (countries) => {
    return returnName(orderByField(getDeltaBetweenFields(countries, 'victories', 'finals'), 'delta', true)[0]);
}

console.log('Equipe ayant perdu le plus de finales :');
console.log(getLostMostFinals(countries));

const getBestTauxParticipationWithinFinals = (countries) => {
    return returnName(orderByField(getDeltaBetweenFields(countries, 'victories', 'finals'), 'delta', false)[0]);
}

console.log('Equipe ayant le meilleur taux de participation aux finales :');
console.log(getBestTauxParticipationWithinFinals(countries));

const getDescClassementOfVictoryForFinals = (countries) => {
    return returnName(orderByField(orderByField(countries, 'finals'), 'victories', false, 'array'));
}

console.log('Classement des équipes par nombre de victoires aux finales :');
console.log(getDescClassementOfVictoryForFinals(countries));