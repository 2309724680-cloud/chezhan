import { ArrowLeft, Layers3, Ruler, ScanLine, Zap } from 'lucide-react'
import { useState } from 'react'
import type { Floor, Shop, Station } from '../types'
import { MapViewer } from './MapViewer'
import { ShopInfoDrawer } from './ShopInfoDrawer'

type StationMapProps = {
  station: Station
  floor: Floor
  shops: Shop[]
  totalArea: number
  totalPower: number
  supportingFacilities?: string
  onBack: () => void
  onViewDetails: (shop: Shop) => void
}

export function StationMap({ station, floor, shops, totalArea, totalPower, supportingFacilities, onBack, onViewDetails }: StationMapProps) {
  const [selectedShop, setSelectedShop] = useState<Shop>()
  return <div className="map-page">
    <header className="map-page__header">
      <div className="map-breadcrumb"><button className="back-link" onClick={onBack}><ArrowLeft size={15} /> 车站总览</button><span>/</span><strong>{station.name}</strong><span>/</span><span>{floor.floorNumber} 商业空间</span></div>
      <div className="map-page__title"><div><div className="eyebrow eyebrow--accent">{station.code} / DIGITAL FLOOR PLAN</div><h1>{floor.name}</h1><p>可探索的商业空间图谱 · {floor.floorNumber}</p></div><div className="floor-selector"><span>楼层</span><button className="is-active">1F</button><button disabled>B1</button><button disabled>2F</button><button disabled>3F</button></div></div>
    </header>
    <div className="map-workspace">
      <section className="map-panel"><MapViewer floor={floor} shops={shops} selectedShopId={selectedShop?.id} onSelectShop={setSelectedShop} /></section>
      <aside className="map-side-panel">
        <div className="side-panel__head"><div><span className="eyebrow">SPACE OVERVIEW</span><h2>一层商业空间</h2></div><ScanLine size={20} /></div>
        <div className="side-panel__station"><div className="station-mini-mark"><span /><span /></div><div><strong>{station.name}</strong><small>{station.code}</small></div><span className="side-panel__live"><i /> LIVE</span></div>
        <div className="side-panel__stats"><div><Layers3 size={15} /><span>商业空间</span><strong>{shops.length}<small> 个</small></strong></div><div><Ruler size={15} /><span>总建筑面积</span><strong>{totalArea}<small>㎡</small></strong></div><div><Zap size={15} /><span>预留电量</span><strong>{totalPower}<small>KW</small></strong></div></div>
        {supportingFacilities && <div className="side-panel__facilities"><Zap size={13} /><span>{supportingFacilities}</span></div>}
        <div className="side-panel__section"><div className="section-label"><span>SPACES ON FLOOR</span><span>01 / 0{shops.length}</span></div>{shops.map((shop, index) => <button className={`side-space ${selectedShop?.id === shop.id ? 'is-selected' : ''}`} key={shop.id} onClick={() => setSelectedShop(shop)}><span className="side-space__number">0{index + 1}</span><span className="side-space__main"><strong>{shop.code}</strong><small>{shop.categoryLabel} · {shop.area}㎡</small></span><span className="side-space__power">{shop.reservedPower}KW</span></button>)}</div>
        <div className="side-panel__tip"><span className="tip-mark">+</span><div><strong>探索空间</strong><p>点击图面中的高亮区域，查看店铺基础信息。</p></div></div>
        <div className="side-panel__foot"><span>MAP SOURCE</span><strong>{station.code} / {floor.floorNumber}</strong></div>
      </aside>
      {selectedShop && <ShopInfoDrawer shop={selectedShop} station={station} floor={floor} onClose={() => setSelectedShop(undefined)} onViewDetails={() => onViewDetails(selectedShop)} />}
    </div>
  </div>
}
