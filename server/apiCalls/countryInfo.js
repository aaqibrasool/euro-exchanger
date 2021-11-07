import axios from "axios"

const getCountryInfoApi = (api,name) => `${api}${name}`

export const getCountryInfo = async (api,name) => {
    const {data} = await axios.get(getCountryInfoApi(api,name))
    let currency
    if(data[0].currencies){
        currency = Object.keys(data[0]?.currencies)[0]
    }
    return {
        officialName: data[0].name.official,
        population: data[0].population,
        currency,
    }
}