import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.get('/api/query', controller.home.query);

  router.post('/api/add', controller.home.add);

  router.delete('/api/delete/:id', controller.home.delete);

  router.put('/api/put/:id', controller.home.put);
};
