const { getDtsgToken } = require('../utils/getDtsgToken')
const { getAdMarketId } = require('../utils/getAdMarketId')
const { getActId } = require('../utils/getActId')
const { addCloneAccount } = require('../utils/postAddAccount')
const { acceptClone } = require('../utils/postAcceptClone')

const addNAcceptClone = async (req, res) => {
  try {
    const bm = req?.body?.bm || {
      key: '',
      id: '',
      businessId: '656864571766117',
      cookie:
        'sb=66pBZ4ARiJxnLHabHUXKkjhr;datr=66pBZ8hlD8zREDUkIPIyNJI9;c_user=61562411152034;ps_l=1;ps_n=1;cppo=1;fr=1oJQAhLafKwtV38wo.AWUYj_DF5GHW_gyMuS2xOfptCFE.BnRyLg..AAA.0.0.BnRyLg.AWX54qDM8Xw;xs=37%3Aw9Cx8O5xsEANWg%3A2%3A1732356891%3A-1%3A5602%3A%3AAcXxe0p3U0wnhCwn0OnGWqovXsZXtiSf-DFpv789zxA;wd=978x1305;usida=eyJ2ZXIiOjEsImlkIjoiQXNubTJoZ2FtYzkyNyIsInRpbWUiOjE3MzI3MTUzOTZ9;presence=EDvF3EtimeF1732715399EuserFA261562411152034A2EstateFDutF0CEchF_7bCC;',
      token:
        'EAAGNO4a7r2wBO3emQz6L7Ed8JWOc7VTxfuPum8qmN7hxL2EtSqeO3kIgRrQZCrEZAiTnZB19PviD4iozcTBDkwuHmMJuy8oSKo8k8qRp4OaevgZACiEshDFHxv0fzTqIZCu09tyZCNmbo3JKBg9SAswBoPgmj00BGXCkZC1XoxR1DCHqdjYDEmntCTQNAZDZD'
    }

    const clone = req?.body?.clone || {
      key: '',
      id: '',
      cookie:
        'locale=vi_VN;datr=qm6XZl-nN3iN0sg4XUeap5iG;c_user=61562344529731;ps_l=1;ps_n=1;dpr=0.25;sb=Q9OVZvKQ7fF-yJVjqs0FWgQ_;wd=1740x1277;usida=eyJ2ZXIiOjEsImlkIjoiQXNubWh0ejFib2lqeWYiLCJ0aW1lIjoxNzMyNzMzNjM5fQ%3D%3D;fr=1iY288qKBSEDNtMZN.AWWnK0v7mbr419HSaKNAzx6YQYw.BnR2rH..AAA.0.0.BnR2rH.AWV8yOcRpnQ;xs=31%3ACJdSfMGOaSYOQQ%3A2%3A1721095004%3A-1%3A-1%3A%3AAcVgwTfwMnMJNpIrhKIZ0_OyQtVN6h9TvP3ZTvSRrw;presence=EDvF3EtimeF1732733641EuserFA261562344529731A2EstateFDutF0CEchF_7bCC;',
      token: ''
    }
    const proxy = req?.body?.proxy || ''

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

    if (status === 'PENDING') {
      console.log('\n Business request account: ', clone.id)
    }

    const success = await acceptClone(clone.cookie, {
      actId,
      marketId,
      businessId: bm.businessId,
      dstgToken
    })

    return success
  } catch (error) {
    console.log('Server error: ', error)
    // return res
    //   .json({
    //     error: 'Server error'
    //   })
    //   .status(401)
  }
}

module.exports = { addNAcceptClone }
