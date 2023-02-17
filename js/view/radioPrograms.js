import updateModel from "../utils/updateModel.js";

function init(getData) {
    const radioBtns = document.querySelectorAll('input[name="program"]');
    const { base, it, gov, zero } = getData().programs;

    // Set program rates in buttons
    document.getElementById('base-value').value = base;
    document.getElementById('it-value').value = it;
    document.getElementById('gov-value').value = gov;
    document.getElementById('zero-value').value = zero;

    // Show program rates on page
    document.getElementById('base-text').innerText = base * 100 + '%';
    document.getElementById('it-text').innerText = it * 100 + '%';
    document.getElementById('gov-text').innerText = gov * 100 + '%';
    document.getElementById('zero-text').innerText = zero * 100 + '%';

    radioBtns.forEach(function (radioBtns) {
        radioBtns.addEventListener('change', function () {
            updateModel(this, {
                onUpdate: 'radioProgram',
                selectedProgram: parseFloat(this.value),
                id: this.id,
            });
        });
    });
}

export default init;
