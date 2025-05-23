import { FeatureFlags } from '@/shared/types/featureFlags'
import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localstorage'

const lastDesign = localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY)

const defaultFeatures = {
  isAppRedesigned: lastDesign === 'new' || lastDesign === null
}

let featureFlags: FeatureFlags = { ...defaultFeatures }

export function setFeatureFlag(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  return featureFlags[flag]
}

export function getAllFeatureFlags() {
  return featureFlags
}
