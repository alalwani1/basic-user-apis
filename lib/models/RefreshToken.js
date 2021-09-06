var refreshTokens = []

const addToken = async (token) => {
    refreshTokens.push(token);
}

const revokeToken = async(tokenToExpire) => {
    refreshTokens = refreshTokens.filter(refreshToken => refreshToken !== tokenToExpire);
}

const findToken = async(token) => {
    let result =  refreshTokens.filter(refreshToken => refreshToken == token)[0]==token?true:false;
    return result;
}

module.exports = {
    addToken,
    revokeToken,
    findToken
};