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

test('publishes Wu Chuan, Boluo and Mata as independent station datasets', () => {
  assert.equal(data.stationDatasets.length, 3)
  assert.deepEqual(data.stationDatasets.map(({ station }) => station.name), ['吴川站', '博罗站', '马踏站'])
  assert.equal(data.stationDatasetById('boluo-station').station.code, 'BOLUO STATION')
  assert.equal(data.stationDatasetById('mata-station').station.code, 'MATA STATION')
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
    [{ code: '1F01', name: '中汇利通便利店', categoryLabel: '零售', area: 20, reservedPower: 20, status: '运营中' }],
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
