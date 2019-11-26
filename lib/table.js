const Connector = require('./connector');

class Table {
  /**
   * Set primary column with column type is integer and auto increment
   *
   * @param {string} [column='id']
   * @returns this
   * @memberof Table
   */
  increment(column = 'id') {
    Table.addCommand(`\`${column}\` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY`);
    return this;
  }

  /**
   * Set column with integer type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  integer(column) {
    Table.addCommand(`\`${column}\` INT`);
    return this;
  }

  /**
   * Set column with small integer type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  smallint(column) {
    Table.addCommand(`\`${column}\` SMALLINT`);
    return this;
  }

  /**
   * Set column with big integer type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  bigint(column) {
    Table.addCommand(`${column} BIGINT`);
    return this;
  }

  /**
   * Set column with bit type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  bit(column, length = 7) {
    Table.addCommand(`\`${column}\` BIT(${length})`);
    return this;
  }

  /**
   * Set column with binary type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  binary(column) {
    Table.addCommand(`\`${column}\` BINARY`);
    return this;
  }

  /**
   * Set column with varbinary type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  varbinary(column) {
    Table.addCommand(`\`${column}\` VARBINARY`);
    return this;
  }

  /**
   * Set column with bool type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  boolean(column) {
    Table.addCommand(`\`${column}\` BOOL`);
    return this;
  }

  /**
   * Set column with blob type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  blob(column) {
    Table.addCommand(`\`${column}\` BLOB`);
    return this;
  }

  /**
   * Set column with char type
   *
   * @param {string} column
   * @param {number} [length=100]
   * @returns this
   * @memberof Table
   */
  char(column, length = 100) {
    Table.addCommand(`\`${column}\` CHAR(${length})`);
    return this;
  }

  /**
   * Set column with date type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  date(column) {
    Table.addCommand(`\`${column}\` DATE`);
    return this;
  }

  /**
   * Set column with datetime type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  datetime(column) {
    Table.addCommand(`\`${column}\` DATETIME`);
    return this;
  }

  /**
   * Set column with decimal type
   *
   * @param {string} column
   * @param {number} [precision=8]
   * @param {number} [scale=2]
   * @returns this
   * @memberof Table
   */
  decimal(column, precision = 8, scale = 2) {
    Table.addCommand(`\`${column}\` DECIMAL(${precision}, ${scale})`);
    return this;
  }

  /**
   * Set column with double type
   *
   * @param {string} column
   * @param {number} [precision=8]
   * @param {number} [scale=2]
   * @returns this
   * @memberof Table
   */
  double(column, precision = 8, scale = 2) {
    Table.addCommand(`\`${column}\` DOUBLE(${precision}, ${scale})`);
    return this;
  }

  /**
   * Set column with float type
   *
   * @param {string} column
   * @param {number} [precision=8]
   * @param {number} [scale=2]
   * @returns this
   * @memberof Table
   */
  float(column, precision = 8, scale = 2) {
    Table.addCommand(`\`${column}\` FLOAT(${precision}, ${scale})`);
    return this;
  }

  /**
   * Set column with geometry type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  geometry(column) {
    Table.addCommand(`\`${column}\` GEOMETRY`);
    return this;
  }

  /**
   * Set column with linestring type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  linestring(column) {
    Table.addCommand(`\`${column}\` LINESTRING`);
    return this;
  }

  /**
   * Set column with point type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  point(column) {
    Table.addCommand(`\`${column}\` POINT`);
    return this;
  }

  /**
   * Set column with polygon type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  polygon(column) {
    Table.addCommand(`\`${column}\` POLYGON`);
    return this;
  }

  /**
   * Set column with varchar type
   *
   * @param {string} column
   * @param {number} [length=100]
   * @returns this
   * @memberof Table
   */
  varchar(column, length = 100) {
    Table.addCommand(`\`${column}\` VARCHAR(${length})`);
    return this;
  }

  /**
   * Set column with text type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  text(column) {
    Table.addCommand(`\`${column}\` TEXT`);
    return this;
  }

  /**
   * Set column with time type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  time(column) {
    Table.addCommand(`\`${column}\` TIME`);
    return this;
  }

  /**
   * Set column with timestamp type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  timestamp(column) {
    Table.addCommand(`\`${column}\` TIMESTAMP`);
    return this;
  }

  /**
   * Set column with value NULL or NOT NULL
   *
   * @param {boolean} [value=true]
   * @returns this
   * @memberof Table
   */
  nullable(value = true) {
    if (value === true) {
      Table.pushToLastBinding('NULL');
    }

    if (value === false) {
      Table.pushToLastBinding('NOT NULL');
    }

    return this;
  }

  /**
   * Set column with unique index key
   *
   * @returns this
   * @memberof Table
   */
  unique() {
    const last = Table.getQueryLastBinding();
    const column = last.query.split(' ');

    Connector.schemaBindings.commandAdd.push(`UNIQUE ${Connector.schemaTable}_${column[0].replace(/`/g, '')}_unique(${column[0]})`);

    return this;
  }

  /**
   * Set integer column with unsigned
   *
   * @returns this
   * @memberof Table
   */
  unsigned() {
    Table.pushToLastBinding('UNSIGNED');
    return this;
  }

  /**
   * Set primary key index to column
   *
   * @returns this
   * @memberof Table
   */
  primary() {
    const last = Table.getQueryLastBinding();
    const column = last.query.split(' ');

    Connector.schemaBindings.commandAdd.push(`PRIMARY KEY ${Connector.schemaTable}_${column[0].replace(/`/g, '')}_primary(${column[0]})`);

    return this;
  }

  /**
   * Query foreign key
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  foreign(column) {
    const query = `CONSTRAINT ${Connector.schemaTable}_${column}_foreign FOREIGN KEY (\`${column}\`)`;

    Connector.schemaBindings.commandAdd.push(query);

    return this;
  }

  /**
   * Query references column for foreign key
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  references(column) {
    Table.pushToLastBinding(`REFERENCES ? (${column})`);
    return this;
  }

  /**
   * Query references table
   *
   * @param {string} table
   * @returns this
   * @memberof Table
   */
  on(table) {
    const last = Table.getQueryLastBinding();
    const query = last.query.replace('?', table);

    Connector.schemaBindings.commandAdd[last.index] = query;

    return this;
  }

  /**
   * Add query to schema bindings with binding command type
   *
   * @static
   * @param {string} query
   * @memberof Table
   */
  static addCommand(query) {
    Connector.schemaBindings.commandAdd.push(`${query}`);
  }

  /**
   * Method to get database active
   *
   * @static
   * @returns string
   * @memberof Table
   */
  static getSchema() {
    const toSchema = `${Connector.schemaConnection !== null ? `${Connector.schemaConnection}.${Connector.schemaTable}` : `${Connector.schemaTable}`}`;
    return toSchema;
  }

  /**
   * Method used to get last query in schema binding
   *
   * @static
   * @returns string
   * @memberof Table
   */
  static getQueryLastBinding(type = 'commandAdd') {
    let lastBindingIndex = '';
    let lastQuery = '';

    if (type !== 'queries') {
      lastBindingIndex = (Connector.schemaBindings[type].length - 1);
      lastQuery = Connector.schemaBindings[type][lastBindingIndex];
    }

    if (type === 'queries') {
      lastBindingIndex = (Connector.queries.length - 1);
      lastQuery = Connector.queries[lastBindingIndex];
    }

    return {
      index: lastBindingIndex,
      query: lastQuery,
    };
  }

  /**
   * Compile query and push to last schema binding index
   *
   * @static
   * @param {string} extraQuery
   * @memberof Table
   */
  static pushToLastBinding(extraQuery, type = 'commandAdd') {
    const last = Table.getQueryLastBinding(type);

    if (type !== 'queries') {
      Connector.schemaBindings[type][last.index] = `${last.query} ${extraQuery}`;
    }

    if (type === 'queries') {
      Connector.queries[last.index] = `${last.query} ${extraQuery}`;
    }
  }
}

module.exports = new Table();
