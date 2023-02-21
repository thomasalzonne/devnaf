export interface IHydraView {
  'hydra:view': {
    '@id': string
    '@type': string
    'hydra:first': string
    'hydra:last': string
    'hydra:previous': string
    'hydra:next': string
  }
}

export interface IHydraSearch {
  'hydra:search': {
    '@type': string
    'hydra:template': string
    'hydra:variableRepresentation': string
    'hydra:mapping': [
      {
        '@type': string
        variable: string
        property: string
        required: true
      }
    ]
  }
}

export interface IHydraTotalItems {
  'hydra:totalItems': number
}

export interface IHydraDefault {
  '@id': string
  '@type': string
  '@context': string
}

export interface IHydra
  extends IHydraDefault,
    IHydraView,
    IHydraSearch,
    IHydraTotalItems {}
