const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (!node) {
    console.log("null");
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const insert = (value) => {
  console.log(`Insert ${value}`);
  tree.insert(value);
  prettyPrint(tree.root);
};

const del = (value) => {
  console.log(`Delete ${value}`);
  tree.delete(value);
  prettyPrint(tree.root);
};

const isBalanced = () => {
  console.log(tree.isBalanced() ? "Balanced" : "Not Balanced");
};

const reBalance = () => {
    console.log("Rebalanced");
  tree.reBalance();
  prettyPrint(tree.root);
};

const tree = new Tree();
tree.buildTree(1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324);
prettyPrint(tree.root);
/*
│           ┌── 6345
│       ┌── 324
│   ┌── 67
│   │   └── 23
│   │       └── 9
└── 8
    │       ┌── 7
    │   ┌── 5
    └── 4
        └── 3
            └── 1
*/

insert(88);
/*
Insert 88
│           ┌── 6345
│       ┌── 324
│       │   └── 88 --> Added here
│   ┌── 67
│   │   └── 23
│   │       └── 9
└── 8
    │       ┌── 7
    │   ┌── 5
    └── 4
        └── 3
            └── 1
*/
insert(6);
/*
Insert 6
│           ┌── 6345
│       ┌── 324
│       │   └── 88
│   ┌── 67
│   │   └── 23
│   │       └── 9
└── 8
    │       ┌── 7
    │       │   └── 6 --> Added here
    │   ┌── 5
    └── 4
        └── 3
            └── 1
*/


del(1);
/*
Delete 1
│           ┌── 6345
│       ┌── 324
│       │   └── 88
│   ┌── 67
│   │   └── 23
│   │       └── 9
└── 8
    │       ┌── 7
    │       │   └── 6
    │   ┌── 5
    └── 4
        └── 3
            └── --> Was here        
*/
del(5);
/*
Delete 5
│           ┌── 6345
│       ┌── 324
│       │   └── 88
│   ┌── 67
│   │   └── 23
│   │       └── 9
└── 8
    │  X┌── 7
    │   │   └── 6
    └── 4
        └── 3

Was at X's place, replaced by 7
*/
del(67);
/*
Delete 67
│           ┌── 6345
│       ┌── 324
│   ┌── 88 --> Was here, replaced by 88
│   │   └── 23
│   │       └── 9
└── 8
    │   ┌── 7
    │   │   └── 6
    └── 4
        └── 3
*/

console.log("Find 4");
prettyPrint(tree.find(4));
/*
│   ┌── 7
│   │   └── 6
└── 4
    └── 3
*/

console.log("Find 88888");
prettyPrint(tree.find(88888)); // null

console.log("Level Order", tree.levelOrder()); // Level Order (10) [8, 4, 88, 3, 7, 23, 324, 6, 9, 6345]
console.log("Inorder", tree.inOrder()); // Inorder (10) [3, 4, 6, 7, 8, 9, 23, 88, 324, 6345]
console.log("Preorder", tree.preOrder()); // Preorder (10) [8, 4, 3, 7, 6, 88, 23, 9, 324, 6345]
console.log("Postorder", tree.postOrder()); // Postorder (10) [3, 6, 7, 4, 9, 23, 6345, 324, 88, 8]

console.log("Height of 8: ", tree.height(tree.find(8))); // Height of 8:  3
console.log("Height of 4: ", tree.height(tree.find(4))); // Height of 4:  2
console.log("Height of 88: ", tree.height(tree.find(88))); // Height of 88:  2
console.log("Height of 6: ", tree.height(tree.find(6))); // Height of 6:  0

console.log("Depth of 8: ", tree.depth(tree.find(8))); // Depth of 8:  0
console.log("Depth of 4: ", tree.depth(tree.find(4))); // Depth of 4:  1
console.log("Depth of 88: ", tree.depth(tree.find(88))); // Depth of 88:  1
console.log("Depth of 6: ", tree.depth(tree.find(6))); // Depth of 6:  3

isBalanced(); // Balanced

insert(123);
/*
Insert 123
│           ┌── 6345
│       ┌── 324
│       │   └── 123 --> Added here
│   ┌── 88
│   │   └── 23
│   │       └── 9
└── 8
    │   ┌── 7
    │   │   └── 6
    └── 4
        └── 3
*/
isBalanced(); // Balanced

insert(234);
/*
Insert 234
│           ┌── 6345
│       ┌── 324
│       │   │   ┌── 234 --> Added here
│       │   └── 123
│   ┌── 88
│   │   └── 23
│   │       └── 9
└── 8
    │   ┌── 7
    │   │   └── 6
    └── 4
        └── 3
*/
isBalanced(); // Balanced

insert(245);
/*
Insert 245
│           ┌── 6345
│       ┌── 324
│       │   │       ┌── 245 --> Added here
│       │   │   ┌── 234
│       │   └── 123
│   ┌── 88
│   │   └── 23
│   │       └── 9
└── 8
    │   ┌── 7
    │   │   └── 6
    └── 4
        └── 3
*/
isBalanced(); // Not Balanced

reBalance();
/*
Rebalanced
│           ┌── 6345
│       ┌── 324
│   ┌── 245
│   │   │   ┌── 234
│   │   └── 123
│   │       └── 88
└── 23
    │       ┌── 9
    │   ┌── 8
    └── 7
        │   ┌── 6
        └── 4
            └── 3
*/
isBalanced(); // Balanced