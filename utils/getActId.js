const { getHeaders, getHttpsAgent } = require('./agent')
const axios = require('axios')

const getActId = async (cookie, proxy) => {
  try {
    const headers = getHeaders(cookie)

    const opt = {
      headers
    }

    if (proxy) {
      opt.httpsAgent = getHttpsAgent(proxy)
    }

    const response = await axios.get(
      'https://adsmanager.facebook.com/adsmanager/manage/ad_account_settings/ad_account_setup',
      opt
    )

    const responseText = response.data || ''

    const tokenMatch = responseText.match(/"adAccountID":"([^"]+)"/)

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

module.exports = { getActId }
