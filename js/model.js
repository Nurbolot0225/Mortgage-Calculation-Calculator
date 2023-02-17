let data = {
    selectedProgram: 0.1,
    cost: 12000000,
    minPrice: 375000,
    maxPrice: 100000000,
    minPaymentPercents: 0.15,
    maxPaymentPercents: 0.9,
    programs: {
        base: 0.1,
        it: 0.047,
        gov: 0.067,
        zero: 0.12,
    },
};

let results = {
    rate: data.selectedProgram
}

function getData() {
    return {...data}
}

function getResults() {
    return {...results}
}

function setData(newData) {

    if (newData.onUpdate === 'radioProgram') {
        if (newData.id === 'zero-value') {
            data.minPaymentPercents = 0;
        } else {
            data.minPaymentPercents = 0.15;
        }
    }

    console.log('New data', newData);

    if (newData.onUpdate === 'inputCost') {
        // Обновить цены
        // Если стоимость меньше мин цены
        if (newData.cost < data.maxPrice)newData.cost = data.minPrice;

        // Если стоимость больше мин цены
        if (newData.cost > data.maxPrice)newData.cost = data.minPrice;
    }

    data = {
        ...data,
        ...newData
    }

    results = {
        rate: data.selectedProgram
    }
}

export { getData, setData, getResults }