import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }

  public async query() {
    const { ctx } = this;
    const { page, pageSize, id } = this.ctx.query;

    ctx.body = await ctx.service.test.query(page, pageSize, id);
  }

  public async add() {
    const { ctx } = this;
    const body = this.ctx.request.body;

    ctx.body = await ctx.service.test.add(body);
  }

  public async delete() {
    const { ctx } = this;
    const { id } = ctx.params;

    ctx.body = await ctx.service.test.delete(id);
  }

  public async put() {
    const { ctx } = this;
    const { id } = ctx.params;
    const body = ctx.request.body;

    ctx.body = await ctx.service.test.put(id, body);
  }
}
