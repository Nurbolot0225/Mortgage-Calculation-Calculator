function updateResultsView(results) {
    document.getElementById('total-percent').innerHTML = results.rate * 100 + '%';
}

export default updateResultsView;