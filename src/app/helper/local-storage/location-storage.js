
/**
 * save data to local storage
 * @param {*} key 
 * @param {*} data 
 */
export const SET_LOCAL_STORAGE_DATA = (key, data) => {
    localStorage.setItem(key, data)
}

/**
 * get data from local storage
 * @param {*} key 
 */
export const GET_LOCAL_STORAGE_DATA = (key) => {
    return localStorage.getItem(key)
}


/**
 * remove data from local storage particular key
 * @param {*} key 
 */
export const REMOVE_LOCAL_STORAGE_DATA = (key) => {
    localStorage.removeItem(key)
}


/**
 * remove all key and data from local storage
 */
export const CLEAR_LOCAL_STORAGE = () => {
    localStorage.clear()
}