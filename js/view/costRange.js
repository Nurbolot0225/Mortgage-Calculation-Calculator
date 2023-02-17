function init(getData) {
    const slider = document.getElementById('slider-cost');
    const data = getData();

    noUiSlider.create(slider, {
        start: data.cost,
        connect: 'lower',
        tooltips: true,
        step: 100000,
        range: {
            min: data.minPrice,
            '1%': [400000, 100000],
            '50%': [10000000, 500000],
            max: data.maxPrice,
        },
        format: wNumb({
            decimals: 0,
            thousand: ' ',
            suffix: ''
        })
    })
}

export default init;