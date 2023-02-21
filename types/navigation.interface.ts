export default interface INavigation {
  url: string
  target: string
  title: string
  image: string
  children?: INavigation[]
  description?: string
}
