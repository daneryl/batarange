export default {

  getSelected: (rootNode) => {

    let selectedRange = window.getSelection().getRangeAt(0);
    let start = getStartCharacterFor(selectedRange, rootNode);

    return {
      start: start,
      end: start + selectedRange.toString().length
    };

  },

  restore: (textPosition, rootNode) => {
    let charIndex = 0, range = document.createRange();
    let nodeStack = [rootNode], node;

    while (node = nodeStack.pop()) {
      if (node.nodeType == 3) {

        var nextCharIndex = charIndex + node.length;

        if (textPosition.start >= charIndex && textPosition.start <= nextCharIndex) {
          range.setStart(node, textPosition.start - charIndex);
        }

        if (textPosition.end >= charIndex && textPosition.end <= nextCharIndex) {
          range.setEnd(node, textPosition.end - charIndex);
          break;
        }

        charIndex = nextCharIndex;

      } else {

        var i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }

      }
    }

    return range;
  }

}

function getStartCharacterFor(range, rootNode) {
  let preRange = range.cloneRange();
  preRange.selectNodeContents(rootNode);
  preRange.setEnd(range.startContainer, range.startOffset);
  return preRange.toString().length;
}
