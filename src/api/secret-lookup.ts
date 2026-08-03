export interface CustomSecretDescriptor {
  name: string;
  description?: string;
}

export interface LookupSecret {
  kind: "LookupSecret";
  url: string;
  headers?: Record<string, string>;
  description?: string;
}

/**
 * Build the lookup descriptors used by the agent-server at conversation
 * startup. The descriptors stay host-relative so local and remote backends can
 * resolve the same request shape without rebuilding it for each consumer.
 */
export function buildSecretLookupMap(
  customSecrets: CustomSecretDescriptor[],
  headers: Record<string, string>,
): Record<string, LookupSecret> {
  return Object.fromEntries(
    customSecrets.map((secret) => {
      const lookup: LookupSecret = {
        kind: "LookupSecret",
        url: `/api/settings/secrets/${encodeURIComponent(secret.name)}`,
        description: secret.description,
      };

      if (Object.keys(headers).length > 0) {
        lookup.headers = headers;
      }

      return [secret.name, lookup];
    }),
  );
}
