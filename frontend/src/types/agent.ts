export interface AgentProfile {
  id: string;
  name: string;
  description: string;
  system_prompt: string;
  gender?: string;
  voice_id?: string;
  avatar_url?: string;
}

export interface CreateAgentRequest {
  name: string;
  description: string;
  system_prompt: string;
  gender?: string;
  voice_id?: string;
  avatar_url?: string;
}

export interface UpdateAgentRequest {
  name?: string;
  description?: string;
  system_prompt?: string;
  gender?: string;
  voice_id?: string;
  avatar_url?: string;
}
