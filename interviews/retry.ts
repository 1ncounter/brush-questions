/**
 * 最大重试封装
 * @param originFunc
 * @param times
 */
async function retry(originFunc: () => Promise<any>, times: number): Promise<any> {
  try {
    const result = await originFunc();

    return result;
  } catch (error) {
    if (times - 1 === 0) {
      return error;
    } else {
      return retry(originFunc, times - 1);
    }
  }
}
