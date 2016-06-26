'use strict';

describe('Comics App', function() {

  it('should display image on home page', function() {
    browser.get('/#/home');

    var image = element.all(by.tagName('img'));
    expect(image.count()).toEqual(1);
  });

  it('should display blockquote on about page', function() {
    browser.get('/#/about');

    var quote = element.all(by.tagName('blockquote'));
    expect(quote.count()).toEqual(1);
  });

  it('should display address on about page', function() {
    var address = element.all(by.tagName('address'));
    expect(address.count()).toEqual(1);
  });

  it('should display list of comics on comics page', function() {
    browser.get('/#/comics');
    browser.waitForAngular();
    var items = element.all(by.css('ul.media-list li.media'));
    expect(items.count()).toEqual(50);
  });

  it('should display comic detail when title clicked', function() {
    element.all(by.repeater('comic in comics')).
      get(1).
      element(by.tagName('a')).
      click();
    browser.waitForAngular();
    var lists = element.all(by.css('ul.list-group'));
    expect(lists.count()).toEqual(3);
  });
});