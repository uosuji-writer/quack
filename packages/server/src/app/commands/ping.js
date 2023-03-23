const crypto = require('crypto');
const db = require('../../infra/database');

module.exports = {
  name: 'ping:send',
  description: 'sends ping on channel from thread',
  args: [],
  handler: async (req, res) => {
    const { channelId, parentId } = req.body.context;
    if (!parentId) {
      throw new Error('No parent message');
    }
    const parent = await db.message.get({ id: parentId });
    if (!parent) {
      throw new Error('Parent message not found');
    }
    const channel = await db.channel.get({ id: channelId });
    // FIXME: check permissions

    const lines = parent.flat.split('\n');
    const { id } = await createMessage({
      clientId: crypto.randomBytes(16).toString('hex'),
      message: [{
        line: [{ text: '[PING] from ' }, { thread: { channelId, parentId, text: lines[0] + (lines.length >= 2 ? '...' : '') } }],
      }],
      flat: '[PING] from thread',
      channelId,
      channel: channel.cid,
      userId: req.userId,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    const msg = await db.message.get({ id });
    await res.broadcast({ type: 'message', ...msg });
    return res.ok();
  },
};

async function createMessage(msg) {
  const data = Object.fromEntries(Object.entries(msg).filter(([, v]) => v !== undefined));
  let id; let
    dup = false;
  try {
    ({ id } = await db.message.insert(data));
  } catch (err) {
    if (err.code !== 11000) {
      throw err;
    }
    dup = true;
  }
  return { id, dup };
}
