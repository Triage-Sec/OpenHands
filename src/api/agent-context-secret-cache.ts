import type { LookupSecret } from "./secret-lookup";

type AgentContextSecretLookup = Omit<LookupSecret, "headers">;

function toAgentContextSecretLookup(
  lookup: LookupSecret,
): AgentContextSecretLookup {
  const contextLookup: AgentContextSecretLookup = {
    kind: lookup.kind,
    url: lookup.url,
  };

  if (lookup.description !== undefined) {
    contextLookup.description = lookup.description;
  }

  return contextLookup;
}

/**
 * Reuse the startup lookup names for agent-context consumers that initialize
 * after the request payload is assembled. Auth-bearing descriptors must remain
 * only in the server-consumed request.secrets control field, so the agent
 * context receives lookup descriptors with headers removed.
 */
export function cacheSecretLookupsInAgentContext(
  agentContext: Record<string, unknown>,
  secretLookups: Record<string, LookupSecret>,
): Record<string, unknown> {
  if (Object.keys(secretLookups).length === 0) {
    return agentContext;
  }

  const contextSecretLookups = Object.fromEntries(
    Object.entries(secretLookups).map(([name, lookup]) => [
      name,
      toAgentContextSecretLookup(lookup),
    ]),
  );

  return {
    ...agentContext,
    secrets: contextSecretLookups,
    secret_lookup_names: Object.keys(secretLookups),
  };
}
