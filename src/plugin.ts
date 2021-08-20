import * as Plugin from 'serverless/classes/Plugin';
import * as Serverless from 'serverless';

interface OptionsExtended extends Serverless.Options {
  verbose?: boolean;
}

export class ServerlessJestToolsPlugin implements Plugin {
  options: OptionsExtended;
  serverless: Serverless;
  hooks: Plugin.Hooks;
  commands: Plugin.Commands;

  constructor(serverless: Serverless, options: OptionsExtended) {
    this.options = options;
    this.serverless = serverless;
    this.commands = {
      integrationTests: {
        lifecycleEvents: ['test'],
        usage: 'Run jest integration tests',
      },
    };
    this.hooks = {
      'integrationTests:test': async () => {
        await Promise.resolve();
        // @ts-ignore not up to date
        console.log('HELLO', this.serverless.config.configurationInput);
      },
    };
  }
}
