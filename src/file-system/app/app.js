const fs = require("fs/promises");

(async () => {
  try {
    const watcher = await fs.watch('./command.txt');
    for await (const event of watcher) {
      console.log(event);
    }
  } catch (e) {
    console.log(e);
  }
})();