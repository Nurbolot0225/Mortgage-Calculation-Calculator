let data = {
    selectedProgram: 0.1,
    cost: 12000000,
    minPrice: 375000,
    maxPrice: 100000000,
    minPaymentPercents: 0.15,
    maxPaymentPercents: 0.9,
    paymentPercents: 0.5,
    payment: 6000000,
    getMinPayment: function () {
        return this.cost * this.minPaymentPercents;
    },
    getMaxPayment: function () {
        return this.cost * this.maxPaymentPercents;
    },
    minYear: 1,
    maxYear: 30,
    time: 10,
    programs: {
        base: 0.1,
        it: 0.047,
        gov: 0.067,
        zero: 0.12,
    },
};

let results = {
    rate: data.selectedProgram,
};

function getData() {
    return { ...data };
}

function getResults() {
    return { ...results };
}

function setData(newData) {
    console.log('New data', newData);

    if (newData.onUpdate === 'radioProgram') {
        if (newData.id === 'zero-value') {
            data.minPaymentPercents = 0;
        } else {
            data.minPaymentPercents = 0.15;
        }
    }

    if (newData.onUpdate === 'inputCost' || newData.onUpdate === 'costSlider') {
        // Обновление цены
        // Если стоимость меньше мин цены
        if (newData.cost < data.minPrice) newData.cost = data.minPrice;

        // Если стоимость больше макс цены
        if (newData.cost > data.maxPrice) newData.cost = data.maxPrice;

        // Если новая стоимость меньше первоначалки
        if (data.payment > data.getMaxPayment()) {
            data.payment = data.getMaxPayment();
        }

        // Если сумма первоначалки меньше чем допустимый мин платеж
        if (data.payment < data.getMinPayment()) {
            data.payment = data.getMinPayment();
        }
    }

    if (newData.onUpdate === 'inputPayment') {
        // Пересчитываем %
        newData.paymentPercents = (newData.payment * 100) / data.cost / 100;

        // Если проценты больше 90%
        if (newData.paymentPercents > data.maxPaymentPercents) {
            newData.paymentPercents = data.maxPaymentPercents;
            newData.payment = data.cost * data.maxPaymentPercents;
        }

        // Если проценты меньше 90%
        if (newData.paymentPercents < data.minPaymentPercents) {
            newData.paymentPercents = data.minPaymentPercents;
            newData.payment = data.cost * data.minPaymentPercents;
        }
    }

    if (newData.onUpdate === 'paymentSlider') {
        newData.paymentPercents = newData.paymentPercents / 100;
        data.payment = data.cost * newData.paymentPercents;
    }

    if (newData.onUpdate === 'inputTime') {
        if (newData.time > data.maxYear) {
            newData.time = data.maxYear;
        }

        if (newData.time < data.minYear) {
            newData.time = data.minYear;
        }
    }

    data = {
        ...data,
        ...newData,
    };

    // Рассчет ипотеки
    const months = data.time * 12;
    console.log('months', months);

    const totalAmount = data.cost - data.payment;
    console.log('totalAmount', totalAmount);

    const monthRate = data.selectedProgram / 12;
    console.log('monthRate', monthRate);

    const generalRate = (1 + monthRate) ** months;
    console.log('generalRate', generalRate);

    const monthPayment = (totalAmount * monthRate * generalRate) / (generalRate - 1);
    console.log('monthPayment', monthPayment);

    const overPayment = monthPayment * months - totalAmount;
    console.log('overPayment', overPayment);

    results = {
        rate: data.selectedProgram,
        totalAmount,
        monthPayment,
        overPayment
    };

    console.log('Updated data', data);
    console.log('New resulst', results);
}

export { getData, setData, getResults };
