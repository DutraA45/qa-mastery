module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '6.0.8',
      skipMD5: true
    },
    instance: {
      dbName: 'jest',
      storageEngine: 'wiredTiger'
    },
    autoStart: false
  }
};