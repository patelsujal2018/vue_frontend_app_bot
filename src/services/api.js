import axios from 'axios'

function getAxios() {
    const instance = axios.create({
        baseURL: process.env.VUE_APP_API_URL
    });
    instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    return instance;
}

export async function get(url, { params } = {}, { headers } = {}) {
    try {
        const response = await getAxios().get(url,{
            headers:headers,
            params:{ params }
        })
        return response
    } catch (err) {
        console.log(err);
        return {
            data: {
                success: false
            }
        }
    }
}

export async function post(url, data, headers) {
    try {
        const response = await getAxios().post(url, data, headers)
        return response
    } catch (err) {
        console.log(err)
        return {
            data: {
                success: false,
                errors:err
            }
        }
    }
}

export async function put(url, data, headers) {
    try {
        const response = await getAxios().put(url, data, headers)
        return response
    } catch (err) {
        console.log(err)
        return {
            data: {
                success: false,
                errors:err
            }
        }
    }
}

export async function destroy(url, { headers } = {}) {
    try {
        const response = await getAxios().delete(url,{
            headers:headers
        })
        return response
    } catch (err) {
        console.log(err);
        return {
            data: {
                success: false
            }
        }
    }
}