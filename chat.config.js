//FIXME: this is temporary fix for config loading in tests
module.exports = process.env.NODE_ENV === 'test' ? require('./tests/chat.config.js') : (()=>{
  throw new Error('Missing config');
})();
