import { Model } from 'objection';
import ApiKeyModel from './api-key.model';

class ApiRequestLogModel extends Model {
  static tableName = 'api_request_logs';

  static relationMappings = {
    animal: {
      relation: Model.HasOneRelation,
      modelClass: ApiKeyModel,
      join: {
        from: 'api_request_logs.id',
        to: 'api_keys.api_key',
      },
    },
  };
}

export default ApiRequestLogModel;
