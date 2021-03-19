class TreeNode<T> {
  value: T;
  left: TreeNode<T> = null;
  right: TreeNode<T> = null;

  constructor(value: T) {
    this.value = value;
  }
}
