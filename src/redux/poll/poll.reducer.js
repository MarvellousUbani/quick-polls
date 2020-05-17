import {PollActionTypes} from './poll.types'

const polls = (state={}, action) => {
    switch(action.type){
        case PollActionTypes.RECEIVE_POLLS:
            return{
                ...state,
                ...action.polls
            }
        case PollActionTypes.ADD_POLL:
            return{
                ...state,
                [action.poll.id] : action.poll,
            }
        case PollActionTypes.UPDATE_POLL:
            const usersAnswered  = state[action.id].users_answered;
            return{
                ...state,
                [action.id]:{
                    ...state[action.id],
                    users_answered: usersAnswered.some(user => user.name === action.authedUser.currentUser) ? usersAnswered : usersAnswered.concat([{name: action.authedUser.currentUser, answer:action.answer }])
                }
            }

        default:
            return state
    }
}

export default polls;