function addBigInt(n1: string, n2: string) {
  if (!n1 && !n2) return '';

  const maxLen = n1.length > n2.length ? n1.length : n2.length;

  let ans = '';
  let i = 0;
  let carry = 0;

  while (i < maxLen) {
    let lastN1 = n1[n1.length - 1 - i] || '0';
    let lastN2 = n2[n2.length - 1 - i] || '0';

    try {
      let total = parseInt(lastN1) + parseInt(lastN2);
      const digits = (total % 10) + carry;
      carry = Math.floor(total / 10);

      ans = digits + ans;
    } catch (error) {
      throw error;
    }

    i++;
  }

  if (carry > 0) {
    ans = carry + ans;
  }

  return ans;
}
