import fs from "node:fs";
import path from "node:path";

import YAML from "js-yaml";

const SOURCE_DEFAULTS = {
  enabled: true,
  mode: "auto",
  ingestion_mode: "page_scrape",
  parser: "generic_links",
  group: "foreign_media",
  bucket_hint: "hot_news",
  trust_tier: "medium",
  promotional_risk: "medium",
  lookback_days: 2,
  weight: 0,
  include_keywords: [],
  exclude_keywords: [],
  include_url_patterns: [],
  required_inputs: [],
};

function toPath(input) {
  if (input instanceof URL) return input;
  return path.resolve(String(input || ""));
}

function normalizeSource(source, defaults) {
  const merged = {
    ...SOURCE_DEFAULTS,
    ...defaults,
    ...source,
  };

  return {
    id: String(merged.id || merged.name || "").trim(),
    name: String(merged.name || merged.id || "").trim(),
    enabled: merged.enabled !== false,
    mode: String(merged.mode || SOURCE_DEFAULTS.mode).trim(),
    ingestion_mode: String(
      merged.ingestion_mode || merged.type || SOURCE_DEFAULTS.ingestion_mode
    ).trim(),
    parser: String(merged.parser || SOURCE_DEFAULTS.parser).trim(),
    group: String(merged.group || SOURCE_DEFAULTS.group).trim(),
    bucket_hint: String(merged.bucket_hint || SOURCE_DEFAULTS.bucket_hint).trim(),
    trust_tier: String(merged.trust_tier || SOURCE_DEFAULTS.trust_tier).trim(),
    promotional_risk: String(
      merged.promotional_risk || SOURCE_DEFAULTS.promotional_risk
    ).trim(),
    url: String(merged.url || "").trim(),
    feed_url: String(merged.feed_url || "").trim(),
    api_url: String(merged.api_url || merged.apiUrl || "").trim(),
    display_name_zh: String(merged.display_name_zh || merged.displayNameZh || "").trim(),
    link_selector: String(merged.link_selector || merged.linkSelector || "").trim(),
    lookback_days: Number(merged.lookback_days || SOURCE_DEFAULTS.lookback_days),
    weight: Number(merged.weight || 0),
    include_keywords: Array.isArray(merged.include_keywords)
      ? merged.include_keywords.map((item) => String(item).trim()).filter(Boolean)
      : [],
    exclude_keywords: Array.isArray(merged.exclude_keywords)
      ? merged.exclude_keywords.map((item) => String(item).trim()).filter(Boolean)
      : [],
    include_url_patterns: Array.isArray(merged.include_url_patterns)
      ? merged.include_url_patterns.map((item) => String(item).trim()).filter(Boolean)
      : [],
    required_inputs: Array.isArray(merged.required_inputs)
      ? merged.required_inputs.map((item) => String(item).trim()).filter(Boolean)
      : [],
    notes: String(merged.notes || "").trim(),
  };
}

export function loadSourceRegistry(filePathOrUrl) {
  const rawText = fs.readFileSync(toPath(filePathOrUrl), "utf8");
  const raw = YAML.load(rawText) || {};
  const defaults = raw.defaults && typeof raw.defaults === "object" ? raw.defaults : {};
  const sources = Array.isArray(raw.sources) ? raw.sources : [];

  return {
    defaults,
    sources: sources.map((source) => normalizeSource(source, defaults)),
  };
}
