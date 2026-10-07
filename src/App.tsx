import { useState } from 'react'
import { AppShell } from './components/AppShell'
import { LoginPage } from './components/LoginPage'
import { ShopDetail } from './components/ShopDetail'
import { StationMap } from './components/StationMap'
import { StationOverview } from './components/StationOverview'
import { stationDatasetById, stationDatasets } from './data/mockData'
import type { Shop, ViewName } from './types'

export default function App() {
  const [view, setView] = useState<ViewName>('login')
  const [selectedStationId, setSelectedStationId] = useState(stationDatasets[0].station.id)
  const [selectedShop, setSelectedShop] = useState<Shop>(stationDatasets[0].shops[0])
  const dataset = stationDatasetById(selectedStationId)
  const { station, floor, shops } = dataset

  if (view === 'login') return <LoginPage stationCount={stationDatasets.length} onLogin={() => setView('overview')} />

  const goToMap = () => setView('map')
  const logout = () => setView('login')
  const openStation = (stationId: string) => {
    const nextDataset = stationDatasetById(stationId)
    setSelectedStationId(stationId)
    setSelectedShop(nextDataset.shops[0])
    setView('map')
  }
  const openDetails = (shop: Shop) => { setSelectedShop(shop); setView('detail') }

  return <AppShell view={view} title={station.name} stationCount={stationDatasets.length} onNavigate={setView} onLogout={logout} onBack={view === 'detail' ? goToMap : view === 'map' ? () => setView('overview') : undefined}>
    {view === 'overview' && <StationOverview datasets={stationDatasets} onOpenStation={openStation} />}
    {view === 'map' && <StationMap station={station} floor={floor} shops={shops} totalArea={dataset.totalArea} totalPower={dataset.totalPower} supportingFacilities={dataset.supportingFacilities} onBack={() => setView('overview')} onViewDetails={openDetails} />}
    {view === 'detail' && <ShopDetail station={station} floor={floor} shop={selectedShop} onBack={goToMap} />}
  </AppShell>
}
