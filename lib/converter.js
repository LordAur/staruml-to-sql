const _ = require('lodash');
const fs = require('fs');
const schema = require('./schema');

class Converter {
  getReferences(entity, refID, callback) {
    _.forEach(entity, (ent) => {
      _.forEach(ent.columns, (col) => {
        if (col._id === refID) callback({ tableName: ent.name, column: col.name });
      });
    });
  }

  makeSqlText(entity, allEntity) {
    const query = schema
      .createTable(entity.name, (table) => {
        _.forEach(entity.columns, (col) => {
          if (col.primaryKey === true) table.increment(col.name);
          else if (col.type !== undefined) {
            table[col.type.toLowerCase()](col.name, col.length);

            if (col.unique === true) table.unique();
            if (col.nullable === true) table.nullable();
            if (col.foreignKey === true && col.referenceTo !== undefined) {
              if (col.type.includes('INT')) table.unsigned();
              table.foreign(col.name);
              this.getReferences(allEntity, col.referenceTo.$ref, (ref) => {
                table.references(ref.column).on(ref.tableName);
              });
            }
          }
        });
      });

    return query;
  }

  processERDEntity(el, callback) {
    const dataModel = _.filter(el, (o) => _.get(o, '_type') === 'ERDDataModel');

    const query = [];
    _.forEach(dataModel, (el, index) => {
      const entity = _.filter(el.ownedElements, (o) => _.get(o, '_type') === 'ERDEntity');

      _.forEach(entity, (ent, entIndex) => {
        query.push(this.makeSqlText(ent, entity));
        if (dataModel.length === (index + 1) && entity.length === (entIndex + 1)) callback(query);
      });
    });
  }

  writeSqlFile(query, destination, callback) {
    const queryString = query.join('\n');
    const fileName = `${Date.now()}.sql`;

    fs.writeFile(`${destination}/${fileName}`, queryString, (error) => {
      if (error) throw error;
      callback(`${destination}/${fileName}`);
    });
  }

  convert(mdjPath = null, destination = null) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(mdjPath)) reject(new Error('Mdj file not found'));
      else if (destination === null) reject(new Error('Destination path cannot be empty'));
      else {
        const mdjBuffer = fs.readFileSync(mdjPath);
        const mdjJson = JSON.parse(mdjBuffer.toString());

        this.processERDEntity(mdjJson.ownedElements, (query) => {
          this.writeSqlFile(query, destination, (destinationPath) => {
            resolve(destinationPath);
          });
        });
      }
    });
  }
}

module.exports = new Converter();
