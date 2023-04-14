const handleSuccess = require('../service/handleSuccess');
const handleErrorAsync = require('../service/handleErrorAsync');
const appError = require('../service/appError');
const { ImgurClient } = require('imgur');

const upload = {
  uploadImage: handleErrorAsync(async(req, res, next) => {
      if (req.files.length <= 0) {
        return next(appError(403, '請上傳圖片檔案', next))
      }
      const client = new ImgurClient({
        clientId: process.env.IMGUR_CLIENTID,
        clientSecret: process.env.IMGUR_CLIENT_SECRET,
        refreshToken: process.env.IMGUR_REFRESH_TOKEN,
      });
      const result = await client.upload({
        image: req.files[0]?.buffer.toString('base64'),
        type: 'base64',
        album: process.env.IMGUR_ALBUM_ID
      });
      handleSuccess(res, { url: result.data.link } );
  })
};

module.exports = upload;