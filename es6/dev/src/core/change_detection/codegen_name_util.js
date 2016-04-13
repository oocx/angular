import { StringWrapper } from 'angular2/src/facade/lang';
import { ListWrapper, Map } from 'angular2/src/facade/collection';
// The names of these fields must be kept in sync with abstract_change_detector.ts or change
// detection will fail.
const _STATE_ACCESSOR = "state";
const _CONTEXT_ACCESSOR = "context";
const _PROP_BINDING_INDEX = "propertyBindingIndex";
const _DIRECTIVES_ACCESSOR = "directiveIndices";
const _DISPATCHER_ACCESSOR = "dispatcher";
const _LOCALS_ACCESSOR = "locals";
const _MODE_ACCESSOR = "mode";
const _PIPES_ACCESSOR = "pipes";
const _PROTOS_ACCESSOR = "protos";
export const CONTEXT_ACCESSOR = "context";
// `context` is always first.
export const CONTEXT_INDEX = 0;
const _FIELD_PREFIX = 'this.';
var _whiteSpaceRegExp = /\W/g;
/**
 * Returns `s` with all non-identifier characters removed.
 */
export function sanitizeName(s) {
    return StringWrapper.replaceAll(s, _whiteSpaceRegExp, '');
}
/**
 * Class responsible for providing field and local variable names for change detector classes.
 * Also provides some convenience functions, for example, declaring variables, destroying pipes,
 * and dehydrating the detector.
 */
export class CodegenNameUtil {
    constructor(_records, _eventBindings, _directiveRecords, _utilName) {
        this._records = _records;
        this._eventBindings = _eventBindings;
        this._directiveRecords = _directiveRecords;
        this._utilName = _utilName;
        /** @internal */
        this._sanitizedEventNames = new Map();
        this._sanitizedNames = ListWrapper.createFixedSize(this._records.length + 1);
        this._sanitizedNames[CONTEXT_INDEX] = CONTEXT_ACCESSOR;
        for (var i = 0, iLen = this._records.length; i < iLen; ++i) {
            this._sanitizedNames[i + 1] = sanitizeName(`${this._records[i].name}${i}`);
        }
        for (var ebIndex = 0; ebIndex < _eventBindings.length; ++ebIndex) {
            var eb = _eventBindings[ebIndex];
            var names = [CONTEXT_ACCESSOR];
            for (var i = 0, iLen = eb.records.length; i < iLen; ++i) {
                names.push(sanitizeName(`${eb.records[i].name}${i}_${ebIndex}`));
            }
            this._sanitizedEventNames.set(eb, names);
        }
    }
    /** @internal */
    _addFieldPrefix(name) { return `${_FIELD_PREFIX}${name}`; }
    getDispatcherName() { return this._addFieldPrefix(_DISPATCHER_ACCESSOR); }
    getPipesAccessorName() { return this._addFieldPrefix(_PIPES_ACCESSOR); }
    getProtosName() { return this._addFieldPrefix(_PROTOS_ACCESSOR); }
    getDirectivesAccessorName() { return this._addFieldPrefix(_DIRECTIVES_ACCESSOR); }
    getLocalsAccessorName() { return this._addFieldPrefix(_LOCALS_ACCESSOR); }
    getStateName() { return this._addFieldPrefix(_STATE_ACCESSOR); }
    getModeName() { return this._addFieldPrefix(_MODE_ACCESSOR); }
    getPropertyBindingIndex() { return this._addFieldPrefix(_PROP_BINDING_INDEX); }
    getLocalName(idx) { return `l_${this._sanitizedNames[idx]}`; }
    getEventLocalName(eb, idx) {
        return `l_${this._sanitizedEventNames.get(eb)[idx]}`;
    }
    getChangeName(idx) { return `c_${this._sanitizedNames[idx]}`; }
    /**
     * Generate a statement initializing local variables used when detecting changes.
     */
    genInitLocals() {
        var declarations = [];
        var assignments = [];
        for (var i = 0, iLen = this.getFieldCount(); i < iLen; ++i) {
            if (i == CONTEXT_INDEX) {
                declarations.push(`${this.getLocalName(i)} = ${this.getFieldName(i)}`);
            }
            else {
                var rec = this._records[i - 1];
                if (rec.argumentToPureFunction) {
                    var changeName = this.getChangeName(i);
                    declarations.push(`${this.getLocalName(i)},${changeName}`);
                    assignments.push(changeName);
                }
                else {
                    declarations.push(`${this.getLocalName(i)}`);
                }
            }
        }
        var assignmentsCode = ListWrapper.isEmpty(assignments) ? '' : `${assignments.join('=')} = false;`;
        return `var ${declarations.join(',')};${assignmentsCode}`;
    }
    /**
     * Generate a statement initializing local variables for event handlers.
     */
    genInitEventLocals() {
        var res = [`${this.getLocalName(CONTEXT_INDEX)} = ${this.getFieldName(CONTEXT_INDEX)}`];
        this._sanitizedEventNames.forEach((names, eb) => {
            for (var i = 0; i < names.length; ++i) {
                if (i !== CONTEXT_INDEX) {
                    res.push(`${this.getEventLocalName(eb, i)}`);
                }
            }
        });
        return res.length > 1 ? `var ${res.join(',')};` : '';
    }
    getPreventDefaultAccesor() { return "preventDefault"; }
    getFieldCount() { return this._sanitizedNames.length; }
    getFieldName(idx) { return this._addFieldPrefix(this._sanitizedNames[idx]); }
    getAllFieldNames() {
        var fieldList = [];
        for (var k = 0, kLen = this.getFieldCount(); k < kLen; ++k) {
            if (k === 0 || this._records[k - 1].shouldBeChecked()) {
                fieldList.push(this.getFieldName(k));
            }
        }
        for (var i = 0, iLen = this._records.length; i < iLen; ++i) {
            var rec = this._records[i];
            if (rec.isPipeRecord()) {
                fieldList.push(this.getPipeName(rec.selfIndex));
            }
        }
        for (var j = 0, jLen = this._directiveRecords.length; j < jLen; ++j) {
            var dRec = this._directiveRecords[j];
            fieldList.push(this.getDirectiveName(dRec.directiveIndex));
            if (!dRec.isDefaultChangeDetection()) {
                fieldList.push(this.getDetectorName(dRec.directiveIndex));
            }
        }
        return fieldList;
    }
    /**
     * Generates statements which clear all fields so that the change detector is dehydrated.
     */
    genDehydrateFields() {
        var fields = this.getAllFieldNames();
        ListWrapper.removeAt(fields, CONTEXT_INDEX);
        if (ListWrapper.isEmpty(fields))
            return '';
        // At least one assignment.
        fields.push(`${this._utilName}.uninitialized;`);
        return fields.join(' = ');
    }
    /**
     * Generates statements destroying all pipe variables.
     */
    genPipeOnDestroy() {
        return this._records.filter(r => r.isPipeRecord())
            .map(r => `${this._utilName}.callPipeOnDestroy(${this.getPipeName(r.selfIndex)});`)
            .join('\n');
    }
    getPipeName(idx) {
        return this._addFieldPrefix(`${this._sanitizedNames[idx]}_pipe`);
    }
    getDirectiveName(d) {
        return this._addFieldPrefix(`directive_${d.name}`);
    }
    getDetectorName(d) { return this._addFieldPrefix(`detector_${d.name}`); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZWdlbl9uYW1lX3V0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTRGT1lUUnFDLnRtcC9hbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NvZGVnZW5fbmFtZV91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQWdCLGFBQWEsRUFBQyxNQUFNLDBCQUEwQjtPQUM5RCxFQUFDLFdBQVcsRUFBYyxHQUFHLEVBQUMsTUFBTSxnQ0FBZ0M7QUFPM0UsNEZBQTRGO0FBQzVGLHVCQUF1QjtBQUN2QixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUM7QUFDaEMsTUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUM7QUFDcEMsTUFBTSxtQkFBbUIsR0FBRyxzQkFBc0IsQ0FBQztBQUNuRCxNQUFNLG9CQUFvQixHQUFHLGtCQUFrQixDQUFDO0FBQ2hELE1BQU0sb0JBQW9CLEdBQUcsWUFBWSxDQUFDO0FBQzFDLE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO0FBQ2xDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQztBQUM5QixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUM7QUFDaEMsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7QUFDbEMsT0FBTyxNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztBQUUxQyw2QkFBNkI7QUFDN0IsT0FBTyxNQUFNLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFDL0IsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDO0FBRTlCLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0FBRTlCOztHQUVHO0FBQ0gsNkJBQTZCLENBQVM7SUFDcEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFFRDs7OztHQUlHO0FBQ0g7SUFVRSxZQUFvQixRQUF1QixFQUFVLGNBQThCLEVBQy9ELGlCQUF3QixFQUFVLFNBQWlCO1FBRG5ELGFBQVEsR0FBUixRQUFRLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDL0Qsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFPO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUp2RSxnQkFBZ0I7UUFDaEIseUJBQW9CLEdBQUcsSUFBSSxHQUFHLEVBQTBCLENBQUM7UUFJdkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7UUFDdkQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBRUQsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUM7WUFDakUsSUFBSSxFQUFFLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLElBQUksS0FBSyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMvQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDeEQsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25FLENBQUM7WUFDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixlQUFlLENBQUMsSUFBWSxJQUFZLE1BQU0sQ0FBQyxHQUFHLGFBQWEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFM0UsaUJBQWlCLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEYsb0JBQW9CLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWhGLGFBQWEsS0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUxRSx5QkFBeUIsS0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUxRixxQkFBcUIsS0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRixZQUFZLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhFLFdBQVcsS0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdEUsdUJBQXVCLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdkYsWUFBWSxDQUFDLEdBQVcsSUFBWSxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTlFLGlCQUFpQixDQUFDLEVBQWdCLEVBQUUsR0FBVztRQUM3QyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUFXLElBQVksTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvRTs7T0FFRztJQUNILGFBQWE7UUFDWCxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUMzRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDekUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUMzRCxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMvQixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDL0MsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxlQUFlLEdBQ2YsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDaEYsTUFBTSxDQUFDLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxlQUFlLEVBQUUsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxrQkFBa0I7UUFDaEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRUQsd0JBQXdCLEtBQWEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUUvRCxhQUFhLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUUvRCxZQUFZLENBQUMsR0FBVyxJQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFN0YsZ0JBQWdCO1FBQ2QsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUMzRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQztRQUNILENBQUM7UUFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUMzRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsRCxDQUFDO1FBQ0gsQ0FBQztRQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDcEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7T0FFRztJQUNILGtCQUFrQjtRQUNoQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNyQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM1QyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUUzQywyQkFBMkI7UUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLGlCQUFpQixDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0JBQWdCO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDN0MsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLHNCQUFzQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQ2xGLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQVc7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsQ0FBaUI7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsZUFBZSxDQUFDLENBQWlCLElBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkcsQ0FBQztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWdFeHBXcmFwcGVyLCBTdHJpbmdXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgTWFwV3JhcHBlciwgTWFwfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5pbXBvcnQge0RpcmVjdGl2ZUluZGV4fSBmcm9tICcuL2RpcmVjdGl2ZV9yZWNvcmQnO1xuXG5pbXBvcnQge1Byb3RvUmVjb3JkfSBmcm9tICcuL3Byb3RvX3JlY29yZCc7XG5pbXBvcnQge0V2ZW50QmluZGluZ30gZnJvbSAnLi9ldmVudF9iaW5kaW5nJztcblxuLy8gVGhlIG5hbWVzIG9mIHRoZXNlIGZpZWxkcyBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIGFic3RyYWN0X2NoYW5nZV9kZXRlY3Rvci50cyBvciBjaGFuZ2Vcbi8vIGRldGVjdGlvbiB3aWxsIGZhaWwuXG5jb25zdCBfU1RBVEVfQUNDRVNTT1IgPSBcInN0YXRlXCI7XG5jb25zdCBfQ09OVEVYVF9BQ0NFU1NPUiA9IFwiY29udGV4dFwiO1xuY29uc3QgX1BST1BfQklORElOR19JTkRFWCA9IFwicHJvcGVydHlCaW5kaW5nSW5kZXhcIjtcbmNvbnN0IF9ESVJFQ1RJVkVTX0FDQ0VTU09SID0gXCJkaXJlY3RpdmVJbmRpY2VzXCI7XG5jb25zdCBfRElTUEFUQ0hFUl9BQ0NFU1NPUiA9IFwiZGlzcGF0Y2hlclwiO1xuY29uc3QgX0xPQ0FMU19BQ0NFU1NPUiA9IFwibG9jYWxzXCI7XG5jb25zdCBfTU9ERV9BQ0NFU1NPUiA9IFwibW9kZVwiO1xuY29uc3QgX1BJUEVTX0FDQ0VTU09SID0gXCJwaXBlc1wiO1xuY29uc3QgX1BST1RPU19BQ0NFU1NPUiA9IFwicHJvdG9zXCI7XG5leHBvcnQgY29uc3QgQ09OVEVYVF9BQ0NFU1NPUiA9IFwiY29udGV4dFwiO1xuXG4vLyBgY29udGV4dGAgaXMgYWx3YXlzIGZpcnN0LlxuZXhwb3J0IGNvbnN0IENPTlRFWFRfSU5ERVggPSAwO1xuY29uc3QgX0ZJRUxEX1BSRUZJWCA9ICd0aGlzLic7XG5cbnZhciBfd2hpdGVTcGFjZVJlZ0V4cCA9IC9cXFcvZztcblxuLyoqXG4gKiBSZXR1cm5zIGBzYCB3aXRoIGFsbCBub24taWRlbnRpZmllciBjaGFyYWN0ZXJzIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZU5hbWUoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChzLCBfd2hpdGVTcGFjZVJlZ0V4cCwgJycpO1xufVxuXG4vKipcbiAqIENsYXNzIHJlc3BvbnNpYmxlIGZvciBwcm92aWRpbmcgZmllbGQgYW5kIGxvY2FsIHZhcmlhYmxlIG5hbWVzIGZvciBjaGFuZ2UgZGV0ZWN0b3IgY2xhc3Nlcy5cbiAqIEFsc28gcHJvdmlkZXMgc29tZSBjb252ZW5pZW5jZSBmdW5jdGlvbnMsIGZvciBleGFtcGxlLCBkZWNsYXJpbmcgdmFyaWFibGVzLCBkZXN0cm95aW5nIHBpcGVzLFxuICogYW5kIGRlaHlkcmF0aW5nIHRoZSBkZXRlY3Rvci5cbiAqL1xuZXhwb3J0IGNsYXNzIENvZGVnZW5OYW1lVXRpbCB7XG4gIC8qKlxuICAgKiBSZWNvcmQgbmFtZXMgc2FuaXRpemVkIGZvciB1c2UgYXMgZmllbGRzLlxuICAgKiBTZWUgW3Nhbml0aXplTmFtZV0gZm9yIGRldGFpbHMuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX3Nhbml0aXplZE5hbWVzOiBzdHJpbmdbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2FuaXRpemVkRXZlbnROYW1lcyA9IG5ldyBNYXA8RXZlbnRCaW5kaW5nLCBzdHJpbmdbXT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZWNvcmRzOiBQcm90b1JlY29yZFtdLCBwcml2YXRlIF9ldmVudEJpbmRpbmdzOiBFdmVudEJpbmRpbmdbXSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZGlyZWN0aXZlUmVjb3JkczogYW55W10sIHByaXZhdGUgX3V0aWxOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zYW5pdGl6ZWROYW1lcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZSh0aGlzLl9yZWNvcmRzLmxlbmd0aCArIDEpO1xuICAgIHRoaXMuX3Nhbml0aXplZE5hbWVzW0NPTlRFWFRfSU5ERVhdID0gQ09OVEVYVF9BQ0NFU1NPUjtcbiAgICBmb3IgKHZhciBpID0gMCwgaUxlbiA9IHRoaXMuX3JlY29yZHMubGVuZ3RoOyBpIDwgaUxlbjsgKytpKSB7XG4gICAgICB0aGlzLl9zYW5pdGl6ZWROYW1lc1tpICsgMV0gPSBzYW5pdGl6ZU5hbWUoYCR7dGhpcy5fcmVjb3Jkc1tpXS5uYW1lfSR7aX1gKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBlYkluZGV4ID0gMDsgZWJJbmRleCA8IF9ldmVudEJpbmRpbmdzLmxlbmd0aDsgKytlYkluZGV4KSB7XG4gICAgICB2YXIgZWIgPSBfZXZlbnRCaW5kaW5nc1tlYkluZGV4XTtcbiAgICAgIHZhciBuYW1lcyA9IFtDT05URVhUX0FDQ0VTU09SXTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpTGVuID0gZWIucmVjb3Jkcy5sZW5ndGg7IGkgPCBpTGVuOyArK2kpIHtcbiAgICAgICAgbmFtZXMucHVzaChzYW5pdGl6ZU5hbWUoYCR7ZWIucmVjb3Jkc1tpXS5uYW1lfSR7aX1fJHtlYkluZGV4fWApKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3Nhbml0aXplZEV2ZW50TmFtZXMuc2V0KGViLCBuYW1lcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYWRkRmllbGRQcmVmaXgobmFtZTogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIGAke19GSUVMRF9QUkVGSVh9JHtuYW1lfWA7IH1cblxuICBnZXREaXNwYXRjaGVyTmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fYWRkRmllbGRQcmVmaXgoX0RJU1BBVENIRVJfQUNDRVNTT1IpOyB9XG5cbiAgZ2V0UGlwZXNBY2Nlc3Nvck5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2FkZEZpZWxkUHJlZml4KF9QSVBFU19BQ0NFU1NPUik7IH1cblxuICBnZXRQcm90b3NOYW1lKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9hZGRGaWVsZFByZWZpeChfUFJPVE9TX0FDQ0VTU09SKTsgfVxuXG4gIGdldERpcmVjdGl2ZXNBY2Nlc3Nvck5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2FkZEZpZWxkUHJlZml4KF9ESVJFQ1RJVkVTX0FDQ0VTU09SKTsgfVxuXG4gIGdldExvY2Fsc0FjY2Vzc29yTmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fYWRkRmllbGRQcmVmaXgoX0xPQ0FMU19BQ0NFU1NPUik7IH1cblxuICBnZXRTdGF0ZU5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2FkZEZpZWxkUHJlZml4KF9TVEFURV9BQ0NFU1NPUik7IH1cblxuICBnZXRNb2RlTmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fYWRkRmllbGRQcmVmaXgoX01PREVfQUNDRVNTT1IpOyB9XG5cbiAgZ2V0UHJvcGVydHlCaW5kaW5nSW5kZXgoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2FkZEZpZWxkUHJlZml4KF9QUk9QX0JJTkRJTkdfSU5ERVgpOyB9XG5cbiAgZ2V0TG9jYWxOYW1lKGlkeDogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGBsXyR7dGhpcy5fc2FuaXRpemVkTmFtZXNbaWR4XX1gOyB9XG5cbiAgZ2V0RXZlbnRMb2NhbE5hbWUoZWI6IEV2ZW50QmluZGluZywgaWR4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgbF8ke3RoaXMuX3Nhbml0aXplZEV2ZW50TmFtZXMuZ2V0KGViKVtpZHhdfWA7XG4gIH1cblxuICBnZXRDaGFuZ2VOYW1lKGlkeDogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGBjXyR7dGhpcy5fc2FuaXRpemVkTmFtZXNbaWR4XX1gOyB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgc3RhdGVtZW50IGluaXRpYWxpemluZyBsb2NhbCB2YXJpYWJsZXMgdXNlZCB3aGVuIGRldGVjdGluZyBjaGFuZ2VzLlxuICAgKi9cbiAgZ2VuSW5pdExvY2FscygpOiBzdHJpbmcge1xuICAgIHZhciBkZWNsYXJhdGlvbnMgPSBbXTtcbiAgICB2YXIgYXNzaWdubWVudHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgaUxlbiA9IHRoaXMuZ2V0RmllbGRDb3VudCgpOyBpIDwgaUxlbjsgKytpKSB7XG4gICAgICBpZiAoaSA9PSBDT05URVhUX0lOREVYKSB7XG4gICAgICAgIGRlY2xhcmF0aW9ucy5wdXNoKGAke3RoaXMuZ2V0TG9jYWxOYW1lKGkpfSA9ICR7dGhpcy5nZXRGaWVsZE5hbWUoaSl9YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVjID0gdGhpcy5fcmVjb3Jkc1tpIC0gMV07XG4gICAgICAgIGlmIChyZWMuYXJndW1lbnRUb1B1cmVGdW5jdGlvbikge1xuICAgICAgICAgIHZhciBjaGFuZ2VOYW1lID0gdGhpcy5nZXRDaGFuZ2VOYW1lKGkpO1xuICAgICAgICAgIGRlY2xhcmF0aW9ucy5wdXNoKGAke3RoaXMuZ2V0TG9jYWxOYW1lKGkpfSwke2NoYW5nZU5hbWV9YCk7XG4gICAgICAgICAgYXNzaWdubWVudHMucHVzaChjaGFuZ2VOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWNsYXJhdGlvbnMucHVzaChgJHt0aGlzLmdldExvY2FsTmFtZShpKX1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB2YXIgYXNzaWdubWVudHNDb2RlID1cbiAgICAgICAgTGlzdFdyYXBwZXIuaXNFbXB0eShhc3NpZ25tZW50cykgPyAnJyA6IGAke2Fzc2lnbm1lbnRzLmpvaW4oJz0nKX0gPSBmYWxzZTtgO1xuICAgIHJldHVybiBgdmFyICR7ZGVjbGFyYXRpb25zLmpvaW4oJywnKX07JHthc3NpZ25tZW50c0NvZGV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHN0YXRlbWVudCBpbml0aWFsaXppbmcgbG9jYWwgdmFyaWFibGVzIGZvciBldmVudCBoYW5kbGVycy5cbiAgICovXG4gIGdlbkluaXRFdmVudExvY2FscygpOiBzdHJpbmcge1xuICAgIHZhciByZXMgPSBbYCR7dGhpcy5nZXRMb2NhbE5hbWUoQ09OVEVYVF9JTkRFWCl9ID0gJHt0aGlzLmdldEZpZWxkTmFtZShDT05URVhUX0lOREVYKX1gXTtcbiAgICB0aGlzLl9zYW5pdGl6ZWRFdmVudE5hbWVzLmZvckVhY2goKG5hbWVzLCBlYikgPT4ge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoaSAhPT0gQ09OVEVYVF9JTkRFWCkge1xuICAgICAgICAgIHJlcy5wdXNoKGAke3RoaXMuZ2V0RXZlbnRMb2NhbE5hbWUoZWIsIGkpfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcy5sZW5ndGggPiAxID8gYHZhciAke3Jlcy5qb2luKCcsJyl9O2AgOiAnJztcbiAgfVxuXG4gIGdldFByZXZlbnREZWZhdWx0QWNjZXNvcigpOiBzdHJpbmcgeyByZXR1cm4gXCJwcmV2ZW50RGVmYXVsdFwiOyB9XG5cbiAgZ2V0RmllbGRDb3VudCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc2FuaXRpemVkTmFtZXMubGVuZ3RoOyB9XG5cbiAgZ2V0RmllbGROYW1lKGlkeDogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2FkZEZpZWxkUHJlZml4KHRoaXMuX3Nhbml0aXplZE5hbWVzW2lkeF0pOyB9XG5cbiAgZ2V0QWxsRmllbGROYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgdmFyIGZpZWxkTGlzdCA9IFtdO1xuICAgIGZvciAodmFyIGsgPSAwLCBrTGVuID0gdGhpcy5nZXRGaWVsZENvdW50KCk7IGsgPCBrTGVuOyArK2spIHtcbiAgICAgIGlmIChrID09PSAwIHx8IHRoaXMuX3JlY29yZHNbayAtIDFdLnNob3VsZEJlQ2hlY2tlZCgpKSB7XG4gICAgICAgIGZpZWxkTGlzdC5wdXNoKHRoaXMuZ2V0RmllbGROYW1lKGspKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMCwgaUxlbiA9IHRoaXMuX3JlY29yZHMubGVuZ3RoOyBpIDwgaUxlbjsgKytpKSB7XG4gICAgICB2YXIgcmVjID0gdGhpcy5fcmVjb3Jkc1tpXTtcbiAgICAgIGlmIChyZWMuaXNQaXBlUmVjb3JkKCkpIHtcbiAgICAgICAgZmllbGRMaXN0LnB1c2godGhpcy5nZXRQaXBlTmFtZShyZWMuc2VsZkluZGV4KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IDAsIGpMZW4gPSB0aGlzLl9kaXJlY3RpdmVSZWNvcmRzLmxlbmd0aDsgaiA8IGpMZW47ICsraikge1xuICAgICAgdmFyIGRSZWMgPSB0aGlzLl9kaXJlY3RpdmVSZWNvcmRzW2pdO1xuICAgICAgZmllbGRMaXN0LnB1c2godGhpcy5nZXREaXJlY3RpdmVOYW1lKGRSZWMuZGlyZWN0aXZlSW5kZXgpKTtcbiAgICAgIGlmICghZFJlYy5pc0RlZmF1bHRDaGFuZ2VEZXRlY3Rpb24oKSkge1xuICAgICAgICBmaWVsZExpc3QucHVzaCh0aGlzLmdldERldGVjdG9yTmFtZShkUmVjLmRpcmVjdGl2ZUluZGV4KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaWVsZExpc3Q7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIHN0YXRlbWVudHMgd2hpY2ggY2xlYXIgYWxsIGZpZWxkcyBzbyB0aGF0IHRoZSBjaGFuZ2UgZGV0ZWN0b3IgaXMgZGVoeWRyYXRlZC5cbiAgICovXG4gIGdlbkRlaHlkcmF0ZUZpZWxkcygpOiBzdHJpbmcge1xuICAgIHZhciBmaWVsZHMgPSB0aGlzLmdldEFsbEZpZWxkTmFtZXMoKTtcbiAgICBMaXN0V3JhcHBlci5yZW1vdmVBdChmaWVsZHMsIENPTlRFWFRfSU5ERVgpO1xuICAgIGlmIChMaXN0V3JhcHBlci5pc0VtcHR5KGZpZWxkcykpIHJldHVybiAnJztcblxuICAgIC8vIEF0IGxlYXN0IG9uZSBhc3NpZ25tZW50LlxuICAgIGZpZWxkcy5wdXNoKGAke3RoaXMuX3V0aWxOYW1lfS51bmluaXRpYWxpemVkO2ApO1xuICAgIHJldHVybiBmaWVsZHMuam9pbignID0gJyk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIHN0YXRlbWVudHMgZGVzdHJveWluZyBhbGwgcGlwZSB2YXJpYWJsZXMuXG4gICAqL1xuICBnZW5QaXBlT25EZXN0cm95KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZHMuZmlsdGVyKHIgPT4gci5pc1BpcGVSZWNvcmQoKSlcbiAgICAgICAgLm1hcChyID0+IGAke3RoaXMuX3V0aWxOYW1lfS5jYWxsUGlwZU9uRGVzdHJveSgke3RoaXMuZ2V0UGlwZU5hbWUoci5zZWxmSW5kZXgpfSk7YClcbiAgICAgICAgLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0UGlwZU5hbWUoaWR4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9hZGRGaWVsZFByZWZpeChgJHt0aGlzLl9zYW5pdGl6ZWROYW1lc1tpZHhdfV9waXBlYCk7XG4gIH1cblxuICBnZXREaXJlY3RpdmVOYW1lKGQ6IERpcmVjdGl2ZUluZGV4KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYWRkRmllbGRQcmVmaXgoYGRpcmVjdGl2ZV8ke2QubmFtZX1gKTtcbiAgfVxuXG4gIGdldERldGVjdG9yTmFtZShkOiBEaXJlY3RpdmVJbmRleCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9hZGRGaWVsZFByZWZpeChgZGV0ZWN0b3JfJHtkLm5hbWV9YCk7IH1cbn1cbiJdfQ==