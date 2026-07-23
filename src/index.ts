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
export { default as BasePageHeader } from './components/BasePageHeader.vue'
export { default as BaseToolbarButton } from './components/BaseToolbarButton.vue'
export { default as BaseActionButton } from './components/BaseActionButton.vue'
export { default as BaseCopyButton } from './components/BaseCopyButton.vue'
export { default as BaseGoogleSignInButton } from './components/BaseGoogleSignInButton.vue'
export { default as BaseLoginForm } from './components/BaseLoginForm.vue'
export { default as BaseNotificationPanel } from './components/BaseNotificationPanel.vue'
export { default as BaseChipButton } from './components/BaseChipButton.vue'
export { default as BaseRemoveButton } from './components/BaseRemoveButton.vue'
export { default as BaseStatusPill } from './components/BaseStatusPill.vue'

// Components — extracted from TradeAutomation
export { default as BaseInput } from './components/BaseInput.vue'
export { default as BaseSelect } from './components/BaseSelect.vue'
export { default as BaseDropdown } from './components/BaseDropdown.vue'
export { default as BaseSegmentedControl } from './components/BaseSegmentedControl.vue'
export { default as BaseTable } from './components/BaseTable.vue'
export { default as BaseSpecFields } from './components/BaseSpecFields.vue'
export { default as BaseStatBreakdown } from './components/BaseStatBreakdown.vue'
export { default as BaseFilterChip } from './components/BaseFilterChip.vue'
export { default as BaseCredentialsForm } from './components/BaseCredentialsForm.vue'
export type { CredentialsView, CredentialsUpdate } from './components/BaseCredentialsForm.vue'

// Composables
export { useTheme, initTheme } from './composables/useTheme'
export type { UseThemeOptions } from './composables/useTheme'
export { useThemeClasses } from './composables/useThemeClasses'
export type { ThemeClasses } from './composables/useThemeClasses'
export { useEscapeKey } from './composables/useEscapeKey'
export { useDebouncedRef } from './composables/useDebounce'
export { useToast } from './composables/useToast'
export { useMobileSidebar } from './composables/useMobileSidebar'
export { useSidebarCollapse } from './composables/useSidebarCollapse'
export type { UseSidebarCollapseOptions } from './composables/useSidebarCollapse'
export { useNotifications } from './composables/useNotifications'
export { useQueryParamSync } from './composables/useQueryParamSync'
export { useFieldClasses } from './composables/useFieldClasses'
export type { FieldClasses } from './composables/useFieldClasses'

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
export type { LoginCredentials } from './types/auth'
export type { NotificationItem } from './types/notification'
export type { SegmentedOption } from './types/segmented'
export type { DropdownOption } from './types/dropdown'
export type { TableColumn } from './types/table'
export type { SpecField, SpecFieldType, SpecFieldValue } from './types/specField'
export type { StatBreakdownItem } from './types/statBreakdown'

// Utils
export { getBaseColor, getBaseColorOf } from './utils/util'
export {
  methodBadgeSolid,
  methodBadgeBright,
  methodBadgeTinted,
  statusBadgeSolid,
  statusBadgeTinted,
  statusBadgeSoft,
} from './utils/httpColors'
export { rowKeyMissing, rowValueMissing } from './utils/kvRows'
export type { KeyValueRowLike } from './utils/kvRows'
export { sanitizeHtml, isSafeHref } from './utils/sanitizeHtml'
export {
  fmtNumber,
  fmtDate,
  fmtDateTime,
  fmtDateTimeMs,
  fmtDateShort,
  fmtCalendarDate,
  fmtCalendarDateTime,
  fmtMsAsSeconds,
  fmtBytes,
  fmtPrice,
  fmtPct,
  fmtUsd,
  fmtDuration,
} from './utils/format'
export { buildSpecParams, firstInvalidNumericSpec } from './utils/specForm'
export { computePnL } from './utils/pnl'
export type { PnL, PnLInputs } from './utils/pnl'
