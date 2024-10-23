export enum RabbitMQ {
  QuestionnairesQueue = 'questionnaires',
}

export enum QuestionnaireMsg {
  CREATE = 'CREATE_QUESTIONNAIRE',
  FIND_ALL = 'FIND_QUESTIONNAIRES',
  FIND_ONE = 'FIND_QUESTIONNAIRE',
  UPDATE = 'UPDATE_QUESTIONNAIRE',
  DELETE = 'DELETE_QUESTIONNAIRE',
}
