import { MoviefinderPage } from './app.po';

describe('moviefinder App', () => {
  let page: MoviefinderPage;

  beforeEach(() => {
    page = new MoviefinderPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
