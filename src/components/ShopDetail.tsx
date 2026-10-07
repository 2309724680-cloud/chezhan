import { ArrowLeft, ArrowUpRight, Building2, Check, CircleDashed, Image, Phone, Ruler, Video, Zap } from 'lucide-react'
import type { Floor, Shop, Station } from '../types'

type ShopDetailProps = { shop: Shop; station: Station; floor: Floor; onBack: () => void }

export function ShopDetail({ shop, station, floor, onBack }: ShopDetailProps) {
  const coverMedia = shop.media.find((media) => media.kind === 'cover' && media.url)

  return <div className="detail-page page-content">
    <div className="detail-breadcrumb"><button className="back-link" onClick={onBack}><ArrowLeft size={15} /> 返回{station.name}</button><span>/</span><span>{floor.floorNumber} 商业空间</span><span>/</span><strong>{shop.code}</strong></div>
    <section className="detail-hero"><div><div className="eyebrow eyebrow--accent">SPACE PROFILE / {shop.code}</div><h1>{shop.code}</h1><p>{shop.categoryLabel}空间 · {station.name} / {floor.floorNumber}</p></div><div className="detail-hero__metrics"><div><span>AREA</span><strong>{shop.area}<small>㎡</small></strong></div><div><span>POWER</span><strong>{shop.reservedPower}<small>KW</small></strong></div><div><span>STATUS</span><strong className="detail-status"><i /> {shop.status}</strong></div></div></section>
    <div className="detail-grid">
      <section className={`detail-cover${coverMedia ? ' detail-cover--photo' : ''}${coverMedia?.aspectRatio ? ' detail-cover--fitted' : ''}`} style={coverMedia?.aspectRatio ? { aspectRatio: coverMedia.aspectRatio } : undefined}>
        {coverMedia ? <img className="detail-cover__image" src={coverMedia.url} alt={`${shop.code} ${coverMedia.label}`} /> : <><div className="cover-grid" /><div className="cover-crosshair cover-crosshair--one" /><div className="cover-crosshair cover-crosshair--two" /></>}
        <div className="cover-title"><span>SPACE IMAGE</span><strong>{coverMedia ? coverMedia.label : '实体照片待上传'}</strong><small>{coverMedia ? 'PHOTO ASSET / VERIFIED' : 'PHOTO ASSET / PENDING'}</small></div><div className="cover-corner">{shop.code} · {floor.floorNumber}<br />{station.code}</div>
      </section>
      <section className="detail-info"><div className="detail-card__head"><div><span className="eyebrow">SPACE DATA</span><h2>空间信息</h2></div><Building2 size={20} /></div><dl className="detail-list"><div><dt>空间编号</dt><dd>{shop.code}</dd></div><div><dt>空间类型</dt><dd>{shop.categoryLabel}</dd></div><div><dt>建筑面积</dt><dd>{shop.area}㎡</dd></div><div><dt>预留电量</dt><dd>{shop.reservedPower}KW</dd></div><div><dt>所属车站</dt><dd>{station.name}</dd></div><div><dt>所属楼层</dt><dd>{floor.floorNumber}</dd></div></dl><button className="outline-button" onClick={onBack}>回到平面图 <ArrowUpRight size={15} /></button></section>
      <section className="detail-description"><div className="detail-card__head"><div><span className="eyebrow">SPACE INTRODUCTION</span><h2>店铺介绍</h2></div><Ruler size={20} /></div><p>{shop.description}</p><div className="detail-meta-row"><span><Check size={14} /> 基础数据已录入</span><span><CircleDashed size={14} /> 资料完善度 40%</span></div></section>
      <section className="media-section"><div className="detail-card__head"><div><span className="eyebrow">MEDIA & CONTACT</span><h2>资料与联系</h2></div><Phone size={20} /></div><div className="media-grid">{shop.media.map((media) => media.url ? <figure className="media-item" key={media.kind}><img src={media.url} alt={`${shop.code} ${media.label}`} /><figcaption><strong>{media.label}</strong><span>现场实拍</span></figcaption></figure> : <div className="media-empty" key={media.kind}>{media.kind === 'video' ? <Video size={18} /> : <Image size={18} />}<strong>{media.label}</strong><span>后续接入真实资料</span></div>)}<div className="media-empty"><Phone size={18} /><strong>联系人 · 待补充</strong><span>招商联系方式</span></div></div></section>
    </div>
    <div className="detail-footer"><span>DATA RECORD · {station.code} / {floor.floorNumber} / {shop.code}</span><span>LAST UPDATED · DEMO DATASET 01</span><Zap size={14} /></div>
  </div>
}
