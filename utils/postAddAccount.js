const { getUserAgent } = require('./agent')
const axios = require('axios')

const addCloneAccount = async (cookie, payload) => {
  try {
    const { actId = '', businessId = '', token = '' } = payload

    const headers = {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded',
      cookie: cookie,
      origin: 'https://business.facebook.com',
      pragma: 'no-cache',
      referer: 'https://business.facebook.com/',
      'user-agent': getUserAgent()
    }
    const opt = {
      headers
    }

    const url =
      `https://graph.facebook.com/v17.0/${businessId}/client_ad_accounts?access_token=${token}&__cppo=1&_callFlowletID=0`


    const data = new URLSearchParams()
    data.append('_reqName', 'object:brand/client_ad_accounts')
    data.append('_reqSrc', 'AdAccountActions.brands')
    data.append('access_type', 'AGENCY')
    data.append('adaccount_id', `act_${actId}`)
    data.append('method', 'post')
    data.append('permitted_roles', '[]')
    data.append('permitted_tasks', '["ADVERTISE","ANALYZE","DRAFT","MANAGE"]')

    const response = await axios.post(url, data, opt)

    return response?.data?.access_status || ''
      
  } catch (error) {
    console.log('addCloneAccount error')
    return ''
  }
}

module.exports = { addCloneAccount }
