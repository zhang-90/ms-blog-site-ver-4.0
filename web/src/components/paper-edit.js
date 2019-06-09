'use strict';

const { connect } = require('react-redux');

const UI_paperEdit = require('/components/ui-components/paper-edit');
const actions = require('/actions');

const mapState2Props = (state, props) => state.appReducer;  //  eslint-disable-line

const mapDispatch2Props = (dispatch, props) => ({   //  eslint-disable-line
});

const PaperEdit = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_paperEdit);

module.exports = PaperEdit;
