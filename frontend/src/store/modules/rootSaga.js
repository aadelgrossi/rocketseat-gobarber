import { all } from 'redux-saga/efects';

import auth from './auth/sagas';

export default function* rootSaga() {
  return yield all([auth]);
}
