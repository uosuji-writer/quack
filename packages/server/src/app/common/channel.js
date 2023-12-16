const repo = require('../../infra/repositories');

module.exports = {
  haveAccess: async (userId, id) => {
    const channel = await repo.channel.get({ id });

    if (channel?.private
        && !channel.users?.includes(userId)) {
      return false;
    }
    return true;
  },
};
