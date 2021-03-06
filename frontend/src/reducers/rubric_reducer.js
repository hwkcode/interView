import { RECEIVE_RUBRIC, RECEIVE_RUBRICS, REMOVE_RUBRIC } from "../actions/rubric_actions";

const RubricsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_RUBRIC:
            return Object.assign({}, nextState, action.rubric.data)
        case RECEIVE_RUBRICS:
            return action.rubrics.data;
        case REMOVE_RUBRIC:
            delete nextState[action.rubricId];
            return nextState;
        default:
            return state;
    }
};

export default RubricsReducer;