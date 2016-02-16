import TextRange from '../TextRange';
import $ from 'jquery';

describe('TextRange', () => {

  let rootNode, range;

  beforeEach(() => {
    $(document.body).append(
      '<div id="root">outside the container'+
      '<div id="container">'+
      '1234<span>67891</span>'+
      '</div>'+
      '</div>'
    );

    rootNode = $('#container')[0];

    range = document.createRange();
    range.setStart(rootNode.childNodes[0], 2);
    range.setEnd(rootNode.childNodes[1].childNodes[0], 1);

    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

  });

  afterEach(() => {
    $(rootNode).remove();
  });

  describe('getSelected()', () => {
    it('should return an object with end/start number of characters based on a root node', () => {
      let range = TextRange.getSelected(rootNode);
      expect(range).toEqual({start:2, end: 5});
    });
  });

  describe('restore()', () => {
    it('should create a Range object based on a start/end character position object', () => {
      let restoredRange = TextRange.restore({start:2, end:5}, rootNode);
      expect(restoredRange.toString()).toBe(range.toString());
    });
  });

});
