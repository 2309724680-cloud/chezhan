import { Crosshair, Maximize2, Minus, Move, Plus, RotateCcw } from 'lucide-react'
import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, WheelEvent } from 'react'
import type { Floor, Shop } from '../types'

type MapViewerProps = { floor: Floor; shops: Shop[]; selectedShopId?: string; onSelectShop: (shop: Shop) => void }

export function MapViewer({ floor, shops, selectedShopId, onSelectShop }: MapViewerProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.98)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef({ x: 0, y: 0, ox: 0, oy: 0 })

  const zoomBy = (delta: number) => setScale((value) => Math.min(2.2, Math.max(0.62, Number((value + delta).toFixed(2)))))
  const resetView = () => { setScale(0.98); setOffset({ x: 0, y: 0 }) }
  const fitView = () => { setScale(0.84); setOffset({ x: 0, y: 0 }) }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    zoomBy(event.deltaY > 0 ? -0.08 : 0.08)
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('.shop-hotspot')) return
    setDragging(true)
    dragRef.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    setOffset({ x: dragRef.current.ox + event.clientX - dragRef.current.x, y: dragRef.current.oy + event.clientY - dragRef.current.y })
  }
  const handlePointerUp = () => setDragging(false)

  return (
    <div className="map-viewer">
      <div className="map-viewer__legend"><span className="legend-line" /> 原始规划图 <span className="legend-hotspot legend-hotspot--operating" /> 营业店铺 <span className="legend-hotspot legend-hotspot--vacant" /> 空店铺 <span className="legend-help"><Move size={12} /> 拖动平移 · 滚轮缩放</span></div>
      <div className={`map-viewport ${dragging ? 'is-dragging' : ''}`} ref={viewportRef} onWheel={handleWheel} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}>
        <div className="map-stage" style={{ aspectRatio: floor.mapAspectRatio, transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})` }}>
          <img src={floor.mapImage} alt={`${floor.name}商业规划图`} draggable={false} />
          <div className="map-stage__wash" />
          {shops.map((shop) => {
            const selected = selectedShopId === shop.id
            const stateClass = shop.status === '运营中' || shop.status === '营业中' ? 'shop-hotspot--operating' : 'shop-hotspot--vacant'
            return <button key={shop.id} className={`shop-hotspot ${stateClass} ${selected ? 'is-selected' : ''}`} style={{ left: `${shop.hotspot.x}%`, top: `${shop.hotspot.y}%`, width: `${shop.hotspot.width}%`, height: `${shop.hotspot.height}%` }} onClick={() => onSelectShop(shop)} aria-label={`查看 ${shop.code} · ${shop.status}`}>
              <span className="hotspot-code">{shop.code}</span><span className="hotspot-label"><strong>{shop.code}</strong><small>{shop.status} · {shop.categoryLabel} · {shop.area}㎡</small></span>
            </button>
          })}
        </div>
        <div className="map-viewport__axis map-viewport__axis--x">A / 01&nbsp;&nbsp; B / 02&nbsp;&nbsp; C / 03&nbsp;&nbsp; D / 04</div>
        <div className="map-viewport__axis map-viewport__axis--y">NORTH<br /><span>↑</span></div>
      </div>
      <div className="map-controls">
        <button className="icon-button" onClick={() => zoomBy(0.12)} aria-label="放大"><Plus size={16} /></button>
        <div className="zoom-readout">{Math.round(scale * 100)}%</div>
        <button className="icon-button" onClick={() => zoomBy(-0.12)} aria-label="缩小"><Minus size={16} /></button>
        <span className="control-divider" />
        <button className="icon-button" onClick={fitView} aria-label="适应窗口"><Maximize2 size={15} /></button>
        <button className="icon-button" onClick={resetView} aria-label="重置视图"><RotateCcw size={15} /></button>
        <button className="icon-button" onClick={() => viewportRef.current?.focus()} aria-label="定位地图"><Crosshair size={15} /></button>
      </div>
      <div className="map-viewer__scale"><span /> 0 &nbsp;&nbsp; 10 &nbsp;&nbsp; 20m</div>
    </div>
  )
}
