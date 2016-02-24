export default {

  serialize: (range, rootNode) => {

    let start = getStartCharacterFor(range, rootNode);

    return {
      start: start,
      end: start + range.toString().length
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

      let nextCharIndex = charIndex + node.length;

      if (textPosition.start >= charIndex && textPosition.start < nextCharIndex) {
        range.setStart(node, textPosition.start - charIndex);
      }

      if (textPosition.end < nextCharIndex) {
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
