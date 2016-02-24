import TextRange from '../TextRange';
import $ from 'jquery';

describe('TextRange', () => {

  let rootNode, range, range2, range3;

  beforeEach(() => {
    $(document.body).append(
      '<div id="root">outside the container'+
      '<div id="container">'+
      '1234<span>567891</span>'+
      '1234<span>567891</span>'+
      '<p>some text</p>'+
      '</div>'+
      '</div>'
    );

    rootNode = $('#container')[0];

    range = document.createRange();
    range.setStart(rootNode.childNodes[0], 2);
    range.setEnd(rootNode.childNodes[1].childNodes[0], 1);

    range2 = document.createRange();
    range2.setStart(rootNode.childNodes[3].childNodes[0], 2);
    range2.setEnd(rootNode.childNodes[3].childNodes[0], 4);

    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

  });

  afterEach(() => {
    $('#root').remove();
  });

  describe('serialize()', () => {
    it('should return an object with end/start number of characters based on a root node', () => {
      let serialized = TextRange.serialize(range, rootNode);
      expect(serialized).toEqual({start:2, end: 5});
    });
  });

  describe('restore()', () => {
    it('should restore when range spans multiple nodes', () => {
      let restoredRange = TextRange.restore({start:2, end:5}, rootNode);
      expect(restoredRange.toString()).toBe(range.toString());
    });

    it('should restore when range its inside the same node', () => {
      let restoredRange = TextRange.restore({start:6, end:8}, rootNode);
      expect(restoredRange.toString()).toBe(range2.toString());
    });

    it('should restore when range startOffset is 0', () => {
      let range3 = document.createRange();
      range3.setStart(rootNode.childNodes[4].childNodes[0], 0);
      range3.setEnd(rootNode.childNodes[4].childNodes[0], 4);

      let restoredRange = TextRange.restore({start:20, end:24}, rootNode);
      expect(restoredRange.toString()).toBe(range3.toString());
    });
  });

});
