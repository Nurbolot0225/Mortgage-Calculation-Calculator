import {priceFormatters, priceFormattersDecimals} from "../utils/formatters.js";

function updateResultsView(results) {
    document.getElementById('total-percent').innerHTML = results.rate * 100 + '%';
    document.getElementById('total-month-payment').innerHTML = priceFormattersDecimals.format(results.monthPayment);
    document.getElementById('total-cost').innerHTML = priceFormatters.format(results.totalAmount);
    document.getElementById('total-overpayment').innerHTML = priceFormattersDecimals.format(results.overPayment);
}

export default updateResultsView;