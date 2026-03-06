import fs from "node:fs/promises";

import YAML from "js-yaml";

async function loadYamlItems(filePathOrUrl, intakeMode) {
  try {
    const raw = YAML.load(await fs.readFile(filePathOrUrl, "utf8")) || {};
    const items = Array.isArray(raw.items) ? raw.items : [];

    return items.map((item) => ({
      sourceId: String(item.source_id || "").trim(),
      sourceName: String(item.source_name || "").trim(),
      sourceDisplayZh: String(item.source_display_zh || item.source_name_zh || "").trim(),
      title: String(item.title || "").trim(),
      titleZh: String(item.title_zh || item.zh_title || "").trim(),
      link: String(item.url || item.link || "").trim(),
      pubDate: String(item.published_at || item.pubDate || "").trim(),
      contentSnippet: String(item.summary || item.content_snippet || "").trim(),
      summary: String(item.summary || "").trim(),
      bucketHint: String(item.bucket_hint || "").trim(),
      trustTier: String(item.trust_tier || "").trim(),
      mode: intakeMode,
    }));
  } catch {
    return [];
  }
}

export async function loadLocalIntake({ manualPath, inboxPath }) {
  const [manualItems, inboxItems] = await Promise.all([
    loadYamlItems(manualPath, "manual"),
    loadYamlItems(inboxPath, "inbox"),
  ]);

  return [...manualItems, ...inboxItems].filter(
    (item) => item.sourceId && item.title && item.link
  );
}
