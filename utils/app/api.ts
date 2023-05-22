import { Plugin, PluginID } from '@/types/plugin';

export const getEndpoint = (plugin: Plugin | null) => {
  if (!plugin) {
    return 'chat';
  }

  if (plugin.id === PluginID.GOOGLE_SEARCH) {
    return 'google';
  }

  return 'chat';
};
