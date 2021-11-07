import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
import * as exchangeRateApi from '../apiCalls/exchangeRate.js'
import * as countryInfoApi from '../apiCalls/countryInfo.js'
import { CACHE_EXPIRE_TIME, COUNTRY_INFO_API, EXCHANGE_RATE_BASE_API } from '../constant.js'
import getDateDiffInHours from '../utils/timeDiff.js'

dotenv.config()
let cacheCountries = []

export const returnCountryInfo = async (req, res) => {
    const { name } = req.params
    const countryAlreadyCached = cacheCountries.find(country => country.name === name)
    if(countryAlreadyCached) {
        returnAlreadyCachedCountry(res, countryAlreadyCached)
    } else {
        returnAndCacheNewCountry(res, name)
    }   
}

const returnAlreadyCachedCountry = (res, countryAlreadyCached) => {
    const {timeStamp,currency} = countryAlreadyCached
    const prevDate = new Date(timeStamp)
    const newDate = new Date()
    const dateDiffInHours = getDateDiffInHours(newDate,prevDate)
    const hasTimeStampExpired = dateDiffInHours > CACHE_EXPIRE_TIME
    if(hasTimeStampExpired){
        returnCachedCountryAfterUpdating(res,countryAlreadyCached)
    } else {
        return res.status(200).json({...countryAlreadyCached})
    }
}

const returnCachedCountryAfterUpdating = async (res, countryAlreadyCached) => {
    const {currency,name} = countryAlreadyCached
    const newExchangeRate =  await exchangeRateApi.getExchangeRate(EXCHANGE_RATE_BASE_API,process.env.ACCESS_KEY,currency)
    const countryInfo = {
        ...countryAlreadyCached,
        timeStamp: new Date(),
        exchangeRate: newExchangeRate,
    }
    cacheCountries = cacheCountries.map(country => country.name === name ? countryInfo : country) 
    return res.status(200).json(countryInfo)   
}

const returnAndCacheNewCountry = async (res, name) => {
    const {officialName,population,currency} = await countryInfoApi.getCountryInfo(COUNTRY_INFO_API,name)
    const id = uuidv4()
    let exchangeRate
    if(currency){
        exchangeRate = await exchangeRateApi.getExchangeRate(EXCHANGE_RATE_BASE_API,process.env.ACCESS_KEY,currency)
    }
    const countryInfo = {
        id,
        officialName,
        population,
        exchangeRate,
        name,
        currency,
        timeStamp: new Date()
    }
    cacheCountries.push(countryInfo)
    res.status(200).json(countryInfo)
}