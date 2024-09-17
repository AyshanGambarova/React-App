//Helpers
import modal from './modal'

export const modalHelper = modal


// Table height
export const getTableHeight = () => {
    let height
    if (window.innerHeight < 900) {
        height = '55.7vh'
    } else if (window.innerHeight < 1200) {
        height = '65vh'
    } else {
        height = '75vh'
    }
    return height
}