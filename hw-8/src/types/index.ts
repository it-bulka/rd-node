export interface SharedState { processed: number; skipped: number }
export type WorkerMsgState = 'processed' | 'skipped'