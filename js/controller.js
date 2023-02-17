import * as Model from './model.js';
import updateResultsView from "./view/updateResultsView.js";
import programs from './view/radioPrograms.js';
import {updateMinPercents} from "./view/utils.js";

import costInput from "./view/costInput.js";
import costRange from "./view/costRange.js";

import paymentInput from "./view/paymentInput.js";
import paymentRange from "./view/paymentRange.js";

import timeInput from "./view/timeInput.js";
import timeRange from "./view/timeRange.js ";

window.onload = function() {
    const getData = Model.getData;

    // Init programs
    programs(getData);

    // Init Cost input
    const cleaveCost = costInput(getData);
    const sliderCost = costRange(getData);

    // Init Payment input
    const cleavePayment = paymentInput(getData);
    const sliderPayment = paymentRange(getData);

    // Time
    const cleaveTime = timeInput(getData);
    const sliderTime = timeRange(getData);

    document.addEventListener('updateForm', (e) => {
        Model.setData(e.detail);

        const data = Model.getData();
        const results = Model.getResults();

        // Update all form view based on model
        updateFormAndSliders(data);

        // Update results block
        updateResultsView(results);
    });

    function updateFormAndSliders(data) {
        // Updated radio buttons
        if (data.onUpdate === 'radioProgram') {
            updateMinPercents(data);

            // update payment slider
            sliderPayment.noUiSlider.updateOptions({
                range: {
                    min: data.minPaymentPercents * 100,
                    max: data.maxPaymentPercents * 100,
                },
            });
        }

        // costInput
        if (data.onUpdate !== 'inputCost') {
            cleaveCost.setRawValue(data.cost);
        }

        // costSlider
        if (data.onUpdate !== 'costSlider') {
            sliderCost.noUiSlider.set(data.cost);
        }

        // paymentInput
        if (data.onUpdate !== 'inputPayment') {
            cleavePayment.setRawValue(data.payment);
        }

        // paymentSlider
        if (data.onUpdate !== 'paymentSlider') {
            sliderPayment.noUiSlider.set(data.paymentPercents * 100);
        }

        // timeInput
        if (data.onUpdate !== 'inputTime') {
            cleaveTime.setRawValue(data.time);
        }

        // timeSlider
        if (data.onUpdate !== 'timeSlider') {
            sliderTime.noUiSlider.set(data.paymentPercents);
        }
    }
}