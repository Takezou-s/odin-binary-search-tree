class Node {
  parent = null;
  isRight = false;
  left = null;
  right = null;
  value = null;

  constructor(value) {
    this.value = value;
  }

  get childCount() {
    let childCount = 0;
    if (this.right) childCount++;
    if (this.left) childCount++;
    return childCount;
  }

  appendNode = (node, checkChild = true) => {
    this.appendNodeTo(node, node.value > this.value, checkChild);
  };

  appendNodeTo = (node, toRight, checkChild) => {
    const prop = toRight ? "right" : "left";
    if (!this[prop] || !checkChild) {
      this[prop] = node;
      if (node) {
        node.parent = this;
        node.isRight = toRight;
      }
    } else {
      this[prop].appendNode(node);
    }
  };

  replaceSelf = (node) => {
    this.parent.appendNodeTo(node, this.isRight, false);
  };

  removeChild = (node) => {
    if (node) {
      if (node === this.left) {
        this.left = null;
      } else if (node === this.right) {
        this.right = null;
      }
    }
  };
}
