// 巡检人
export const SELECT_HOME_WORK_NUM_ONE = '0';
export const SELECT_HOME_WORK_NUM_TWO = '1';
export const SELECT_HOME_WORK_NUM_THREE = '2';

export const SELECT_HOME_WORK_NUM_MAP = {
  [SELECT_HOME_WORK_NUM_ONE]: '张三',
  [SELECT_HOME_WORK_NUM_TWO]: '李四',
  [SELECT_HOME_WORK_NUM_THREE]: '王二',
};

export const SELECT_HOME_WORK_NUM = Object.keys(SELECT_HOME_WORK_NUM_MAP).map(cur => ({
  id: cur,
  name: SELECT_HOME_WORK_NUM_MAP[cur],
}));

// 巡检总况
export const SELECT_INSPECTION_STATUS_NORMAL = '0';
export const SELECT_INSPECTION_STATUS_ABNORMAL = '1';

export const SELECT_INSPECTION_STATUS_MAP = {
  [SELECT_INSPECTION_STATUS_NORMAL]: '正常',
  [SELECT_INSPECTION_STATUS_ABNORMAL]: '异常',
};

export const SELECT_INSPECTION_STATUS = Object.keys(SELECT_INSPECTION_STATUS_MAP).map(cur => ({
  id: cur,
  name: SELECT_INSPECTION_STATUS_MAP[cur],
}));

// 可选择的异常项
export const SELECT_INSPECTION_ABNORMA_ITEM_ZERO = '0';
export const SELECT_INSPECTION_ABNORMA_ITEM_ONE = '1';
export const SELECT_INSPECTION_ABNORMA_ITEM_TWO = '2';
export const SELECT_INSPECTION_ABNORMA_ITEM_THREE = '3';
export const SELECT_INSPECTION_ABNORMA_ITEM_FORE = '4';
export const SELECT_INSPECTION_ABNORMA_ITEM_FIVE = '5';

export const SELECT_INSPECTION_ABNORMA_ITEM_MAP = {
  [SELECT_INSPECTION_ABNORMA_ITEM_ZERO]: '地下综合管廊-1号防火区',
  [SELECT_INSPECTION_ABNORMA_ITEM_ONE]: '电力电缆仓-接地箱',
  [SELECT_INSPECTION_ABNORMA_ITEM_TWO]: '电力电缆仓-气体探头',
  [SELECT_INSPECTION_ABNORMA_ITEM_THREE]: '电力电缆-湿度探头',
  [SELECT_INSPECTION_ABNORMA_ITEM_FORE]: '德胜路地下综合管廊-1号防火区',
  [SELECT_INSPECTION_ABNORMA_ITEM_FIVE]: '燃仓-气体探头',
};
export const SELECT_INSPECTION_ABNORMA_ITEM = Object.keys(SELECT_INSPECTION_ABNORMA_ITEM_MAP).map(cur => ({
  id: cur,
  name: SELECT_INSPECTION_ABNORMA_ITEM_MAP[cur],
}));

// 维保公司
export const SELECT_MAINTENANCE_COMPANY_MAP_ONE = '0';
export const SELECT_MAINTENANCE_COMPANY_MAP_TWO = '1';

export const SELECT_MAINTENANCE_COMPANY_MAP = {
  [SELECT_MAINTENANCE_COMPANY_MAP_ONE]: '智慧管廊维保公司',
  [SELECT_MAINTENANCE_COMPANY_MAP_TWO]: '系统维系维护有限公司',
};

export const SELECT_MAINTENANCE_COMPANY = Object.keys(SELECT_MAINTENANCE_COMPANY_MAP).map(cur => ({
  id: cur,
  name: SELECT_MAINTENANCE_COMPANY_MAP[cur],
}));