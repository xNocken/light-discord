const needle = require('needle')
const baseUrl = 'https://discordapp.com/api/v9';

const sendRequest = async (url, method = 'GET', body = {}) => {
  const { body: response, statusCode } = await needle(method, `${baseUrl}${url}`, body, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
      authorization: globalData.getToken(),
    },
  });

  if (statusCode < 200 || statusCode >= 300) {
    console.log('got response code ' + statusCode, response);
  }

  return { response, statusCode };
}

module.exports = sendRequest;
