
// diff 函数，对比两棵树
function diff(oldTree, newTree) {
  const index = 0 // 当前节点的标志
  const pathes = {} // 用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, index, pathes)
}

// 对两棵树进行深度优先遍历
function dfsWalk(oldNode, newNode, index, pathes) {
  pathes[index] = [...]; // 对比oldNode和newNode的不同，记录下来
  diffChildren(oldNode.children, newNode.children, index, pathes)
}

// 遍历子节点
function diffChildren(oldChildren, newChildren, index, pathes) {
  let leftNode = null
  let currentNodeIndex = index;
  oldChildren.forEach((child, i) => {
    const newChild = newChildren[i]
    currentNodeIndex = (leftNode && leftNode.count)
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1
    dfsWalk(child, newChild, currentNodeIndex, pathes)
    leftNode = child;
  });
}