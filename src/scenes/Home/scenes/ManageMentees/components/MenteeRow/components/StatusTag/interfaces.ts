export interface StatusTagProps {
  state:
    | 'PENDING'
    | 'POOL'
    | 'DISCARDED'
    | 'FAILED_FROM_WILDCARD'
    | 'APPROVED'
    | 'REJECTED'
    | 'ASSIGNED';
}
