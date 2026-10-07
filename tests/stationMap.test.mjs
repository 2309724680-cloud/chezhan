import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

let server
let StationMap
let ShopInfoDrawer
let ShopDetail
let boluo
let mata

before(async () => {
  server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  ;({ StationMap } = await server.ssrLoadModule('/src/components/StationMap.tsx'))
  ;({ ShopInfoDrawer } = await server.ssrLoadModule('/src/components/ShopInfoDrawer.tsx'))
  ;({ ShopDetail } = await server.ssrLoadModule('/src/components/ShopDetail.tsx'))
  const { stationDatasetById } = await server.ssrLoadModule('/src/data/mockData.ts')
  boluo = stationDatasetById('boluo-station')
  mata = stationDatasetById('mata-station')
})

after(async () => {
  await server?.close()
})

test('renders the Boluo map source and workbook summary totals', () => {
  const markup = renderToStaticMarkup(
    React.createElement(StationMap, {
      station: boluo.station,
      floor: boluo.floor,
      shops: boluo.shops,
      totalArea: boluo.totalArea,
      totalPower: boluo.totalPower,
      supportingFacilities: boluo.supportingFacilities,
      onBack: () => {},
      onViewDetails: () => {},
    }),
  )

  assert.match(markup, /BOLUO STATION \/ 1F/)
  assert.match(markup, />234<small>KW/)
  assert.match(markup, /智能按摩椅 2 处、自动售货机 4 台，配套电量 24KW/)
  assert.match(markup, /alt="一层商业空间商业规划图"/)
  assert.match(markup, /aspect-ratio:9600 \/ 4152/)
})

test('renders the current station in the shop drawer source', () => {
  const markup = renderToStaticMarkup(
    React.createElement(ShopInfoDrawer, {
      shop: boluo.shops[2],
      station: boluo.station,
      floor: boluo.floor,
      onClose: () => {},
      onViewDetails: () => {},
    }),
  )

  assert.match(markup, /SOURCE · BOLUO STATION \/ 1F COMMERCIAL SPACE/)
})

test('renders both Baojiali photos in the 1F03 detail page', () => {
  const markup = renderToStaticMarkup(
    React.createElement(ShopDetail, {
      shop: boluo.shops[2],
      station: boluo.station,
      floor: boluo.floor,
      onBack: () => {},
    }),
  )

  assert.match(markup, /boluo\/1f03-storefront\.jpg/)
  assert.match(markup, /boluo\/1f03-interior\.jpg/)
  assert.match(markup, /保嘉利便利店门头/)
  assert.match(markup, /便利店商品陈列/)
  assert.match(markup, /class="detail-cover detail-cover--photo detail-cover--fitted" style="aspect-ratio:4032 \/ 3024"/)
})

test('renders the Mata map summary and old-station shop record', () => {
  const markup = renderToStaticMarkup(
    React.createElement(StationMap, {
      station: mata.station,
      floor: mata.floor,
      shops: mata.shops,
      totalArea: mata.totalArea,
      totalPower: mata.totalPower,
      supportingFacilities: mata.supportingFacilities,
      onBack: () => {},
      onViewDetails: () => {},
    }),
  )

  assert.match(markup, /MATA STATION \/ 1F/)
  assert.match(markup, />32<small>KW/)
  assert.match(markup, /自动售货机 12 台，配套电量 12KW/)
  assert.match(markup, /aspect-ratio:8940 \/ 4956/)
})

test('renders the Zhonghuilitong storefront in Mata 1F01 details', () => {
  const markup = renderToStaticMarkup(
    React.createElement(ShopDetail, {
      shop: mata.shops[0],
      station: mata.station,
      floor: mata.floor,
      onBack: () => {},
    }),
  )

  assert.match(markup, /mata\/1f01-storefront\.jpg/)
  assert.match(markup, /中汇利通便利店门头/)
  assert.match(markup, /商业位于老站房/)
  assert.match(markup, /class="detail-cover detail-cover--photo detail-cover--fitted" style="aspect-ratio:947 \/ 745"/)
})
