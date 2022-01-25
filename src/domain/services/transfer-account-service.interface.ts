export interface TransferAccountServiceInterface {
  execute(accountId: string): Promise<boolean>;
}
