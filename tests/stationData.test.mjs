import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { createServer } from 'vite'

let server
let data

before(async () => {
  server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  data = await server.ssrLoadModule('/src/data/mockData.ts')
})

after(async () => {
  await server?.close()
})

test('publishes all four stations as independent station datasets', () => {
  assert.equal(data.stationDatasets.length, 4)
  assert.deepEqual(data.stationDatasets.map(({ station }) => station.name), ['吴川站', '博罗站', '马踏站', '白云站'])
  assert.equal(data.stationDatasetById('boluo-station').station.code, 'BOLUO STATION')
  assert.equal(data.stationDatasetById('mata-station').station.code, 'MATA STATION')
  assert.equal(data.stationDatasetById('baiyun-station').station.code, 'GUANGZHOU BAIYUN STATION')
})

test('aligns Wu Chuan hotspots with the colored shop regions in the source plan', () => {
  const wuchuan = data.stationDatasetById('wuchuan-station')

  assert.deepEqual(
    wuchuan.shops.map(({ code, hotspot }) => ({ code, hotspot })),
    [
      { code: '1F01', hotspot: { x: 74.3662, y: 22.8881, width: 2.8991, height: 8.0194 } },
      { code: '1F02', hotspot: { x: 73.4977, y: 30.9932, width: 5.9859, height: 8.0194 } },
      { code: '1F03', hotspot: { x: 80.3521, y: 69.2637, width: 3.392, height: 12.8425 } },
    ],
  )
})

test('marks the photographed Wu Chuan shop as operating and the other shops as vacant', () => {
  const wuchuan = data.stationDatasetById('wuchuan-station')

  assert.deepEqual(
    wuchuan.shops.map(({ code, status }) => ({ code, status })),
    [
      { code: '1F01', status: '空店铺' },
      { code: '1F02', status: '空店铺' },
      { code: '1F03', status: '营业中' },
    ],
  )
})

test('uses the workbook totals and shop records for Boluo station', () => {
  const boluo = data.stationDatasetById('boluo-station')

  assert.equal(boluo.totalArea, 140)
  assert.equal(boluo.totalPower, 234)
  assert.equal(boluo.shops.length, 3)
  assert.deepEqual(
    boluo.shops.map(({ code, categoryLabel, area, reservedPower }) => ({ code, categoryLabel, area, reservedPower })),
    [
      { code: '1F01', categoryLabel: '轻餐饮', area: 60, reservedPower: 150 },
      { code: '1F02', categoryLabel: '零售', area: 40, reservedPower: 30 },
      { code: '1F03', categoryLabel: '零售', area: 40, reservedPower: 30 },
    ],
  )
  assert.match(boluo.supportingFacilities, /24KW/)
})

test('binds Boluo station assets and the Baojiali photos to 1F03', () => {
  const boluo = data.stationDatasetById('boluo-station')
  const shop = boluo.shops.find(({ code }) => code === '1F03')

  assert.match(boluo.heroImage, /assets\/boluo\/boluo-station\.png$/)
  assert.match(boluo.floor.mapImage, /assets\/boluo\/boluo-floor-plan\.jpg$/)
  assert.deepEqual(
    shop.media.filter(({ url }) => url).map(({ kind, url }) => ({ kind, url })),
    [
      { kind: 'cover', url: `${boluo.heroImage.replace(/assets\/boluo\/boluo-station\.png$/, '')}assets/boluo/1f03-storefront.jpg` },
      { kind: 'interior', url: `${boluo.heroImage.replace(/assets\/boluo\/boluo-station\.png$/, '')}assets/boluo/1f03-interior.jpg` },
    ],
  )
  assert.deepEqual(boluo.shops.map(({ status }) => status), ['空店铺', '空店铺', '营业中'])
})

test('aligns Boluo hotspots with the colored shop regions in the source plan', () => {
  const boluo = data.stationDatasetById('boluo-station')

  assert.deepEqual(
    boluo.shops.map(({ code, hotspot }) => ({ code, hotspot })),
    [
      { code: '1F01', hotspot: { x: 13.875, y: 78.1551, width: 6.0104, height: 10.1638 } },
      { code: '1F02', hotspot: { x: 28.5417, y: 80.3709, width: 5.2083, height: 7.5867 } },
      { code: '1F03', hotspot: { x: 62.6771, y: 80.6358, width: 5.2396, height: 7.5626 } },
    ],
  )
})

test('uses the workbook totals and shop record for Mata station', () => {
  const mata = data.stationDatasetById('mata-station')

  assert.equal(mata.totalArea, 20)
  assert.equal(mata.totalPower, 32)
  assert.equal(mata.shops.length, 1)
  assert.deepEqual(
    mata.shops.map(({ code, name, categoryLabel, area, reservedPower, status }) => ({ code, name, categoryLabel, area, reservedPower, status })),
    [{ code: '1F01', name: '中汇利通便利店', categoryLabel: '零售', area: 20, reservedPower: 20, status: '营业中' }],
  )
  assert.match(mata.supportingFacilities, /自动售货机 12 台/)
  assert.match(mata.supportingFacilities, /12KW/)
})

test('binds the Mata station plan, hero and storefront photo', () => {
  const mata = data.stationDatasetById('mata-station')
  const shop = mata.shops[0]

  assert.equal(mata.floor.mapAspectRatio, '8940 / 4956')
  assert.match(mata.heroImage, /assets\/mata\/mata-station\.png$/)
  assert.match(mata.floor.mapImage, /assets\/mata\/mata-floor-plan\.jpg$/)
  assert.deepEqual(
    shop.media.filter(({ url }) => url).map(({ kind, url }) => ({ kind, url })),
    [{ kind: 'cover', url: `${mata.heroImage.replace(/assets\/mata\/mata-station\.png$/, '')}assets/mata/1f01-storefront.jpg` }],
  )
})

test('uses the Baiyun planning totals and all 20 fifth-floor shop records', () => {
  const baiyun = data.stationDatasetById('baiyun-station')

  assert.equal(baiyun.station.city, '广东 · 广州')
  assert.equal(baiyun.station.shopCount, 20)
  assert.equal(baiyun.floor.floorNumber, '5F')
  assert.equal(baiyun.floor.shopIds.length, 20)
  assert.equal(baiyun.totalArea, 1976)
  assert.equal(baiyun.totalPower, 2350)
  assert.deepEqual(
    baiyun.shops.map(({ code, categoryLabel, area, reservedPower }) => ({ code, categoryLabel, area, reservedPower })),
    [
      { code: '5F01', categoryLabel: '重餐饮', area: 244, reservedPower: 200 },
      { code: '5F02', categoryLabel: '重餐饮', area: 74, reservedPower: 80 },
      { code: '5F03', categoryLabel: '重餐饮', area: 50, reservedPower: 80 },
      { code: '5F04', categoryLabel: '轻餐饮', area: 20, reservedPower: 30 },
      { code: '5F05', categoryLabel: '重餐饮', area: 220, reservedPower: 200 },
      { code: '5F06', categoryLabel: '重餐饮', area: 51, reservedPower: 80 },
      { code: '5F07', categoryLabel: '重餐饮', area: 128, reservedPower: 200 },
      { code: '5F08', categoryLabel: '重餐饮', area: 56, reservedPower: 80 },
      { code: '5F09', categoryLabel: '重餐饮', area: 125, reservedPower: 200 },
      { code: '5F10', categoryLabel: '轻餐饮', area: 20, reservedPower: 30 },
      { code: '5F11', categoryLabel: '重餐饮', area: 125, reservedPower: 200 },
      { code: '5F12', categoryLabel: '重餐饮', area: 56, reservedPower: 80 },
      { code: '5F13', categoryLabel: '轻餐饮', area: 20, reservedPower: 30 },
      { code: '5F14', categoryLabel: '重餐饮', area: 128, reservedPower: 200 },
      { code: '5F15', categoryLabel: '重餐饮', area: 51, reservedPower: 80 },
      { code: '5F16', categoryLabel: '重餐饮', area: 220, reservedPower: 200 },
      { code: '5F17', categoryLabel: '重餐饮', area: 50, reservedPower: 80 },
      { code: '5F18', categoryLabel: '重餐饮', area: 74, reservedPower: 80 },
      { code: '5F19', categoryLabel: '重餐饮', area: 244, reservedPower: 200 },
      { code: '5F20', categoryLabel: '轻餐饮', area: 20, reservedPower: 20 },
    ],
  )
})

test('binds the Baiyun plan, hero and verified storefronts to the requested shops', () => {
  const baiyun = data.stationDatasetById('baiyun-station')
  const storefrontByCode = Object.fromEntries(
    baiyun.shops.map((shop) => [shop.code, shop.media.find(({ kind, url }) => kind === 'cover' && url)?.url]),
  )

  assert.equal(baiyun.floor.mapAspectRatio, '1280 / 1857')
  assert.match(baiyun.heroImage, /assets\/baiyun\/baiyun-station\.png$/)
  assert.match(baiyun.floor.mapImage, /assets\/baiyun\/baiyun-floor-plan\.jpg$/)
  assert.deepEqual(
    Object.fromEntries(Object.entries(storefrontByCode).filter(([, url]) => url)),
    {
      '5F01': `${baiyun.heroImage.replace(/baiyun-station\.png$/, '')}5f01-yujianxiaomian.jpg`,
      '5F03': `${baiyun.heroImage.replace(/baiyun-station\.png$/, '')}5f03-zhengliuji.jpg`,
      '5F05': `${baiyun.heroImage.replace(/baiyun-station\.png$/, '')}5f05-mcdonalds.jpg`,
      '5F07': `${baiyun.heroImage.replace(/baiyun-station\.png$/, '')}5f07-dashixiong.jpg`,
      '5F08': `${baiyun.heroImage.replace(/baiyun-station\.png$/, '')}5f08-baiyun-canteen.jpg`,
      '5F09': `${baiyun.heroImage.replace(/baiyun-station\.png$/, '')}5f08-baiyun-canteen.jpg`,
      '5F12': `${baiyun.heroImage.replace(/baiyun-station\.png$/, '')}5f12-jianbingdao.jpg`,
      '5F14': `${baiyun.heroImage.replace(/baiyun-station\.png$/, '')}5f14-zhengliuji-liuyang.jpg`,
      '5F16': `${baiyun.heroImage.replace(/baiyun-station\.png$/, '')}5f16-kfc.jpg`,
      '5F17': `${baiyun.heroImage.replace(/baiyun-station\.png$/, '')}5f17-subway.jpg`,
      '5F18': `${baiyun.heroImage.replace(/baiyun-station\.png$/, '')}5f18-luckin.jpg`,
      '5F19': `${baiyun.heroImage.replace(/baiyun-station\.png$/, '')}5f19-zhenkungfu.jpg`,
    },
  )
  assert.equal(baiyun.shops.filter(({ status }) => status === '营业中').length, 12)
  assert.equal(baiyun.shops.filter(({ status }) => status === '空店铺').length, 8)
})
