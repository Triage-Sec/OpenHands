type AgentSettingsWithContext = {
  agent_context: Record<string, unknown>;
};

/**
 * Reuse startup metadata across agent-context consumers without rebuilding it.
 */
export function cacheAgentStartupContext<T extends AgentSettingsWithContext>(
  agentSettings: T,
  startupContext: Record<string, unknown>,
): T {
  return {
    ...agentSettings,
    agent_context: {
      ...agentSettings.agent_context,
      ...startupContext,
    },
  };
}
