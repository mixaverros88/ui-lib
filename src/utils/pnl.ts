/**
 * Unrealised profit-and-loss for an open position, expressed in both
 * absolute currency and percentage terms.
 */
export interface PnL {
  pnlUsd: number | null
  pnlPct: number | null
}

/** Minimal position shape needed to compute mark-to-market PnL. */
export interface PnLInputs {
  buyPrice: number | string | null | undefined
  lastPrice: number | string | null | undefined
  filledQty: number | string | null | undefined
}

/**
 * Compute unrealised PnL from the latest observed market price. Returns
 * `{ null, null }` when any input is missing or non-finite (a freshly opened
 * position not yet priced, a corrupt row, etc.) so the UI can render a
 * placeholder instead of a bogus figure.
 *
 * The explicit null guard matters: `Number(null) === 0`, which would
 * otherwise silently produce PnL = -buyPrice * qty when a price is absent.
 */
export function computePnL(row: PnLInputs): PnL {
  if (row.buyPrice == null || row.lastPrice == null || row.filledQty == null) {
    return { pnlUsd: null, pnlPct: null }
  }
  const buy = Number(row.buyPrice)
  const last = Number(row.lastPrice)
  const qty = Number(row.filledQty)
  // `last <= 0` mirrors the `buy <= 0` guard: a real traded price is always
  // positive, so a zero/negative last price means a corrupt row or a bad quote
  // parse — never an asset that genuinely went to zero. Without this, such a row
  // yields pnlUsd = (0 - buy) * qty = -notional, a phantom ~100% loss that
  // silently drags portfolio totals far negative. Treat it as unpriced (null).
  if (!isFinite(buy) || !isFinite(last) || !isFinite(qty) || buy <= 0 || last <= 0) {
    return { pnlUsd: null, pnlPct: null }
  }
  return {
    pnlUsd: (last - buy) * qty,
    pnlPct: ((last - buy) / buy) * 100,
  }
}
