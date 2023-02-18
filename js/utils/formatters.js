const priceFormatters = new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
});

const priceFormattersDecimals = new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2
});
// 7 000 000.45 Р

export {priceFormatters, priceFormattersDecimals}