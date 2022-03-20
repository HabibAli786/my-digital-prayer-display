const init = {
    qr_toggle: false
}

const prayertimesReducer = (state = init, action) => {
    // console.log(action.payload)
    switch(action.type) {
        case 'SET_QR_TOGGLE':
            return {
                ...state,
                qr_toggle: action.payload
            }
        default:
            return state
    }
}

export default prayertimesReducer;