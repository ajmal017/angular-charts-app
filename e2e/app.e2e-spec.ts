import { AngularTechanPage } from './app.po';

describe('angular-techan App', function() {
  let page: AngularTechanPage;

  beforeEach(() => {
    page = new AngularTechanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
