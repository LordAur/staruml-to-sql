const Connector = require('./connector');
const Table = require('./table');

class Schema {
  /**
   * Table created query
   *
   * @param {string} TableName
   * @returns object | promise
   * @memberof Schema
   */
  createTable(TableName, callback) {
    Connector.schemaBindings.statement.push('CREATE TABLE');
    Connector.schemaTable = TableName;

    callback(Table);

    const query = Schema.queryBuilder();
    Schema.resetBindings();

    return query;
  }

  /**
   * Compile query Table
   *
   * @static
   * @returns string query
   * @memberof Table
   */
  static queryBuilder() {
    const toSchema = `${Connector.schemaConnection !== null ? `${Connector.schemaConnection}.${Connector.schemaTable}` : `${Connector.schemaTable}`}`;

    let commandQuery = '';
    if (Connector.schemaBindings.statement[0] === 'CREATE TABLE') {
      commandQuery = `(${Connector.schemaBindings.commandAdd.join(', ')})`;
    }

    const query = `${Connector.schemaBindings.statement.join(' ')} ${toSchema} ${commandQuery};`;

    return query;
  }

  /**
   * Reset all schema bindings
   *
   * @static
   * @memberof Schema
   */
  static resetBindings() {
    Connector.schemaConnection = null;
    Connector.schemaTable = null;
    Connector.schemaBindings.statement = [];
    Connector.schemaBindings.commandAdd = [];
    Connector.queries = [];
  }
}

module.exports = new Schema();
