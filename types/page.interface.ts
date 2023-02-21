export interface IPageContentDetails {
  seo_title?: string
  seo_description?: string
}

export default interface IPageContent {
  title: string
  content: string
  details: IPageContentDetails
}
