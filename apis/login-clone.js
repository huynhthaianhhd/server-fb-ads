const { getActId } = require('../utils/getActId')
const { getDtsgToken } = require('../utils/getDtsgToken')

const loginClone = async (req, res) => {
  try {
    const cookie = req.body.cookie || ''
    const proxy = req?.body?.proxy || ''

    const promises = [getActId(cookie, proxy), getDtsgToken(cookie, proxy)]

    const [actId, dtsgToken] = await Promise.all(promises)

    return res
      .json({
        actId,
        dtsgToken
      })
      .status(200)
  } catch (error) {
    console.log('loginClone error: ', error)
    return res
      .json({
        error: 'Server error'
      })
      .status(401)
  }
}

module.exports = { loginClone }
