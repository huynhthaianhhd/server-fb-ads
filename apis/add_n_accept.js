const { getDtsgToken } = require('../utils/getDtsgToken')
const { getAdMarketId } = require('../utils/getAdMarketId')
const { getActId } = require('../utils/getActId')
const { addCloneAccount } = require('../utils/postAddAccount')
const { acceptClone } = require('../utils/postAcceptClone')

const addNAcceptClone = async (req, res) => {
  const bm = req?.body?.bm || {
    key: '',
    id: '',
    businessId: '',
    cookie: '',
    token: ''
  }
  const clone = req?.body?.clone || {
    key: '',
    id: '',
    cookie: '',
    token: ''
  }
  const proxy = req?.body?.proxy || ''
  try {
    const [actId, dstgToken] = await Promise.all([
      getActId(clone.cookie, proxy),
      getDtsgToken(clone.cookie, proxy)
    ])

    const marketId = await getAdMarketId(
      clone.cookie,
      {
        actId,
        dstgToken
      },
      proxy
    )

    const status = await addCloneAccount(bm.cookie, {
      actId,
      businessId: bm.businessId,
      token: bm.token
    })

    console.log(
      `----------------------------------------------------------------------------------`
    )
    if (status === 'PENDING') {
      console.log('Business request account: ', clone.id)
    }

    const success = await acceptClone(clone.cookie, {
      actId,
      marketId,
      businessId: bm.businessId,
      dstgToken
    })

    if (success) {
      console.log('Accept clone success: ', clone.id)
      console.log(
        `---------------------------------------------------------------------------------- \n`
      )

      return res
        .json({
          success: true
        })
        .status(200)
    } else {
      return res
        .json({
          success: false
        })
        .status(200)
    }
  } catch (error) {
    console.log('\n Process fail: ', clone.id)
    res
      .json({
        success: false
      })
      .status(401)
  }
}

module.exports = { addNAcceptClone }
