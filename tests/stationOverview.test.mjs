import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

let server
let StationOverview
let AppShell
let LoginPage
let stationDatasets

before(async () => {
  server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  ;({ StationOverview } = await server.ssrLoadModule('/src/components/StationOverview.tsx'))
  ;({ AppShell } = await server.ssrLoadModule('/src/components/AppShell.tsx'))
  ;({ LoginPage } = await server.ssrLoadModule('/src/components/LoginPage.tsx'))
  ;({ stationDatasets } = await server.ssrLoadModule('/src/data/mockData.ts'))
})

after(async () => {
  await server?.close()
})

test('renders every connected station with its own image and totals', () => {
  const markup = renderToStaticMarkup(
    React.createElement(StationOverview, { datasets: stationDatasets, onOpenStation: () => {} }),
  )

  assert.match(markup, /吴川站/)
  assert.match(markup, /博罗站/)
  assert.match(markup, /马踏站/)
  assert.match(markup, /白云站/)
  assert.match(markup, /boluo-station\.png/)
  assert.match(markup, /mata-station\.png/)
  assert.match(markup, /baiyun-station\.png/)
  assert.match(markup, />140<small>㎡/)
  assert.match(markup, />234<small>KW/)
  assert.match(markup, />20<small>㎡/)
  assert.match(markup, />32<small>KW/)
})

test('renders the connected station count from AppShell props', () => {
  const markup = renderToStaticMarkup(
    React.createElement(
      AppShell,
      {
        view: 'overview',
        title: '车站总览',
        stationCount: stationDatasets.length,
        onNavigate: () => {},
        onLogout: () => {},
      },
      React.createElement('span', null, 'content'),
    ),
  )

  assert.match(markup, /04 \/ 04/)
})

test('describes the login experience as a four-station network', () => {
  const markup = renderToStaticMarkup(
    React.createElement(LoginPage, { stationCount: stationDatasets.length, onLogin: () => {} }),
  )

  assert.match(markup, /04 STATIONS \/ 1F/)
  assert.doesNotMatch(markup, /WUCHUAN \/ 1F/)
})
