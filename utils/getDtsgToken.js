const { getHeaders, getHttpsAgent } = require('./agent')
const axios = require('axios')

const getDtsgToken = async (cookie, proxy) => {
  try {
    const headers = getHeaders(cookie)
    const opt = {
      headers
    }
    if (proxy) {
      opt.httpsAgent = getHttpsAgent(proxy)
    }

    const response = await axios.get('https://m.facebook.com', opt)

    const responseText = response.data || ''

    // const tokenMatch = responseText.match(/{"token":"NA(\w+)/)
    const tokenMatch = responseText.match(/"token":"(NAc[^"]+)"/)

    if (tokenMatch && tokenMatch[1]) {
      return tokenMatch[1]
    } else {
      return ''
    }
  } catch (error) {
    console.log('getDtsgToken error')
    return ''
  }
}

module.exports = { getDtsgToken }
