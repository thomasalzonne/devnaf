export interface IDivatColor {
  hexacode: string
  name: string
}

export interface IDivatHomeLook {
  image: string
  name: string
  products: []
  slug: string
}

export interface IDivatHomeNewProducts {
  image: string
  name: string
  products: []
  slug: string
}

export interface IDivatInstagram {
  image: string
  link: string
}

export type NavigationType = 'blank' | 'category'

export interface INavigationItem {
  type: NavigationType
  title: string
  slug: string
  children?: INavigationItem[]
}

export interface IDivatNavigations {
  main: INavigationItem[]
}

export interface IDivatData {
  colors: IDivatColor[]
  home_looks: IDivatHomeLook
  home_new_products: IDivatHomeNewProducts
  instagram: IDivatInstagram[]
  navigations: IDivatNavigations
}
