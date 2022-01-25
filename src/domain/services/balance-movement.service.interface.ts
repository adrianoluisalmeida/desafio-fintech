export interface BalanceMovementServiceInterface {
  execute(accountId: string): Promise<number>;
}
