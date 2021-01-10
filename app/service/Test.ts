import { Service } from 'egg';
import mysql = require('mysql');
import dayjs = require('dayjs');

import { NewDataItem, DataItem } from '../../config/interfaces';
import { toUnderline } from '../../config/tool';

/**
 * Test Service
 */
export default class Test extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }

  public async query(page: string, pageSize: string, id: number) {
    const limit = Number(pageSize);
    const offset = (Number(page) - 1) * limit;

    console.log('🚀 ~ file: Test.ts ~ line 18 ~ Test ~ query ~ id', id);
    let options =
      id !== undefined
        ? {
            where: { id },
            limit,
            offset,
          }
        : {
            limit,
            offset,
          };
    const users = await this.app['mysql'].select('users', options);

    return {
      code: 1,
      data: users,
      msg: '',
    };
  }

  public async add(body: NewDataItem) {
    const newItem = toUnderline(body);
    newItem.birth_day = dayjs(newItem.birth_day).format('YYYY-MM-DD');

    const result = await this.app['mysql'].insert('users', newItem);
    console.log('🚀 ~ file: Test.ts ~ line 46 ~ Test ~ add ~ result', result);

    return {
      code: 1,
      data: null,
      msg: '添加成功',
    };
  }

  public async delete(id: string) {
    const searchItems = await this.app['mysql'].select('users', {
      where: { id },
    });
    console.log('🚀 ~ file: Test.ts ~ line 63 ~ Test ~ delete ~ searchItems', searchItems);

    if (searchItems.length === 0) {
      return {
        code: 1,
        data: null,
        msg: '此项不存在',
      };
    }

    const result = await this.app['mysql'].delete('users', {
      id: Number(id),
    });
    console.log('🚀 ~ file: Test.ts ~ line 65 ~ Test ~ delete ~ result', result);

    if (result.affectedRows === 1) {
      return {
        code: 1,
        data: null,
        msg: '删除成功',
      };
    }
  }

  public async put(id: string, body: NewDataItem) {
    const searchItems = await this.app['mysql'].select('users', {
      where: { id },
    });
    console.log('🚀 ~ file: Test.ts ~ line 63 ~ Test ~ delete ~ searchItems', searchItems);

    if (searchItems.length === 0) {
      return {
        code: 1,
        data: null,
        msg: '此项不存在',
      };
    }

    const row = toUnderline(body);
    row.birth_day = dayjs(row.birth_day).format('YYYY-MM-DD');

    const result = await this.app['mysql'].update('users', row); // 更新 posts 表中的记录
    console.log('🚀 ~ file: Test.ts ~ line 65 ~ Test ~ delete ~ result', result);

    if (result.affectedRows === 1) {
      return {
        code: 1,
        data: null,
        msg: '修改成功',
      };
    }
  }

  /**
   * total
   */
  public totalPromise(sql: string) {
    return new Promise((resolve, reject) => {
      var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345556',
        database: 'eggdatabase',
      });

      connection.connect();

      connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        resolve(results[0]['COUNT(*)']);
      });

      connection.end();
    });
  }

  /**
   * mysqlPromise
   */
  public mysqlPromise(page: number, pageSize: number, id: number, sql: string) {
    return new Promise((resolve, reject) => {
      var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345556',
        database: 'eggdatabase',
      });

      connection.connect();

      connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        resolve(results);
      });

      connection.end();
    });
  }
}
