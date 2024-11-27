const { getHeadersForJson, getHttpsAgent } = require('./agent')
const axios = require('axios')

const getAdMarketId = async (cookie, payload, proxy) => {
  try {
    const { actId = '', dstgToken = '' } = payload
    const headers = getHeadersForJson(cookie)

    const opt = {
      headers
    }

    if (proxy) {
      opt.httpsAgent = getHttpsAgent(proxy)
    }

    const data = new URLSearchParams()
    data.append('fb_dtsg', dstgToken)
    data.append('variables', `{"adAccountID":"${actId}"}`)
    data.append('doc_id', '6170191853109064')

    const response = await axios.post(
      'https://adsmanager.facebook.com/api/graphql',
      data,
      opt
    )

    return response.data?.data?.ad_account?.id || ''
  } catch (error) {
    console.log('getAdMarketId error')
    return ''
  }
}

module.exports = { getAdMarketId }
