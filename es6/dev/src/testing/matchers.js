import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { global, isString } from 'angular2/src/facade/lang';
import { StringMapWrapper } from 'angular2/src/facade/collection';
var _global = (typeof window === 'undefined' ? global : window);
/**
 * Jasmine matching function with Angular matchers mixed in.
 *
 * ## Example
 *
 * {@example testing/ts/matchers.ts region='toHaveText'}
 */
export var expect = _global.expect;
// Some Map polyfills don't polyfill Map.toString correctly, which
// gives us bad error messages in tests.
// The only way to do this in Jasmine is to monkey patch a method
// to the object :-(
Map.prototype['jasmineToString'] = function () {
    var m = this;
    if (!m) {
        return '' + m;
    }
    var res = [];
    m.forEach((v, k) => { res.push(`${k}:${v}`); });
    return `{ ${res.join(',')} }`;
};
_global.beforeEach(function () {
    jasmine.addMatchers({
        // Custom handler for Map as Jasmine does not support it yet
        toEqual: function (util, customEqualityTesters) {
            return {
                compare: function (actual, expected) {
                    return { pass: util.equals(actual, expected, [compareMap]) };
                }
            };
            function compareMap(actual, expected) {
                if (actual instanceof Map) {
                    var pass = actual.size === expected.size;
                    if (pass) {
                        actual.forEach((v, k) => { pass = pass && util.equals(v, expected.get(k)); });
                    }
                    return pass;
                }
                else {
                    return undefined;
                }
            }
        },
        toBePromise: function () {
            return {
                compare: function (actual, expectedClass) {
                    var pass = typeof actual === 'object' && typeof actual.then === 'function';
                    return { pass: pass, get message() { return 'Expected ' + actual + ' to be a promise'; } };
                }
            };
        },
        toBeAnInstanceOf: function () {
            return {
                compare: function (actual, expectedClass) {
                    var pass = typeof actual === 'object' && actual instanceof expectedClass;
                    return {
                        pass: pass,
                        get message() {
                            return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                        }
                    };
                }
            };
        },
        toHaveText: function () {
            return {
                compare: function (actual, expectedText) {
                    var actualText = elementText(actual);
                    return {
                        pass: actualText == expectedText,
                        get message() { return 'Expected ' + actualText + ' to be equal to ' + expectedText; }
                    };
                }
            };
        },
        toHaveCssClass: function () {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            function buildError(isNot) {
                return function (actual, className) {
                    return {
                        pass: DOM.hasClass(actual, className) == !isNot,
                        get message() {
                            return `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to contain the CSS class "${className}"`;
                        }
                    };
                };
            }
        },
        toHaveCssStyle: function () {
            return {
                compare: function (actual, styles) {
                    var allPassed;
                    if (isString(styles)) {
                        allPassed = DOM.hasStyle(actual, styles);
                    }
                    else {
                        allPassed = !StringMapWrapper.isEmpty(styles);
                        StringMapWrapper.forEach(styles, (style, prop) => {
                            allPassed = allPassed && DOM.hasStyle(actual, prop, style);
                        });
                    }
                    return {
                        pass: allPassed,
                        get message() {
                            var expectedValueStr = isString(styles) ? styles : JSON.stringify(styles);
                            return `Expected ${actual.outerHTML} ${!allPassed ? ' ' : 'not '}to contain the
                      CSS ${isString(styles) ? 'property' : 'styles'} "${expectedValueStr}"`;
                        }
                    };
                }
            };
        },
        toContainError: function () {
            return {
                compare: function (actual, expectedText) {
                    var errorMessage = actual.toString();
                    return {
                        pass: errorMessage.indexOf(expectedText) > -1,
                        get message() { return 'Expected ' + errorMessage + ' to contain ' + expectedText; }
                    };
                }
            };
        },
        toThrowErrorWith: function () {
            return {
                compare: function (actual, expectedText) {
                    try {
                        actual();
                        return {
                            pass: false,
                            get message() { return "Was expected to throw, but did not throw"; }
                        };
                    }
                    catch (e) {
                        var errorMessage = e.toString();
                        return {
                            pass: errorMessage.indexOf(expectedText) > -1,
                            get message() { return 'Expected ' + errorMessage + ' to contain ' + expectedText; }
                        };
                    }
                }
            };
        },
        toMatchPattern() {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            function buildError(isNot) {
                return function (actual, regex) {
                    return {
                        pass: regex.test(actual) == !isNot,
                        get message() {
                            return `Expected ${actual} ${isNot ? 'not ' : ''}to match ${regex.toString()}`;
                        }
                    };
                };
            }
        },
        toImplement: function () {
            return {
                compare: function (actualObject, expectedInterface) {
                    var objProps = Object.keys(actualObject.constructor.prototype);
                    var intProps = Object.keys(expectedInterface.prototype);
                    var missedMethods = [];
                    intProps.forEach((k) => {
                        if (!actualObject.constructor.prototype[k])
                            missedMethods.push(k);
                    });
                    return {
                        pass: missedMethods.length == 0,
                        get message() {
                            return 'Expected ' + actualObject + ' to have the following methods: ' +
                                missedMethods.join(", ");
                        }
                    };
                }
            };
        }
    });
});
function elementText(n) {
    var hasNodes = (n) => {
        var children = DOM.childNodes(n);
        return children && children.length > 0;
    };
    if (n instanceof Array) {
        return n.map(elementText).join("");
    }
    if (DOM.isCommentNode(n)) {
        return '';
    }
    if (DOM.isElementNode(n) && DOM.tagName(n) == 'CONTENT') {
        return elementText(Array.prototype.slice.apply(DOM.getDistributedNodes(n)));
    }
    if (DOM.hasShadowRoot(n)) {
        return elementText(DOM.childNodesAsList(DOM.getShadowRoot(n)));
    }
    if (hasNodes(n)) {
        return elementText(DOM.childNodesAsList(n));
    }
    return DOM.getText(n);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUplVDh1em84LnRtcC9hbmd1bGFyMi9zcmMvdGVzdGluZy9tYXRjaGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLHVDQUF1QztPQUNsRCxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUMsTUFBTSwwQkFBMEI7T0FDbEQsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGdDQUFnQztBQTZGL0QsSUFBSSxPQUFPLEdBQVEsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBRXJFOzs7Ozs7R0FNRztBQUNILE9BQU8sSUFBSSxNQUFNLEdBQXFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFHckUsa0VBQWtFO0FBQ2xFLHdDQUF3QztBQUN4QyxpRUFBaUU7QUFDakUsb0JBQW9CO0FBQ3BCLEdBQUcsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsR0FBRztJQUNqQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDYixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBQ0QsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ2hDLENBQUMsQ0FBQztBQUVGLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDakIsT0FB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QUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7Z2xvYmFsLCBpc1N0cmluZ30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuLyoqXG4gKiBKYXNtaW5lIG1hdGNoZXJzIHRoYXQgY2hlY2sgQW5ndWxhciBzcGVjaWZpYyBjb25kaXRpb25zLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nTWF0Y2hlcnMgZXh0ZW5kcyBqYXNtaW5lLk1hdGNoZXJzIHtcbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgdmFsdWUgdG8gYmUgYSBgUHJvbWlzZWAuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0JlUHJvbWlzZSd9XG4gICAqL1xuICB0b0JlUHJvbWlzZSgpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIHZhbHVlIHRvIGJlIGFuIGluc3RhbmNlIG9mIGEgY2xhc3MuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0JlQW5JbnN0YW5jZU9mJ31cbiAgICovXG4gIHRvQmVBbkluc3RhbmNlT2YoZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIGV4YWN0bHkgdGhlIGdpdmVuIHRleHQuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0hhdmVUZXh0J31cbiAgICovXG4gIHRvSGF2ZVRleHQoZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIHRoZSBnaXZlbiBDU1MgY2xhc3MuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0hhdmVDc3NDbGFzcyd9XG4gICAqL1xuICB0b0hhdmVDc3NDbGFzcyhleHBlY3RlZDogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IHRoZSBlbGVtZW50IHRvIGhhdmUgdGhlIGdpdmVuIENTUyBzdHlsZXMuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0hhdmVDc3NTdHlsZSd9XG4gICAqL1xuICB0b0hhdmVDc3NTdHlsZShleHBlY3RlZDogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IGEgY2xhc3MgdG8gaW1wbGVtZW50IHRoZSBpbnRlcmZhY2Ugb2YgdGhlIGdpdmVuIGNsYXNzLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9JbXBsZW1lbnQnfVxuICAgKi9cbiAgdG9JbXBsZW1lbnQoZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCBhbiBleGNlcHRpb24gdG8gY29udGFpbiB0aGUgZ2l2ZW4gZXJyb3IgdGV4dC5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvQ29udGFpbkVycm9yJ31cbiAgICovXG4gIHRvQ29udGFpbkVycm9yKGV4cGVjdGVkOiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgYSBmdW5jdGlvbiB0byB0aHJvdyBhbiBlcnJvciB3aXRoIHRoZSBnaXZlbiBlcnJvciB0ZXh0IHdoZW4gZXhlY3V0ZWQuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b1Rocm93RXJyb3JXaXRoJ31cbiAgICovXG4gIHRvVGhyb3dFcnJvcldpdGgoZXhwZWN0ZWRNZXNzYWdlOiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgYSBzdHJpbmcgdG8gbWF0Y2ggdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvTWF0Y2hQYXR0ZXJuJ31cbiAgICovXG4gIHRvTWF0Y2hQYXR0ZXJuKGV4cGVjdGVkTWVzc2FnZTogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogSW52ZXJ0IHRoZSBtYXRjaGVycy5cbiAgICovXG4gIG5vdDogTmdNYXRjaGVycztcbn1cblxudmFyIF9nbG9iYWwgPSA8YW55Pih0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdyk7XG5cbi8qKlxuICogSmFzbWluZSBtYXRjaGluZyBmdW5jdGlvbiB3aXRoIEFuZ3VsYXIgbWF0Y2hlcnMgbWl4ZWQgaW4uXG4gKlxuICogIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlVGV4dCd9XG4gKi9cbmV4cG9ydCB2YXIgZXhwZWN0OiAoYWN0dWFsOiBhbnkpID0+IE5nTWF0Y2hlcnMgPSA8YW55Pl9nbG9iYWwuZXhwZWN0O1xuXG5cbi8vIFNvbWUgTWFwIHBvbHlmaWxscyBkb24ndCBwb2x5ZmlsbCBNYXAudG9TdHJpbmcgY29ycmVjdGx5LCB3aGljaFxuLy8gZ2l2ZXMgdXMgYmFkIGVycm9yIG1lc3NhZ2VzIGluIHRlc3RzLlxuLy8gVGhlIG9ubHkgd2F5IHRvIGRvIHRoaXMgaW4gSmFzbWluZSBpcyB0byBtb25rZXkgcGF0Y2ggYSBtZXRob2Rcbi8vIHRvIHRoZSBvYmplY3QgOi0oXG5NYXAucHJvdG90eXBlWydqYXNtaW5lVG9TdHJpbmcnXSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbSA9IHRoaXM7XG4gIGlmICghbSkge1xuICAgIHJldHVybiAnJyArIG07XG4gIH1cbiAgdmFyIHJlcyA9IFtdO1xuICBtLmZvckVhY2goKHYsIGspID0+IHsgcmVzLnB1c2goYCR7a306JHt2fWApOyB9KTtcbiAgcmV0dXJuIGB7ICR7cmVzLmpvaW4oJywnKX0gfWA7XG59O1xuXG5fZ2xvYmFsLmJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gIGphc21pbmUuYWRkTWF0Y2hlcnMoe1xuICAgIC8vIEN1c3RvbSBoYW5kbGVyIGZvciBNYXAgYXMgSmFzbWluZSBkb2VzIG5vdCBzdXBwb3J0IGl0IHlldFxuICAgIHRvRXF1YWw6IGZ1bmN0aW9uKHV0aWwsIGN1c3RvbUVxdWFsaXR5VGVzdGVycykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZCkge1xuICAgICAgICAgIHJldHVybiB7cGFzczogdXRpbC5lcXVhbHMoYWN0dWFsLCBleHBlY3RlZCwgW2NvbXBhcmVNYXBdKX07XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZ1bmN0aW9uIGNvbXBhcmVNYXAoYWN0dWFsLCBleHBlY3RlZCkge1xuICAgICAgICBpZiAoYWN0dWFsIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgdmFyIHBhc3MgPSBhY3R1YWwuc2l6ZSA9PT0gZXhwZWN0ZWQuc2l6ZTtcbiAgICAgICAgICBpZiAocGFzcykge1xuICAgICAgICAgICAgYWN0dWFsLmZvckVhY2goKHYsIGspID0+IHsgcGFzcyA9IHBhc3MgJiYgdXRpbC5lcXVhbHModiwgZXhwZWN0ZWQuZ2V0KGspKTsgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBwYXNzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9CZVByb21pc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZENsYXNzKSB7XG4gICAgICAgICAgdmFyIHBhc3MgPSB0eXBlb2YgYWN0dWFsID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYWN0dWFsLnRoZW4gPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgcmV0dXJuIHtwYXNzOiBwYXNzLCBnZXQgbWVzc2FnZSgpIHsgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsICsgJyB0byBiZSBhIHByb21pc2UnOyB9fTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9CZUFuSW5zdGFuY2VPZjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkQ2xhc3MpIHtcbiAgICAgICAgICB2YXIgcGFzcyA9IHR5cGVvZiBhY3R1YWwgPT09ICdvYmplY3QnICYmIGFjdHVhbCBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3M7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IHBhc3MsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsICsgJyB0byBiZSBhbiBpbnN0YW5jZSBvZiAnICsgZXhwZWN0ZWRDbGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0hhdmVUZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbCwgZXhwZWN0ZWRUZXh0KSB7XG4gICAgICAgICAgdmFyIGFjdHVhbFRleHQgPSBlbGVtZW50VGV4dChhY3R1YWwpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBhY3R1YWxUZXh0ID09IGV4cGVjdGVkVGV4dCxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkgeyByZXR1cm4gJ0V4cGVjdGVkICcgKyBhY3R1YWxUZXh0ICsgJyB0byBiZSBlcXVhbCB0byAnICsgZXhwZWN0ZWRUZXh0OyB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9IYXZlQ3NzQ2xhc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtjb21wYXJlOiBidWlsZEVycm9yKGZhbHNlKSwgbmVnYXRpdmVDb21wYXJlOiBidWlsZEVycm9yKHRydWUpfTtcblxuICAgICAgZnVuY3Rpb24gYnVpbGRFcnJvcihpc05vdCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYWN0dWFsLCBjbGFzc05hbWUpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogRE9NLmhhc0NsYXNzKGFjdHVhbCwgY2xhc3NOYW1lKSA9PSAhaXNOb3QsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGBFeHBlY3RlZCAke2FjdHVhbC5vdXRlckhUTUx9ICR7aXNOb3QgPyAnbm90ICcgOiAnJ310byBjb250YWluIHRoZSBDU1MgY2xhc3MgXCIke2NsYXNzTmFtZX1cImA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9IYXZlQ3NzU3R5bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsLCBzdHlsZXMpIHtcbiAgICAgICAgICB2YXIgYWxsUGFzc2VkO1xuICAgICAgICAgIGlmIChpc1N0cmluZyhzdHlsZXMpKSB7XG4gICAgICAgICAgICBhbGxQYXNzZWQgPSBET00uaGFzU3R5bGUoYWN0dWFsLCBzdHlsZXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGxQYXNzZWQgPSAhU3RyaW5nTWFwV3JhcHBlci5pc0VtcHR5KHN0eWxlcyk7XG4gICAgICAgICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goc3R5bGVzLCAoc3R5bGUsIHByb3ApID0+IHtcbiAgICAgICAgICAgICAgYWxsUGFzc2VkID0gYWxsUGFzc2VkICYmIERPTS5oYXNTdHlsZShhY3R1YWwsIHByb3AsIHN0eWxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBhbGxQYXNzZWQsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgdmFyIGV4cGVjdGVkVmFsdWVTdHIgPSBpc1N0cmluZyhzdHlsZXMpID8gc3R5bGVzIDogSlNPTi5zdHJpbmdpZnkoc3R5bGVzKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGBFeHBlY3RlZCAke2FjdHVhbC5vdXRlckhUTUx9ICR7IWFsbFBhc3NlZCA/ICcgJyA6ICdub3QgJ310byBjb250YWluIHRoZVxuICAgICAgICAgICAgICAgICAgICAgIENTUyAke2lzU3RyaW5nKHN0eWxlcykgPyAncHJvcGVydHknIDogJ3N0eWxlcyd9IFwiJHtleHBlY3RlZFZhbHVlU3RyfVwiYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0NvbnRhaW5FcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkVGV4dCkge1xuICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBhY3R1YWwudG9TdHJpbmcoKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogZXJyb3JNZXNzYWdlLmluZGV4T2YoZXhwZWN0ZWRUZXh0KSA+IC0xLFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7IHJldHVybiAnRXhwZWN0ZWQgJyArIGVycm9yTWVzc2FnZSArICcgdG8gY29udGFpbiAnICsgZXhwZWN0ZWRUZXh0OyB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9UaHJvd0Vycm9yV2l0aDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkVGV4dCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhY3R1YWwoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHBhc3M6IGZhbHNlLFxuICAgICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHsgcmV0dXJuIFwiV2FzIGV4cGVjdGVkIHRvIHRocm93LCBidXQgZGlkIG5vdCB0aHJvd1wiOyB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBwYXNzOiBlcnJvck1lc3NhZ2UuaW5kZXhPZihleHBlY3RlZFRleHQpID4gLTEsXG4gICAgICAgICAgICAgIGdldCBtZXNzYWdlKCkgeyByZXR1cm4gJ0V4cGVjdGVkICcgKyBlcnJvck1lc3NhZ2UgKyAnIHRvIGNvbnRhaW4gJyArIGV4cGVjdGVkVGV4dDsgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvTWF0Y2hQYXR0ZXJuKCkge1xuICAgICAgcmV0dXJuIHtjb21wYXJlOiBidWlsZEVycm9yKGZhbHNlKSwgbmVnYXRpdmVDb21wYXJlOiBidWlsZEVycm9yKHRydWUpfTtcblxuICAgICAgZnVuY3Rpb24gYnVpbGRFcnJvcihpc05vdCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYWN0dWFsLCByZWdleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiByZWdleC50ZXN0KGFjdHVhbCkgPT0gIWlzTm90LFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBgRXhwZWN0ZWQgJHthY3R1YWx9ICR7aXNOb3QgPyAnbm90ICcgOiAnJ310byBtYXRjaCAke3JlZ2V4LnRvU3RyaW5nKCl9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB0b0ltcGxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWxPYmplY3QsIGV4cGVjdGVkSW50ZXJmYWNlKSB7XG4gICAgICAgICAgdmFyIG9ialByb3BzID0gT2JqZWN0LmtleXMoYWN0dWFsT2JqZWN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG4gICAgICAgICAgdmFyIGludFByb3BzID0gT2JqZWN0LmtleXMoZXhwZWN0ZWRJbnRlcmZhY2UucHJvdG90eXBlKTtcblxuICAgICAgICAgIHZhciBtaXNzZWRNZXRob2RzID0gW107XG4gICAgICAgICAgaW50UHJvcHMuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgICAgICAgaWYgKCFhY3R1YWxPYmplY3QuY29uc3RydWN0b3IucHJvdG90eXBlW2tdKSBtaXNzZWRNZXRob2RzLnB1c2goayk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogbWlzc2VkTWV0aG9kcy5sZW5ndGggPT0gMCxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJ0V4cGVjdGVkICcgKyBhY3R1YWxPYmplY3QgKyAnIHRvIGhhdmUgdGhlIGZvbGxvd2luZyBtZXRob2RzOiAnICtcbiAgICAgICAgICAgICAgICAgICAgIG1pc3NlZE1ldGhvZHMuam9pbihcIiwgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBlbGVtZW50VGV4dChuKSB7XG4gIHZhciBoYXNOb2RlcyA9IChuKSA9PiB7XG4gICAgdmFyIGNoaWxkcmVuID0gRE9NLmNoaWxkTm9kZXMobik7XG4gICAgcmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gIH07XG5cbiAgaWYgKG4gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHJldHVybiBuLm1hcChlbGVtZW50VGV4dCkuam9pbihcIlwiKTtcbiAgfVxuXG4gIGlmIChET00uaXNDb21tZW50Tm9kZShuKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmIChET00uaXNFbGVtZW50Tm9kZShuKSAmJiBET00udGFnTmFtZShuKSA9PSAnQ09OVEVOVCcpIHtcbiAgICByZXR1cm4gZWxlbWVudFRleHQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KERPTS5nZXREaXN0cmlidXRlZE5vZGVzKG4pKSk7XG4gIH1cblxuICBpZiAoRE9NLmhhc1NoYWRvd1Jvb3QobikpIHtcbiAgICByZXR1cm4gZWxlbWVudFRleHQoRE9NLmNoaWxkTm9kZXNBc0xpc3QoRE9NLmdldFNoYWRvd1Jvb3QobikpKTtcbiAgfVxuXG4gIGlmIChoYXNOb2RlcyhuKSkge1xuICAgIHJldHVybiBlbGVtZW50VGV4dChET00uY2hpbGROb2Rlc0FzTGlzdChuKSk7XG4gIH1cblxuICByZXR1cm4gRE9NLmdldFRleHQobik7XG59XG4iXX0=