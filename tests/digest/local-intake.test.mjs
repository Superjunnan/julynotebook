import test from "node:test";
import assert from "node:assert/strict";

import { loadLocalIntake } from "../../tools/intel/local-intake.mjs";

test("loadLocalIntake reads manual and inbox items into normalized candidates", async () => {
  const items = await loadLocalIntake({
    manualPath: new URL("../fixtures/local-intake/manual.yml", import.meta.url),
    inboxPath: new URL("../fixtures/local-intake/inbox.yml", import.meta.url),
  });

  assert.equal(items.length, 2);
  assert.equal(items[0].sourceId, "andrej-karpathy");
  assert.equal(items[1].sourceId, "the-information-ai");
});
