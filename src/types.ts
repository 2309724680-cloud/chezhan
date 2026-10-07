export type ViewName = 'login' | 'overview' | 'map' | 'detail'

export type ShopMedia = {
  kind: 'cover' | 'interior' | 'video'
  label: string
  url?: string
  aspectRatio?: string
}

export type Shop = {
  id: string
  floorId: string
  code: string
  name: string
  category: string
  categoryLabel: string
  area: number
  reservedPower: number
  description: string
  contact?: string
  status?: string
  media: ShopMedia[]
  hotspot: { x: number; y: number; width: number; height: number }
}

export type Floor = {
  id: string
  stationId: string
  name: string
  floorNumber: string
  mapImage: string
  mapAspectRatio: string
  shopIds: string[]
}

export type Station = {
  id: string
  name: string
  code: string
  description: string
  city: string
  floors: number
  shopCount: number
}

export type StationDataset = {
  station: Station
  floor: Floor
  shops: Shop[]
  heroImage: string
  totalArea: number
  totalPower: number
  supportingFacilities?: string
}
