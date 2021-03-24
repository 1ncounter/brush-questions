class UF {
  F: number[] = [];
  count: number = 0;
  Cnt: number[] = [];

  init(n: number) {
    for (let i = 0; i < n; i++) {
      this.F[i] = i;
      this.Cnt[i] = 1;
    }

    this.count = n;
  }

  find(x: number): number {
    if (x === this.F[x]) {
      return x;
    }

    this.F[x] = this.find(this.F[x]);

    return this.F[x];
  }

  union(x: number, y: number) {
    let xpar = this.find(x);
    let ypar = this.find(y);

    // 将x所在集合，合并到y所在集合
    if (xpar != ypar) {
      this.F[xpar] = ypar;
      // y集合里面的个数要增加
      this.Cnt[ypar] += this.Cnt[xpar];
      this.count--;
    }
  }

  size(i: number) {
    return this.Cnt[this.find(i)];
  }
}
