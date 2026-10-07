import { ArrowUpRight, Building2, Layers3, MapPinned, Ruler, Zap } from 'lucide-react'
import type { StationDataset } from '../types'

type StationOverviewProps = {
  datasets: StationDataset[]
  onOpenStation: (stationId: string) => void
}

export function StationOverview({ datasets, onOpenStation }: StationOverviewProps) {
  return (
    <div className="overview-page page-content">
      <section className="overview-heading">
        <div>
          <div className="eyebrow eyebrow--accent">SPACE NETWORK / {datasets.length.toString().padStart(2, '0')}</div>
          <h1>车站总览</h1>
          <p>从车站到楼层，浏览每一处被数字化标记的商业空间。</p>
        </div>
        <div className="overview-heading__note"><span className="status-dot" /> 数据同步正常 <small>LAST SYNC · 09:42:18</small></div>
      </section>

      <div className="station-list">
        {datasets.map((dataset, index) => {
          const { station, heroImage, totalArea, totalPower } = dataset
          const number = (index + 1).toString().padStart(2, '0')

          return <section className="station-feature" data-station-id={station.id} key={station.id}>
            <div className="station-feature__topline"><span>CONNECTED STATION / {number}</span><span>{station.city}</span></div>
            <div className="station-feature__content">
              <div className="station-feature__copy">
                <div className="station-feature__tag"><MapPinned size={14} /> 已接入空间网络</div>
                <h2>{station.name}</h2>
                <div className="station-feature__code">{station.code}</div>
                <p>{station.description}。以真实规划图为底图，叠加可探索的商业空间数据。</p>
                <button className="primary-button" onClick={() => onOpenStation(station.id)}>进入空间 <ArrowUpRight size={17} /></button>
              </div>
              <figure className="station-feature__visual">
                <img src={heroImage} alt={`${station.name}站房外景`} />
              </figure>
            </div>
            <div className="station-feature__stats">
              <div className="feature-stat"><Layers3 size={17} /><span>商业楼层</span><strong>{station.floors.toString().padStart(2, '0')}</strong><small>ACTIVE FLOOR</small></div>
              <div className="feature-stat"><Building2 size={17} /><span>商业空间</span><strong>{station.shopCount.toString().padStart(2, '0')}</strong><small>SPACES MAPPED</small></div>
              <div className="feature-stat"><Ruler size={17} /><span>总面积</span><strong>{totalArea}<small>㎡</small></strong><small>GROSS AREA</small></div>
              <div className="feature-stat"><Zap size={17} /><span>方案电量</span><strong>{totalPower}<small>KW</small></strong><small>PLANNED POWER</small></div>
            </div>
          </section>
        })}
      </div>
    </div>
  )
}
