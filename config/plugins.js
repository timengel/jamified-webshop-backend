const generator = require('../utils/dummy-data-generator');

module.exports = ({ env }) => ({
  upload: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
    },
    actionOptions: {
      upload: {
        folder: 'jamified-webshop_' + generator.getTimestamp(),
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        async: false,
        tags: ['jamified-webshop'],
        invalidate: true,
        timeout: 60000,
      },
      delete: {},
    },
  },
});
