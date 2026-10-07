import { ArrowUpRight, Building2, ChevronRight, Ruler, Zap, X } from 'lucide-react'
import type { Shop, Station, Floor } from '../types'

type ShopInfoDrawerProps = { shop: Shop; station: Station; floor: Floor; onClose: () => void; onViewDetails: () => void }

export function ShopInfoDrawer({ shop, station, floor, onClose, onViewDetails }: ShopInfoDrawerProps) {
  return <aside className="shop-drawer">
    <div className="shop-drawer__accent" />
    <div className="shop-drawer__topline"><span>SPACE RECORD / {shop.code}</span><button className="icon-button icon-button--ghost" onClick={onClose} aria-label="关闭"><X size={16} /></button></div>
    <div className="shop-drawer__hero"><div className="drawer-index">{shop.code}</div><div className="drawer-type">{shop.category.toUpperCase()} SPACE</div><div className="drawer-state"><span className="status-dot" /> {shop.status}</div></div>
    <div className="drawer-metrics"><div><Ruler size={15} /><strong>{shop.area}<small>㎡</small></strong><span>建筑面积</span></div><div><Zap size={15} /><strong>{shop.reservedPower}<small>KW</small></strong><span>预留电量</span></div></div>
    <div className="drawer-section"><div className="drawer-section__label">基础信息 / BASE DATA</div><dl><div><dt>空间编号</dt><dd>{shop.code}</dd></div><div><dt>空间类型</dt><dd>{shop.categoryLabel}</dd></div><div><dt>建筑面积</dt><dd>{shop.area}㎡</dd></div><div><dt>预留电量</dt><dd>{shop.reservedPower}KW</dd></div><div><dt>所属车站</dt><dd>{station.name}</dd></div><div><dt>所属楼层</dt><dd>{floor.floorNumber}</dd></div></dl></div>
    <div className="drawer-section drawer-section--description"><div className="drawer-section__label">空间摘要 / SUMMARY</div><p>{shop.description}</p></div>
    <button className="drawer-detail-button" onClick={onViewDetails}><span><Building2 size={15} /> 查看完整详情</span><ChevronRight size={16} /></button>
    <div className="shop-drawer__footnote">SOURCE · {station.code} / {floor.floorNumber} COMMERCIAL SPACE</div>
  </aside>
}
