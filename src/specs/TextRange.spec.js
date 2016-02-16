import TextRange from '../TextRange';
import $ from 'jquery';

describe('TextRange', () => {

  let rootNode, range, range2;

  beforeEach(() => {
    $(document.body).append(
      '<div id="root">outside the container'+
      '<div id="container">'+
      '1234<span>567891</span>'+
      '1234<span>567891</span>'+
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

  describe('getSelected()', () => {
    it('should return an object with end/start number of characters based on a root node', () => {
      let range = TextRange.getSelected(rootNode);
      expect(range).toEqual({start:2, end: 5});
    });
  });

  describe('restore()', () => {
    describe('when start/end spans multiple nodes', () => {
      it('when start/end are inside the same node', () => {
        let restoredRange = TextRange.restore({start:2, end:5}, rootNode);
        expect(restoredRange.toString()).toBe(range.toString());
      });
    });

    describe('when start/end are inside the same node', () => {
      it('should restore the range correctly', () => {
        let restoredRange = TextRange.restore({start:6, end:8}, rootNode);
        expect(restoredRange.toString()).toBe(range2.toString());
      });
    });
  });

});
