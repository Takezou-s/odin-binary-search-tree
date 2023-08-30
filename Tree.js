// import Node from "./Node";

class Tree {
  root = null;

  buildTree = (...values) => {
    const arr = [];
    values
      .sort((a, b) => a - b)
      .forEach((x) => {
        if (!arr.includes(x)) {
          arr.push(x);
        }
      });

    // this.root = this._buildTree([...arr]);
    this.root = this._buildTreeAlternate([...arr]);
  };

  insert = (value) => {
    this.root.appendNode(new Node(value));
  };

  // Wrote this function before watching the video. I was confused about if assignment asks for replacing sub-nodes or just insert.
  // After i watched video i did understand that this approach is not what assignment wants.
  // Actually i think this approach would be very bad performance-wise, especially in big datas.
  // But after all, this is an exercise so i thought maybe Odin lecturers want so.
  // Anyways i keep the code here.
  // (It was not that balanced in the first place though.)
  insertBalanced = (value) => {
    const obj = this._getPrevAndNextNodes(value, this.root);
    const newNode = new Node(value);
    if (obj.next) {
      newNode.appendNode(obj.next);
    }
    obj.prev.appendNode(newNode, false);
  };

  delete = (value) => {
    const node = this._getNode(value, this.root);
    if (!node) return;
    if (node.childCount === 0) {
      node.replaceSelf(null);
      if (node === this.root) {
        this.root = null;
      }
    } else if (node.childCount === 1) {
      const nodeToReplace = node.left || node.right;
      node.replaceSelf(nodeToReplace);
      if (node === this.root) {
        this.root = nodeToReplace;
      }
    } else {
      const smallest = this._getNodeWithSmallestValue(node.right);
      smallest.replaceSelf(null);
      node.value = smallest.value;
    }
  };

  find = (value) => {
    return this._getNode(value, this.root);
  };

  levelOrder = (fn) => {
    return this._iterate(this._levelOrderIterator.bind(this, [this.root]), fn);
  };

  inOrder = (fn) => {
    return this._iterate(this._inOrderIterator.bind(this, this.root), fn);
  };

  preOrder = (fn) => {
    return this._iterate(this._preOrderIterator.bind(this, this.root), fn);
  };

  postOrder = (fn) => {
    return this._iterate(this._postOrderIterator.bind(this, this.root), fn);
  };

  height = (node) => {
    let counter = 0;
    this._levelOrderIterator([node], null, () => counter++);
    return counter - 1;
  };

  depth = (node) => {
    return this._rise(node);
  };

  isBalanced = () => {
    if (!this.root) return false;
    if (this.root.childCount === 0) return true;
    if (this.root.childCount === 1) {
      if (this.root.left) {
        return this.height(this.root.left) <= 1;
      } else {
        return this.height(this.root.right) <= 1;
      }
    }
    const heightDiff = Math.abs(this.height(this.root.left) - this.height(this.root.right));
    return heightDiff <= 1;
  };

  reBalance = () => {
    this.buildTree(...this.inOrder());
  };

  _rise = (node, counter = 0) => {
    if (!node) return counter;
    if (node === this.root) {
      return 0;
    }
    if (node.parent !== this.root) {
      return this._rise(node.parent, ++counter);
    } else {
      return ++counter;
    }
  };

  _iterate = (iterateFn, fn) => {
    let result = null;
    fn =
      fn ||
      ((node) => {
        if (!result) result = [];
        result.push(node.value);
      });
    iterateFn(fn);
    return result;
  };

  _levelOrderIterator = (nodes, nodeFn, countFn) => {
    if (!nodes || nodes.length <= 0) return;
    const arr = [];
    nodes.forEach((x) => {
      if (x.left) arr.push(x.left);
      if (x.right) arr.push(x.right);
      if (nodeFn) nodeFn(x);
    });
    if (countFn) countFn();

    this._levelOrderIterator(arr, nodeFn, countFn);
  };

  _inOrderIterator = (node, fn) => {
    if (!node) return;
    if (node.left) {
      this._inOrderIterator(node.left, fn);
    }
    fn(node);
    if (node.right) {
      this._inOrderIterator(node.right, fn);
    }
  };

  _preOrderIterator = (node, fn) => {
    if (!node) return;
    fn(node);
    if (node.left) {
      this._preOrderIterator(node.left, fn);
    }
    if (node.right) {
      this._preOrderIterator(node.right, fn);
    }
  };

  _postOrderIterator = (node, fn) => {
    if (!node) return;
    if (node.left) {
      this._postOrderIterator(node.left, fn);
    }
    if (node.right) {
      this._postOrderIterator(node.right, fn);
    }
    fn(node);
  };

  _getNodeWithSmallestValue = (node) => {
    if (!node.left) {
      return node;
    }

    return this._getNodeWithSmallestValue(node.left);
  };

  _getNode = (value, node) => {
    if (node.value === value) {
      return node;
    }
    if (node.value < value) {
      if (node.right) {
        return this._getNode(value, node.right);
      }
    } else {
      if (node.left) {
        return this._getNode(value, node.left);
      }
    }
  };

  _getPrevAndNextNodes = (value, node) => {
    const obj = { prev: null, next: null };
    if (node.value < value) {
      if (!node.right) {
        obj.prev = node;
        obj.next = null;
        return obj;
      }

      if (node.right.value < value) {
        return this._getPrevAndNextNodes(value, node.right);
      } else {
        obj.prev = node;
        obj.next = node.right;
        return obj;
      }
    } else {
      if (!node.left) {
        obj.prev = node;
        obj.next = null;
        return obj;
      }

      if (node.left.value > value) {
        return this._getPrevAndNextNodes(value, node.left);
      } else {
        obj.prev = node;
        obj.next = node.left;
        return obj;
      }
    }
  };

  _buildTree = (arr, root = null) => {
    if (arr.length <= 0) return;
    const centerIndex = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, centerIndex);
    const rightHalf = arr.slice(centerIndex + 1);

    const node = new Node(arr[centerIndex]);
    if (root) {
      root.appendNode(node);
    }

    this._buildTree(leftHalf, node);
    this._buildTree(rightHalf, node);

    return node;
  };

  _buildTreeAlternate = (arr, root = null) => {
    if (arr.length <= 0) return;
    const centerIndex = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, centerIndex);
    const rightHalf = arr.slice(centerIndex + 1);

    const node = new Node(arr[centerIndex]);
    if (root) {
      root.appendNode(node);
    }

    if (leftHalf.length === 2) {
      node.appendNode(new Node(leftHalf[1]));
      node.appendNode(new Node(leftHalf[0]));
    } else {
      this._buildTreeAlternate(leftHalf, node);
    }

    if (rightHalf.length === 2) {
      node.appendNode(new Node(rightHalf[0]));
      node.appendNode(new Node(rightHalf[1]));
    } else {
      this._buildTreeAlternate(rightHalf, node);
    }
    return node;
  };
}
