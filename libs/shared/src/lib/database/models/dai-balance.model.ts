import { Model } from 'objection';

class DaiBalanceModel extends Model {
  static tableName = 'dai_balances';
  static idColumn = 'address';
}

export default DaiBalanceModel;
