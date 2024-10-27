export interface LcdpMaterialMeta {
  name: string
  group: string
  icon: string
  label: string
}

export interface Position {
  x: number
  y: number
}

export interface LcdpMaterialPosition {
  lt: Position
  rb: Position
}

export interface LcdpMaterialInternal {
  id: string
  layer: number
  lock: boolean
  position: LcdpMaterialPosition

}