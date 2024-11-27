const { getHeaders } = require('../utils/agent')
const axios = require('axios')

const login = async (req, res) => {
  try {
    const cookie = req.body.cookie || ''

    const headers = getHeaders(cookie)
    
    const [responseToken, responseBusinessId] = await Promise.all([axios.get('https://business.facebook.com/content_management', { headers }), axios.get('https://business.facebook.com/settings/ad-accounts', { headers })])

    // Use a regular expression to extract the access token
    const tokenMatch = (responseToken.data || '').match(/{"accessToken":"(EAA\w+)/)
    const busIdMatch = (responseBusinessId.data || '').match(/business_id=(\w+)/)

    if (tokenMatch && busIdMatch && tokenMatch[1] && busIdMatch[1]) {
      return res
        .json({
          token: tokenMatch[1],
          businessId: busIdMatch[1]
        })
        .status(200)
    } else {
      return res
        .json({
          error: 'Cookie invalid'
        })
        .status(401)
    }

  } catch (error) {
    console.log('login error: ', error)
    return res
      .json({
        error: 'Server error'
      })
      .status(401)
  }
}

module.exports = { login }
