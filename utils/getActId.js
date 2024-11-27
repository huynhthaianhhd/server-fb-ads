const { getHeaders, getHttpsAgent } = require('./agent')
const axios = require('axios')

const getActIdApis = async (cookie, proxy) => {
  try {
    const headers = getHeaders(cookie)

    const opt = {
      headers
    }

    if (proxy) {
      opt.httpsAgent = getHttpsAgent(proxy)
    }

    const response = await axios.get('https://adsmanager.facebook.com/adsmanager/manage/ad_account_settings/ad_account_setup', opt)

    const responseText = response.data || ''

    const tokenMatch = responseText.match(/act=(\w+)/)

    if (tokenMatch && tokenMatch[1]) {
      return tokenMatch[1]
    } else {
      return ''
    }
  } catch (error) {
    console.log('getActIdApis error')
    return ''
  }
}
const getActId = async (cookie, proxy) => {
  const actId = await getActIdApis(cookie, proxy)

  if (actId) {
    return actId
  } 

  const actId2 = await getActIdApis(cookie, proxy)

  if (actId2) {
    return actId2
  } 
  
  return getActIdApis(cookie, proxy)
}

module.exports = { getActId }
