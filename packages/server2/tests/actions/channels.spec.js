const assert = require('assert');
const {db} = require('../../src/infra/database');
const crypto = require('crypto');

module.exports = (connect) => {
  describe('channels', () => {
    it('should return list of channels', async () => {
      const ws = await connect('mateusz');
      const channels = await ws.send({
        type: 'channels',
      })
      const ret = channels.pop();
      assert.equal(ret.type, 'response');
      assert.equal(ret.status, 'ok');
      assert.equal(channels[0].type, 'channel');
      assert.equal(channels[0].channel.name, 'main');
      assert.equal(channels[1].type, 'channel');
      assert.equal(channels[1].channel.name, 'Mateusz');
      ws.close();
    })
  })
}
