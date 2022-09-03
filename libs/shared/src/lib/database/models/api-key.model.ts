import { Model } from 'objection';
import ApiRequestLogModel from './api-request-log.model';

class ApiKeyModel extends Model {
  static tableName = 'api_keys';
  static idColumn = 'api_key';

  static relationMappings = {
    requests: {
      relation: Model.HasManyRelation,
      modelClass: ApiRequestLogModel,
      join: {
        from: 'api_keys.api_key',
        to: 'api_request_logs.api_key',
      },
    },
  };
}

export default ApiKeyModel;
