import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    tableName(className: string, customName: string): string {
        const name = customName ? customName : snakeCase(className);
        return name.replace('_entity', '');
    }

    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
        return snakeCase(embeddedPrefixes.join('_')) + (customName ? customName : snakeCase(propertyName));
    }

    relationName(propertyName: string): string {
        return snakeCase(propertyName);
    }

    joinColumnName(relationName: string, referencedColumnName: string): string {
        return snakeCase(relationName + '_' + referencedColumnName);
    }

    joinTableName(firstTableName: string,
        secondTableName: string,
        firstPropertyName: string,
        secondPropertyName: string,
    ): string {
        return snakeCase(firstTableName + '_' + firstPropertyName.replace(/\./gi, '_') + '_' + secondTableName);
    }

    joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
        return snakeCase(tableName + '_' + (columnName ? columnName : propertyName));
    }

    classTableInheritanceParentColumnName(parentTableName: any, parentTableIdPropertyName: any): string {
        return snakeCase(parentTableName + '_' + parentTableIdPropertyName);
    }
}
