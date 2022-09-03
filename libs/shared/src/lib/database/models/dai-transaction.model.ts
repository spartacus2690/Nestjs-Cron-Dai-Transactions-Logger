import { Model } from 'objection';

class DaiTransactionModel extends Model {
  static tableName = 'dai_transactions';
  static idColumn = 'hash';
}

export default DaiTransactionModel;
