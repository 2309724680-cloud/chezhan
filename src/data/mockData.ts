import type { Floor, Shop, Station, StationDataset } from '../types'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`

const wuchuanStation: Station = {
  id: 'wuchuan-station',
  name: '吴川站',
  code: 'WUCHUAN STATION',
  city: '广东 · 湛江',
  description: '一层商业空间数字孪生展示样本',
  floors: 1,
  shopCount: 3,
}

const wuchuanFloor: Floor = {
  id: 'wuchuan-1f',
  stationId: wuchuanStation.id,
  name: '一层商业空间',
  floorNumber: '1F',
  mapImage: assetUrl('wuchuan-floor-plan.jpg'),
  mapAspectRatio: '8520 / 3504',
  shopIds: ['shop-1f01', 'shop-1f02', 'shop-1f03'],
}

const wuchuanShops: Shop[] = [
  {
    id: 'shop-1f01',
    floorId: wuchuanFloor.id,
    code: '1F01',
    name: '1F01',
    category: 'retail',
    categoryLabel: '零售',
    area: 45,
    reservedPower: 30,
    description: '面向候车厅东侧动线的零售空间，适合便利零售、轻餐与旅途补给等业态。',
    status: '空店铺',
    media: [
      { kind: 'cover', label: '门头照片 · 待补充' },
      { kind: 'interior', label: '室内照片 · 待补充' },
      { kind: 'video', label: '空间视频 · 待补充' },
    ],
    hotspot: { x: 74.3662, y: 22.8881, width: 2.8991, height: 8.0194 },
  },
  {
    id: 'shop-1f02',
    floorId: wuchuanFloor.id,
    code: '1F02',
    name: '1F02',
    category: 'retail',
    categoryLabel: '零售',
    area: 93,
    reservedPower: 30,
    description: '紧邻站厅东侧配套服务区的零售空间，拥有更完整的展示面与进深。',
    status: '空店铺',
    media: [
      { kind: 'cover', label: '门头照片 · 待补充' },
      { kind: 'interior', label: '室内照片 · 待补充' },
      { kind: 'video', label: '空间视频 · 待补充' },
    ],
    hotspot: { x: 73.4977, y: 30.9932, width: 5.9859, height: 8.0194 },
  },
  {
    id: 'shop-1f03',
    floorId: wuchuanFloor.id,
    code: '1F03',
    name: '1F03',
    category: 'retail',
    categoryLabel: '零售',
    area: 73,
    reservedPower: 30,
    description: '位于东南侧客流节点的零售空间，适合品牌零售或城市伴手礼等业态。',
    status: '营业中',
    media: [
      { kind: 'cover', label: '便利店门头实景', url: assetUrl('shops/1f03-storefront.jpg') },
      { kind: 'interior', label: '店内商品陈列', url: assetUrl('shops/1f03-interior.jpg') },
      { kind: 'video', label: '空间视频 · 待补充' },
    ],
    hotspot: { x: 80.3521, y: 69.2637, width: 3.392, height: 12.8425 },
  },
]

const boluoStation: Station = {
  id: 'boluo-station',
  name: '博罗站',
  code: 'BOLUO STATION',
  city: '广东 · 惠州',
  description: '广汕铁路博罗站一层商业空间规划',
  floors: 1,
  shopCount: 3,
}

const boluoFloor: Floor = {
  id: 'boluo-1f',
  stationId: boluoStation.id,
  name: '一层商业空间',
  floorNumber: '1F',
  mapImage: assetUrl('boluo/boluo-floor-plan.jpg'),
  mapAspectRatio: '9600 / 4152',
  shopIds: ['boluo-shop-1f01', 'boluo-shop-1f02', 'boluo-shop-1f03'],
}

const boluoShops: Shop[] = [
  {
    id: 'boluo-shop-1f01',
    floorId: boluoFloor.id,
    code: '1F01',
    name: '博罗站 1F01',
    category: 'light-dining',
    categoryLabel: '轻餐饮',
    area: 60,
    reservedPower: 150,
    description: '位于候车层西侧的轻餐饮空间，规划给水 DN25、排水 DN150，并预留隔油池系统。',
    status: '空店铺',
    media: [
      { kind: 'cover', label: '门头照片 · 待补充' },
      { kind: 'interior', label: '室内照片 · 待补充' },
      { kind: 'video', label: '空间视频 · 待补充' },
    ],
    hotspot: { x: 13.875, y: 78.1551, width: 6.0104, height: 10.1638 },
  },
  {
    id: 'boluo-shop-1f02',
    floorId: boluoFloor.id,
    code: '1F02',
    name: '博罗站 1F02',
    category: 'retail',
    categoryLabel: '零售',
    area: 40,
    reservedPower: 30,
    description: '位于候车层南侧中段的零售空间，面向候车区主要客流，适合旅途补给和品牌零售。',
    status: '空店铺',
    media: [
      { kind: 'cover', label: '门头照片 · 待补充' },
      { kind: 'interior', label: '室内照片 · 待补充' },
      { kind: 'video', label: '空间视频 · 待补充' },
    ],
    hotspot: { x: 28.5417, y: 80.3709, width: 5.2083, height: 7.5867 },
  },
  {
    id: 'boluo-shop-1f03',
    floorId: boluoFloor.id,
    code: '1F03',
    name: '保嘉利便利店',
    category: 'retail',
    categoryLabel: '零售',
    area: 40,
    reservedPower: 30,
    description: '位于候车层东侧的零售空间，现有保嘉利便利店提供饮品、食品和旅途补给。',
    status: '营业中',
    media: [
      { kind: 'cover', label: '保嘉利便利店门头', url: assetUrl('boluo/1f03-storefront.jpg'), aspectRatio: '4032 / 3024' },
      { kind: 'interior', label: '便利店商品陈列', url: assetUrl('boluo/1f03-interior.jpg') },
      { kind: 'video', label: '空间视频 · 待补充' },
    ],
    hotspot: { x: 62.6771, y: 80.6358, width: 5.2396, height: 7.5626 },
  },
]

const mataStation: Station = {
  id: 'mata-station',
  name: '马踏站',
  code: 'MATA STATION',
  city: '广东 · 茂名',
  description: '广湛铁路马踏站候车层商业空间规划',
  floors: 1,
  shopCount: 1,
}

const mataFloor: Floor = {
  id: 'mata-1f',
  stationId: mataStation.id,
  name: '候车层商业空间',
  floorNumber: '1F',
  mapImage: assetUrl('mata/mata-floor-plan.jpg'),
  mapAspectRatio: '8940 / 4956',
  shopIds: ['mata-shop-1f01'],
}

const mataShops: Shop[] = [
  {
    id: 'mata-shop-1f01',
    floorId: mataFloor.id,
    code: '1F01',
    name: '中汇利通便利店',
    category: 'retail',
    categoryLabel: '零售',
    area: 20,
    reservedPower: 20,
    description: '商业位于老站房，现有中汇利通便利店提供饮品、食品和旅途补给；空间已配置给水、排水、空调及消防系统。',
    status: '营业中',
    media: [
      { kind: 'cover', label: '中汇利通便利店门头', url: assetUrl('mata/1f01-storefront.jpg'), aspectRatio: '947 / 745' },
      { kind: 'interior', label: '室内照片 · 待补充' },
      { kind: 'video', label: '空间视频 · 待补充' },
    ],
    hotspot: { x: 32.0, y: 32.7, width: 3.7, height: 8.0 },
  },
]

const baiyunStation: Station = {
  id: 'baiyun-station',
  name: '白云站',
  code: 'GUANGZHOU BAIYUN STATION',
  city: '广东 · 广州',
  description: '广州白云站高架夹层商业空间规划',
  floors: 1,
  shopCount: 20,
}

const baiyunShopSpecs = [
  { code: '5F01', categoryLabel: '重餐饮', area: 244, reservedPower: 200, hotspot: { x: 31.875, y: 36.13, width: 3.36, height: 3.28 } },
  { code: '5F02', categoryLabel: '重餐饮', area: 74, reservedPower: 80, hotspot: { x: 34.69, y: 38.34, width: 1.875, height: 1.88 } },
  { code: '5F03', categoryLabel: '重餐饮', area: 50, reservedPower: 80, hotspot: { x: 31.875, y: 39.47, width: 3.36, height: 2.64 } },
  { code: '5F04', categoryLabel: '轻餐饮', area: 20, reservedPower: 30, hotspot: { x: 34.69, y: 40.23, width: 1.875, height: 1.88 } },
  { code: '5F05', categoryLabel: '重餐饮', area: 220, reservedPower: 200, hotspot: { x: 31.875, y: 45.02, width: 4.61, height: 2.96 } },
  { code: '5F06', categoryLabel: '重餐饮', area: 51, reservedPower: 80, hotspot: { x: 31.875, y: 53.9, width: 4.61, height: 1.8 } },
  { code: '5F07', categoryLabel: '重餐饮', area: 128, reservedPower: 200, hotspot: { x: 31.875, y: 55.7, width: 4.61, height: 1.85 } },
  { code: '5F08', categoryLabel: '重餐饮', area: 56, reservedPower: 80, hotspot: { x: 31.875, y: 60.26, width: 3.36, height: 1.56 } },
  { code: '5F09', categoryLabel: '重餐饮', area: 125, reservedPower: 200, hotspot: { x: 31.875, y: 61.82, width: 3.36, height: 1.56 } },
  { code: '5F10', categoryLabel: '轻餐饮', area: 20, reservedPower: 30, hotspot: { x: 34.84, y: 60.26, width: 1.64, height: 1.4 } },
  { code: '5F11', categoryLabel: '重餐饮', area: 125, reservedPower: 200, hotspot: { x: 64.69, y: 61.82, width: 3.44, height: 1.59 } },
  { code: '5F12', categoryLabel: '重餐饮', area: 56, reservedPower: 80, hotspot: { x: 64.69, y: 60.26, width: 3.44, height: 1.56 } },
  { code: '5F13', categoryLabel: '轻餐饮', area: 20, reservedPower: 30, hotspot: { x: 63.52, y: 60.26, width: 1.72, height: 1.4 } },
  { code: '5F14', categoryLabel: '重餐饮', area: 128, reservedPower: 200, hotspot: { x: 63.44, y: 55.7, width: 4.69, height: 1.85 } },
  { code: '5F15', categoryLabel: '重餐饮', area: 51, reservedPower: 80, hotspot: { x: 63.44, y: 53.9, width: 4.69, height: 1.8 } },
  { code: '5F16', categoryLabel: '重餐饮', area: 220, reservedPower: 200, hotspot: { x: 63.44, y: 45.02, width: 4.61, height: 2.96 } },
  { code: '5F17', categoryLabel: '重餐饮', area: 50, reservedPower: 80, hotspot: { x: 64.84, y: 39.47, width: 3.28, height: 2.64 } },
  { code: '5F18', categoryLabel: '重餐饮', area: 74, reservedPower: 80, hotspot: { x: 63.44, y: 38.34, width: 1.875, height: 1.88 } },
  { code: '5F19', categoryLabel: '重餐饮', area: 244, reservedPower: 200, hotspot: { x: 64.84, y: 36.03, width: 3.28, height: 3.28 } },
  { code: '5F20', categoryLabel: '轻餐饮', area: 20, reservedPower: 20, hotspot: { x: 63.44, y: 40.23, width: 1.875, height: 1.88 } },
] as const

const baiyunFloor: Floor = {
  id: 'baiyun-5f',
  stationId: baiyunStation.id,
  name: '五层商业空间',
  floorNumber: '5F',
  mapImage: assetUrl('baiyun/baiyun-floor-plan.jpg'),
  mapAspectRatio: '1280 / 1857',
  shopIds: baiyunShopSpecs.map(({ code }) => `baiyun-shop-${code.toLowerCase()}`),
}

const baiyunStorefronts: Partial<Record<(typeof baiyunShopSpecs)[number]['code'], { name: string; label: string; file: string }>> = {
  '5F01': { name: '遇见小面', label: '遇见小面门店实景', file: '5f01-yujianxiaomian.jpg' },
  '5F03': { name: '蒸浏记湘味简餐', label: '蒸浏记湘味简餐门店实景', file: '5f03-zhengliuji.jpg' },
  '5F05': { name: '麦当劳', label: '麦当劳门店实景', file: '5f05-mcdonalds.jpg' },
  '5F07': { name: '大师兄陕西面馆', label: '大师兄陕西面馆门店实景', file: '5f07-dashixiong.jpg' },
  '5F08': { name: '白云食堂', label: '白云食堂门店实景', file: '5f08-baiyun-canteen.jpg' },
  '5F09': { name: '白云食堂', label: '白云食堂门店实景', file: '5f08-baiyun-canteen.jpg' },
  '5F12': { name: '煎饼道', label: '煎饼道门店实景', file: '5f12-jianbingdao.jpg' },
  '5F14': { name: '蒸浏记浏阳蒸菜', label: '蒸浏记浏阳蒸菜门店实景', file: '5f14-zhengliuji-liuyang.jpg' },
  '5F16': { name: '肯德基', label: '肯德基门店实景', file: '5f16-kfc.jpg' },
  '5F17': { name: '赛百味', label: '赛百味门店实景', file: '5f17-subway.jpg' },
  '5F18': { name: '瑞幸咖啡', label: '瑞幸咖啡门店实景', file: '5f18-luckin.jpg' },
  '5F19': { name: '真功夫', label: '真功夫门店实景', file: '5f19-zhenkungfu.jpg' },
}

const baiyunShops: Shop[] = baiyunShopSpecs.map((spec) => {
  const storefront = baiyunStorefronts[spec.code]
  const isOperating = Boolean(storefront)

  return {
    id: `baiyun-shop-${spec.code.toLowerCase()}`,
    floorId: baiyunFloor.id,
    code: spec.code,
    name: storefront?.name ?? '空店铺',
    category: spec.categoryLabel === '轻餐饮' ? 'light-dining' : 'heavy-dining',
    categoryLabel: spec.categoryLabel,
    area: spec.area,
    reservedPower: spec.reservedPower,
    description: isOperating
      ? `${baiyunStation.name}${baiyunFloor.floorNumber}高架夹层${spec.code}店铺，已录入${storefront?.name}现场门店照片。`
      : `${baiyunStation.name}${baiyunFloor.floorNumber}高架夹层${spec.code}空店铺，规划业态为${spec.categoryLabel}。`,
    status: isOperating ? '营业中' : '空店铺',
    media: storefront
      ? [
          { kind: 'cover', label: storefront.label, url: assetUrl(`baiyun/${storefront.file}`), aspectRatio: '4 / 3' },
          { kind: 'interior', label: '室内照片 · 待补充' },
          { kind: 'video', label: '空间视频 · 待补充' },
        ]
      : [
          { kind: 'cover', label: '门头照片 · 待补充' },
          { kind: 'interior', label: '室内照片 · 待补充' },
          { kind: 'video', label: '空间视频 · 待补充' },
        ],
    hotspot: { ...spec.hotspot },
  }
})

export const stationDatasets: StationDataset[] = [
  {
    station: wuchuanStation,
    floor: wuchuanFloor,
    shops: wuchuanShops,
    heroImage: assetUrl('wuchuan-station-4k.jpg'),
    totalArea: wuchuanShops.reduce((sum, shop) => sum + shop.area, 0),
    totalPower: wuchuanShops.reduce((sum, shop) => sum + shop.reservedPower, 0),
  },
  {
    station: boluoStation,
    floor: boluoFloor,
    shops: boluoShops,
    heroImage: assetUrl('boluo/boluo-station.png'),
    totalArea: 140,
    totalPower: 234,
    supportingFacilities: '智能按摩椅 2 处、自动售货机 4 台，配套电量 24KW',
  },
  {
    station: mataStation,
    floor: mataFloor,
    shops: mataShops,
    heroImage: assetUrl('mata/mata-station.png'),
    totalArea: 20,
    totalPower: 32,
    supportingFacilities: '自动售货机 12 台，配套电量 12KW',
  },
  {
    station: baiyunStation,
    floor: baiyunFloor,
    shops: baiyunShops,
    heroImage: assetUrl('baiyun/baiyun-station.png'),
    totalArea: 1976,
    totalPower: 2350,
  },
]

export function stationDatasetById(id: string) {
  const dataset = stationDatasets.find(({ station }) => station.id === id)

  if (!dataset) throw new Error(`Unknown station dataset: ${id}`)
  return dataset
}

export const station = wuchuanStation
export const floor = wuchuanFloor
export const shops = wuchuanShops
export const floors = [wuchuanFloor]
export const totalArea = stationDatasets[0].totalArea
export const totalPower = stationDatasets[0].totalPower
