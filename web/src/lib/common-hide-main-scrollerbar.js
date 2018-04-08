'use strict';
/* global $ */
const $app = $('#app');

function hideMainScrollerbar() {
    const offsetWidth = $app.prop('offsetWidth');
    const clientWidth = $app.prop('clientWidth');
    const offsetVal = Math.abs(offsetWidth - clientWidth + 2);

    $app.css('margin-right', `-${offsetVal}px`);
}

module.exports = hideMainScrollerbar;
