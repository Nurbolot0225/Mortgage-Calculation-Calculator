function updateMinPercents(data) {
    document.getElementById('percents-from').innerText = data.minPaymentPercents * 100 + '%';
}

export {updateMinPercents};