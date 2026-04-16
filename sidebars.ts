import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import openApiSidebarItems from './docs/api/sidebar';

const sidebars: SidebarsConfig = {
  apiSidebar: [
    'intro',
    'authentication',
    {
      type: 'category',
      label: 'Agent Registry',
      collapsed: false,
      items: [
        'registry/overview',
        'registry/create-agent',
        'registry/get-agent',
        'registry/upsert-agent',
        'registry/delete-agent',
        'registry/version-status',
        'registry/list-my-agents',
      ],
    },
    {
      type: 'category',
      label: 'Agent Upload',
      items: [
        'upload/upload-zip',
        'upload/upload-directory',
        'upload/download-agent',
        'upload/list-upload-agents',
      ],
    },
    {
      type: 'category',
      label: 'Agent Lifecycle',
      items: [
        'lifecycle/update-agent',
        'lifecycle/rollback-agent',
        'lifecycle/version-history',
        'lifecycle/build-records',
        'lifecycle/deployment-records',
      ],
    },
    {
      type: 'category',
      label: 'GitHub Integration',
      items: [
        'github/overview',
        'github/login',
        'github/repositories',
        'github/clone-repo',
      ],
    },
    {
      type: 'category',
      label: 'N8N Integration',
      items: [
        'n8n/connect',
        'n8n/credentials',
        'n8n/workflows',
        'n8n/register-workflow',
      ],
    },
    {
      type: 'category',
      label: 'Chat Sessions',
      items: [
        'chat/create-session',
        'chat/get-history',
        'chat/list-sessions',
        'chat/delete-session',
      ],
    },
    {
      type: 'category',
      label: 'Observability',
      items: [
        'observability/overview',
        'observability/sessions',
        'observability/traces',
        'observability/spans',
        'observability/agent-stats',
      ],
    },
    {
      type: 'category',
      label: 'Search',
      items: [
        'search/search-agents',
        'search/search-users',
      ],
    },
    {
      type: 'category',
      label: 'NANDA Registry',
      items: [
        'nanda/overview',
        'nanda/agents',
        'nanda/messages',
        'nanda/statistics',
      ],
    },
  ],
  cliSidebar: [
    'cli/overview',
    'cli/authentication-and-configuration',
    'cli/command-reference',
    {
      type: 'category',
      label: 'Command Groups',
      collapsed: false,
      items: [
        'cli/commands/auth',
        'cli/commands/cluster',
        'cli/commands/setup',
        'cli/commands/agent',
        'cli/commands/github',
        'cli/commands/n8n',
        'cli/commands/chat',
        'cli/commands/search',
        'cli/commands/observe',
        'cli/commands/access',
        'cli/commands/user',
        'cli/commands/local',
        'cli/commands/images',
      ],
    },
    'cli/setup-and-local-operations',
  ],
  openApiSidebar: openApiSidebarItems,
};

export default sidebars;
