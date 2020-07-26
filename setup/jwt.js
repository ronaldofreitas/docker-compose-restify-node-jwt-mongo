import jwt from 'jsonwebtoken'

const secret = '5t-(:/V*q{p^em51JIL>D[(-T1lWLm'

export const sign = payload => jwt.sign(payload, secret, { expiresIn: 86400 })
export const verify = token => jwt.verify(token, secret)