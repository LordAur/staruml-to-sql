class Connector {
  constructor() {
    /**
     * The configuration name schema
     * @var {string}
     */
    this.schemaConnection = null;

    /**
     * The current schema table
     * @var {string}
     */
    this.schemaTable = null;

    /**
     * The current schema value bindings
     *
     * @var {object}
     */
    this.schemaBindings = {
      statement: [],
      commandAdd: [],
      commandModify: [],
      renameColumn: [],
      config: [],
    };
  }
}

module.exports = new Connector();
