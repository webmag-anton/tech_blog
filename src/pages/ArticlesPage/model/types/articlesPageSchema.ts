import { EntityState } from '@reduxjs/toolkit'
import { SortOrder } from '@/shared/types/sort'
import {
  Article, ArticleSortField, ArticleType, ArticleView
} from '@/entities/Article'

export interface ArticlesPageSchema extends EntityState<Article>{
  isLoading?: boolean
  error?: string

  // pagination
  view: ArticleView
  page: number
  limit: number
  hasMore: boolean

  // filters / sort
  order: SortOrder
  sort: ArticleSortField
  search: string
  type: ArticleType

  _inited: boolean
}