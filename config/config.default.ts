import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

const isInnerIp = ip => ip === '127.0.0.1' || 'localhost' || '192.168.107.166';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610182470401_4716';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // csrf
  const innerCsrfConfig = {
    security: {
      csrf: {
        // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
        ignore: ctx => isInnerIp(ctx.ip),
      },
    },
  };

  // mysql
  const mysqlConfig = {
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '12345556',
        // 数据库名
        database: 'eggdatabase',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    ...innerCsrfConfig,
    ...mysqlConfig,
  };
};
