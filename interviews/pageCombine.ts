/**
 * https://www.yuque.com/fubai18550498323/dagy83/bl6q51
 */

const getDataMock = (data: number[] | number) => {
  return async (param: { pageSize: number; offset: number }) =>
    new Promise((resolve) => {
      const { pageSize, offset } = param;
      if (Array.isArray(data)) {
        const offsetData = data
          .filter((_el, i) => i >= offset)
          .filter((_el, i) => i < pageSize);
        resolve(offsetData);
      } else {
        resolve(data);
      }
    });
};

const getMockServices = () => {
  const serviceGetCount = [];
  const serviceGetList = [];
  const list = [1, 2, 3];

  for (const item of list) {
    const data = new Array(item).fill(item);
    const count = item;
    serviceGetList.push(getDataMock(data));
    serviceGetCount.push(getDataMock(count));
  }

  return {
    serviceGetCount,
    serviceGetList,
  };
};

// 以 A,B,C的优先级排列合并三个服务返回的数据
async function getOrderList(
  pageNo: number,
  pageSize: number
): Promise<number[]> {
  const { serviceGetCount, serviceGetList } = getMockServices();
  const [getCountA, getCountB, getCountC] = serviceGetCount;
  const [getListA, getListB, getListC] = serviceGetList;
  const countA = await getCountA();
  const countB = await getCountB();
  const countC = await getCountC();

  // todo: 实现分页合并逻辑

  return;
}

// tc: 输入pageNo为1 pageSize为5 时返回为 [1,2,2,3,3]
// tc: 输入pageNo为3 pageSize为2 时返回为 [2,3]
