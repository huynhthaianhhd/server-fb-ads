const axios = require('axios')
const { getUserAgent, getHttpsAgent } = require('./agent')

const acceptClone = async (cookie, payload, proxy) => {
  try {
    const {
      actId = '',
      marketId = '',
      businessId = '',
      dstgToken = ''
    } = payload


    const headers = {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/x-www-form-urlencoded',
      cookie: cookie,
      origin: 'https://adsmanager.facebook.com',
      priority: 'u=1, i',
      referer: `https://adsmanager.facebook.com/adsmanager/manage/ad_account_settings/ad_account_setup?act=${actId}&breakdown_regrouping=1&nav_source=no_referrer`,
      'user-agent': getUserAgent()
    }
    const opt = {
      headers
    }

    if (proxy) {
      opt.httpsAgent = getHttpsAgent(proxy)
    }

    const url =
      'https://adsmanager.facebook.com/adaccount/agency/request/accept_reject/?_callFlowletID=0'

    const data = new URLSearchParams()
    data.append('ad_market_id', marketId)
    data.append('agency_id', businessId)
    data.append('operation', '0')
    data.append('fb_dtsg', dstgToken)

    const response = await axios.post(url, data, opt)

    return true

  } catch (error) {
    console.log('acceptClone error')
    return false
  }
}

module.exports = { acceptClone }
