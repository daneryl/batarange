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

    let node,
    charIndex = 0,
    range = document.createRange(),
    nodeStack = [rootNode]

    while (node = nodeStack.pop()) {

      if (node.nodeType != Node.TEXT_NODE) {
        var nodeIndex = node.childNodes.length;
        while (nodeIndex--) { nodeStack.push(node.childNodes[nodeIndex]); }
        continue;
      }

      var nextCharIndex = charIndex + node.length;

      // demonstrate this with a test -> if (textPosition.start >= charIndex && textPosition.start <= nextCharIndex)
      if (textPosition.start >= charIndex) {
        range.setStart(node, textPosition.start - charIndex);
      }

      if (textPosition.end <= nextCharIndex) {
        range.setEnd(node, textPosition.end - charIndex);
        break;
      }

      charIndex = nextCharIndex;

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
