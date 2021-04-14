function createVersion(version: string) {
  const NUMERICIDENTIFIER = `0|[1-9]\\d*`;
  const mainVersion =
    `${NUMERICIDENTIFIER}\\.` +
    `${NUMERICIDENTIFIER}\\.` +
    `${NUMERICIDENTIFIER}`;
  const full = `^${mainVersion}`;

  const m = version.trim().match(new RegExp(full, 'g'));

  return {
    major: +m[0],
    minor: +m[1],
    patch: +m[2],
  };
}

function diffVersion(v1: string, v2: string) {
  const version1 = createVersion(v1);
  const version2 = createVersion(v2);

  // 对比规则
}
