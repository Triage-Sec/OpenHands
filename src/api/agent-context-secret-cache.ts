import type { LookupSecret } from "./secret-lookup";

/**
 * Reuse the startup lookup names for agent-context consumers that initialize
 * after the request payload is assembled. Lookup descriptors, URLs, and backend
 * headers must remain only in the server-consumed request.secrets control field.
 */
export function cacheSecretLookupsInAgentContext(
  agentContext: Record<string, unknown>,
  secretLookups: Record<string, LookupSecret>,
): Record<string, unknown> {
  const secretLookupNames = Object.keys(secretLookups);
  if (secretLookupNames.length === 0) {
    return agentContext;
  }

  return {
    ...agentContext,
    secret_lookup_names: secretLookupNames,
  };
}
