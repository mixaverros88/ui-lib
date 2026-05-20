import './style.css'

// Components — existing
export { default as BaseAlert } from './components/BaseAlert.vue'
export { default as BaseBadge } from './components/BaseBadge.vue'
export { default as BaseBreadcrumb } from './components/BaseBreadcrumb.vue'
export { default as BaseButton } from './components/BaseButton.vue'
export { default as BaseLine } from './components/BaseLine.vue'
export { default as BaseLogo } from './components/BaseLogo.vue'
export { default as BaseModal } from './components/BaseModal.vue'
export { default as BaseRow } from './components/BaseRow.vue'
export { default as BaseSpinner } from './components/BaseSpinner.vue'
export { default as BaseToast } from './components/BaseToast.vue'
export { default as ColoredSquares } from './components/ColoredSquares.vue'
export { default as EarningsCard } from './components/EarningsCard.vue'
export { default as EuroAmount } from './components/EuroAmount.vue'
export { default as Pagination } from './components/Pagination.vue'
export { default as TrendArrow } from './components/TrendArrow.vue'

// Components — extracted from WireMate (Tier 1 + Tier 2)
export { default as BaseModalShell } from './components/BaseModalShell.vue'
export { default as BaseCollapsibleSection } from './components/BaseCollapsibleSection.vue'
export { default as BaseConfirmModal } from './components/BaseConfirmModal.vue'
export { default as BaseTextInputModal } from './components/BaseTextInputModal.vue'
export { default as BaseNotFoundPage } from './components/BaseNotFoundPage.vue'
export { default as BaseSidebar } from './components/BaseSidebar.vue'
export { default as BaseEntityPickerModal } from './components/BaseEntityPickerModal.vue'
export { default as BaseAppLayout } from './components/BaseAppLayout.vue'

// Composables
export { useTheme } from './composables/useTheme'
export type { UseThemeOptions } from './composables/useTheme'
export { useThemeClasses } from './composables/useThemeClasses'
export type { ThemeClasses } from './composables/useThemeClasses'
export { useEscapeKey } from './composables/useEscapeKey'
export { useDebouncedRef } from './composables/useDebounce'
export { useToast } from './composables/useToast'
export { useMobileSidebar } from './composables/useMobileSidebar'

// Enums
export { AlertEnum } from './enums/AlertEnum'
export { BaseBadgeEnum } from './enums/BaseBadgeEnum'
export { BaseButtonEnum } from './enums/BaseButtonEnum'
export { BaseButtonSizeEnum } from './enums/BaseButtonSizeEnum'
export { BaseLogoEnum, BaseLoginEnum } from './enums/BaseLogoEnum'
export { BaseModalEnum } from './enums/BaseModalEnum'
export { BaseToastEnum } from './enums/BaseToastEnum'
export { ColorsEnums } from './enums/ColorsEnums'
export { LineEnum } from './enums/LineEnum'
export { PositioningEnum } from './enums/PositioningEnum'

// Types
export type { BreadCrumb } from './components/BaseBreadcrumb.vue'
export type { NavItem, NavSection } from './types/sidebar'
export type { EntityPickerItem } from './types/entityPicker'

// Utils
export { getBaseColor, getBaseColorOf } from './utils/util'
export {
  methodBadgeSolid,
  methodBadgeBright,
  statusBadgeSolid,
  statusBadgeTinted,
} from './utils/httpColors'
