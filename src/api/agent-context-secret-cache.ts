import type { LookupSecret } from "./secret-lookup";

/**
 * Reuse the startup lookup map for agent-context consumers that initialize
 * after the request payload is assembled. Keeping one descriptor map avoids
 * rebuilding URLs and backend headers for ACP startup and tool initialization.
 */
export function cacheSecretLookupsInAgentContext(
  agentContext: Record<string, unknown>,
  secretLookups: Record<string, LookupSecret>,
): Record<string, unknown> {
  if (Object.keys(secretLookups).length === 0) {
    return agentContext;
  }

  return {
    ...agentContext,
    secrets: secretLookups,
    secret_lookup_names: Object.keys(secretLookups),
  };
}
