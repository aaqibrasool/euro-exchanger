import axios from "axios"

const getExchangeRateApi = (baseApi,access_key,currency) => `${baseApi}${access_key}&base=EUR&symbols=${currency}`

export const getExchangeRate = async (baseApi,accessKey,currency) => {
    const { data } = await axios.get(getExchangeRateApi(baseApi,accessKey,currency))
    return data.rates[Object.keys(data.rates)[0]]
}