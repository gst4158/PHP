import { BluestarPage } from './app.po';

describe('bluestar App', () => {
  let page: BluestarPage;

  beforeEach(() => {
    page = new BluestarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
