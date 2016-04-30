import { CompileIdentifierMetadata, CompileTokenMetadata } from './compile_metadata';
import { AppView, DebugAppView } from 'angular2/src/core/linker/view';
import { StaticNodeDebugInfo, DebugContext } from 'angular2/src/core/linker/debug_context';
import { ViewUtils, flattenNestedViewRenderNodes, interpolate, checkBinding, castByValue, pureProxy1, pureProxy2, pureProxy3, pureProxy4, pureProxy5, pureProxy6, pureProxy7, pureProxy8, pureProxy9, pureProxy10 } from 'angular2/src/core/linker/view_utils';
import { uninitialized, devModeEqual, SimpleChange, ValueUnwrapper, ChangeDetectorRef, ChangeDetectorState, ChangeDetectionStrategy } from 'angular2/src/core/change_detection/change_detection';
import { AppElement } from 'angular2/src/core/linker/element';
import { ElementRef } from 'angular2/src/core/linker/element_ref';
import { ViewContainerRef } from 'angular2/src/core/linker/view_container_ref';
import { Renderer, RenderComponentType } from 'angular2/src/core/render/api';
import { ViewEncapsulation } from 'angular2/src/core/metadata/view';
import { ViewType } from 'angular2/src/core/linker/view_type';
import { QueryList } from 'angular2/src/core/linker';
import { Injector } from 'angular2/src/core/di/injector';
import { TemplateRef, TemplateRef_ } from 'angular2/src/core/linker/template_ref';
import { MODULE_SUFFIX } from './util';
var APP_VIEW_MODULE_URL = 'asset:angular2/lib/src/core/linker/view' + MODULE_SUFFIX;
var VIEW_UTILS_MODULE_URL = 'asset:angular2/lib/src/core/linker/view_utils' + MODULE_SUFFIX;
var CD_MODULE_URL = 'asset:angular2/lib/src/core/change_detection/change_detection' + MODULE_SUFFIX;
// Reassign the imports to different variables so we can
// define static variables with the name of the import.
// (only needed for Dart).
var impViewUtils = ViewUtils;
var impAppView = AppView;
var impDebugAppView = DebugAppView;
var impDebugContext = DebugContext;
var impAppElement = AppElement;
var impElementRef = ElementRef;
var impViewContainerRef = ViewContainerRef;
var impChangeDetectorRef = ChangeDetectorRef;
var impRenderComponentType = RenderComponentType;
var impQueryList = QueryList;
var impTemplateRef = TemplateRef;
var impTemplateRef_ = TemplateRef_;
var impValueUnwrapper = ValueUnwrapper;
var impInjector = Injector;
var impViewEncapsulation = ViewEncapsulation;
var impViewType = ViewType;
var impChangeDetectionStrategy = ChangeDetectionStrategy;
var impStaticNodeDebugInfo = StaticNodeDebugInfo;
var impRenderer = Renderer;
var impSimpleChange = SimpleChange;
var impUninitialized = uninitialized;
var impChangeDetectorState = ChangeDetectorState;
var impFlattenNestedViewRenderNodes = flattenNestedViewRenderNodes;
var impDevModeEqual = devModeEqual;
var impInterpolate = interpolate;
var impCheckBinding = checkBinding;
var impCastByValue = castByValue;
export class Identifiers {
}
Identifiers.ViewUtils = new CompileIdentifierMetadata({
    name: 'ViewUtils',
    moduleUrl: 'asset:angular2/lib/src/core/linker/view_utils' + MODULE_SUFFIX,
    runtime: impViewUtils
});
Identifiers.AppView = new CompileIdentifierMetadata({ name: 'AppView', moduleUrl: APP_VIEW_MODULE_URL, runtime: impAppView });
Identifiers.DebugAppView = new CompileIdentifierMetadata({ name: 'DebugAppView', moduleUrl: APP_VIEW_MODULE_URL, runtime: impDebugAppView });
Identifiers.AppElement = new CompileIdentifierMetadata({
    name: 'AppElement',
    moduleUrl: 'asset:angular2/lib/src/core/linker/element' + MODULE_SUFFIX,
    runtime: impAppElement
});
Identifiers.ElementRef = new CompileIdentifierMetadata({
    name: 'ElementRef',
    moduleUrl: 'asset:angular2/lib/src/core/linker/element_ref' + MODULE_SUFFIX,
    runtime: impElementRef
});
Identifiers.ViewContainerRef = new CompileIdentifierMetadata({
    name: 'ViewContainerRef',
    moduleUrl: 'asset:angular2/lib/src/core/linker/view_container_ref' + MODULE_SUFFIX,
    runtime: impViewContainerRef
});
Identifiers.ChangeDetectorRef = new CompileIdentifierMetadata({
    name: 'ChangeDetectorRef',
    moduleUrl: 'asset:angular2/lib/src/core/change_detection/change_detector_ref' + MODULE_SUFFIX,
    runtime: impChangeDetectorRef
});
Identifiers.RenderComponentType = new CompileIdentifierMetadata({
    name: 'RenderComponentType',
    moduleUrl: 'asset:angular2/lib/src/core/render/api' + MODULE_SUFFIX,
    runtime: impRenderComponentType
});
Identifiers.QueryList = new CompileIdentifierMetadata({
    name: 'QueryList',
    moduleUrl: 'asset:angular2/lib/src/core/linker/query_list' + MODULE_SUFFIX,
    runtime: impQueryList
});
Identifiers.TemplateRef = new CompileIdentifierMetadata({
    name: 'TemplateRef',
    moduleUrl: 'asset:angular2/lib/src/core/linker/template_ref' + MODULE_SUFFIX,
    runtime: impTemplateRef
});
Identifiers.TemplateRef_ = new CompileIdentifierMetadata({
    name: 'TemplateRef_',
    moduleUrl: 'asset:angular2/lib/src/core/linker/template_ref' + MODULE_SUFFIX,
    runtime: impTemplateRef_
});
Identifiers.ValueUnwrapper = new CompileIdentifierMetadata({ name: 'ValueUnwrapper', moduleUrl: CD_MODULE_URL, runtime: impValueUnwrapper });
Identifiers.Injector = new CompileIdentifierMetadata({
    name: 'Injector',
    moduleUrl: `asset:angular2/lib/src/core/di/injector${MODULE_SUFFIX}`,
    runtime: impInjector
});
Identifiers.ViewEncapsulation = new CompileIdentifierMetadata({
    name: 'ViewEncapsulation',
    moduleUrl: 'asset:angular2/lib/src/core/metadata/view' + MODULE_SUFFIX,
    runtime: impViewEncapsulation
});
Identifiers.ViewType = new CompileIdentifierMetadata({
    name: 'ViewType',
    moduleUrl: `asset:angular2/lib/src/core/linker/view_type${MODULE_SUFFIX}`,
    runtime: impViewType
});
Identifiers.ChangeDetectionStrategy = new CompileIdentifierMetadata({
    name: 'ChangeDetectionStrategy',
    moduleUrl: CD_MODULE_URL,
    runtime: impChangeDetectionStrategy
});
Identifiers.StaticNodeDebugInfo = new CompileIdentifierMetadata({
    name: 'StaticNodeDebugInfo',
    moduleUrl: `asset:angular2/lib/src/core/linker/debug_context${MODULE_SUFFIX}`,
    runtime: impStaticNodeDebugInfo
});
Identifiers.DebugContext = new CompileIdentifierMetadata({
    name: 'DebugContext',
    moduleUrl: `asset:angular2/lib/src/core/linker/debug_context${MODULE_SUFFIX}`,
    runtime: impDebugContext
});
Identifiers.Renderer = new CompileIdentifierMetadata({
    name: 'Renderer',
    moduleUrl: 'asset:angular2/lib/src/core/render/api' + MODULE_SUFFIX,
    runtime: impRenderer
});
Identifiers.SimpleChange = new CompileIdentifierMetadata({ name: 'SimpleChange', moduleUrl: CD_MODULE_URL, runtime: impSimpleChange });
Identifiers.uninitialized = new CompileIdentifierMetadata({ name: 'uninitialized', moduleUrl: CD_MODULE_URL, runtime: impUninitialized });
Identifiers.ChangeDetectorState = new CompileIdentifierMetadata({ name: 'ChangeDetectorState', moduleUrl: CD_MODULE_URL, runtime: impChangeDetectorState });
Identifiers.checkBinding = new CompileIdentifierMetadata({ name: 'checkBinding', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impCheckBinding });
Identifiers.flattenNestedViewRenderNodes = new CompileIdentifierMetadata({
    name: 'flattenNestedViewRenderNodes',
    moduleUrl: VIEW_UTILS_MODULE_URL,
    runtime: impFlattenNestedViewRenderNodes
});
Identifiers.devModeEqual = new CompileIdentifierMetadata({ name: 'devModeEqual', moduleUrl: CD_MODULE_URL, runtime: impDevModeEqual });
Identifiers.interpolate = new CompileIdentifierMetadata({ name: 'interpolate', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impInterpolate });
Identifiers.castByValue = new CompileIdentifierMetadata({ name: 'castByValue', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impCastByValue });
Identifiers.pureProxies = [
    null,
    new CompileIdentifierMetadata({ name: 'pureProxy1', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: pureProxy1 }),
    new CompileIdentifierMetadata({ name: 'pureProxy2', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: pureProxy2 }),
    new CompileIdentifierMetadata({ name: 'pureProxy3', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: pureProxy3 }),
    new CompileIdentifierMetadata({ name: 'pureProxy4', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: pureProxy4 }),
    new CompileIdentifierMetadata({ name: 'pureProxy5', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: pureProxy5 }),
    new CompileIdentifierMetadata({ name: 'pureProxy6', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: pureProxy6 }),
    new CompileIdentifierMetadata({ name: 'pureProxy7', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: pureProxy7 }),
    new CompileIdentifierMetadata({ name: 'pureProxy8', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: pureProxy8 }),
    new CompileIdentifierMetadata({ name: 'pureProxy9', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: pureProxy9 }),
    new CompileIdentifierMetadata({ name: 'pureProxy10', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: pureProxy10 }),
];
export function identifierToken(identifier) {
    return new CompileTokenMetadata({ identifier: identifier });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpZmllcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUplVDh1em84LnRtcC9hbmd1bGFyMi9zcmMvY29tcGlsZXIvaWRlbnRpZmllcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyx5QkFBeUIsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLG9CQUFvQjtPQUMzRSxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUMsTUFBTSwrQkFBK0I7T0FDNUQsRUFBQyxtQkFBbUIsRUFBRSxZQUFZLEVBQUMsTUFBTSx3Q0FBd0M7T0FDakYsRUFDTCxTQUFTLEVBQ1QsNEJBQTRCLEVBQzVCLFdBQVcsRUFDWCxZQUFZLEVBQ1osV0FBVyxFQUNYLFVBQVUsRUFDVixVQUFVLEVBQ1YsVUFBVSxFQUNWLFVBQVUsRUFDVixVQUFVLEVBQ1YsVUFBVSxFQUNWLFVBQVUsRUFDVixVQUFVLEVBQ1YsVUFBVSxFQUNWLFdBQVcsRUFDWixNQUFNLHFDQUFxQztPQUNyQyxFQUNMLGFBQWEsRUFDYixZQUFZLEVBQ1osWUFBWSxFQUNaLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsbUJBQW1CLEVBQ25CLHVCQUF1QixFQUN4QixNQUFNLHFEQUFxRDtPQUNyRCxFQUFDLFVBQVUsRUFBQyxNQUFNLGtDQUFrQztPQUNwRCxFQUFDLFVBQVUsRUFBQyxNQUFNLHNDQUFzQztPQUN4RCxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNkNBQTZDO09BQ3JFLEVBQUMsUUFBUSxFQUFFLG1CQUFtQixFQUFrQixNQUFNLDhCQUE4QjtPQUNwRixFQUFDLGlCQUFpQixFQUFDLE1BQU0saUNBQWlDO09BQzFELEVBQUMsUUFBUSxFQUFDLE1BQU0sb0NBQW9DO09BQ3BELEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCO09BQzNDLEVBQUMsUUFBUSxFQUFDLE1BQU0sK0JBQStCO09BQy9DLEVBQUMsV0FBVyxFQUFFLFlBQVksRUFBQyxN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VUFBVSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7QUFDNUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSwgQ29tcGlsZVRva2VuTWV0YWRhdGF9IGZyb20gJy4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge0FwcFZpZXcsIERlYnVnQXBwVmlld30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXcnO1xuaW1wb3J0IHtTdGF0aWNOb2RlRGVidWdJbmZvLCBEZWJ1Z0NvbnRleHR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9kZWJ1Z19jb250ZXh0JztcbmltcG9ydCB7XG4gIFZpZXdVdGlscyxcbiAgZmxhdHRlbk5lc3RlZFZpZXdSZW5kZXJOb2RlcyxcbiAgaW50ZXJwb2xhdGUsXG4gIGNoZWNrQmluZGluZyxcbiAgY2FzdEJ5VmFsdWUsXG4gIHB1cmVQcm94eTEsXG4gIHB1cmVQcm94eTIsXG4gIHB1cmVQcm94eTMsXG4gIHB1cmVQcm94eTQsXG4gIHB1cmVQcm94eTUsXG4gIHB1cmVQcm94eTYsXG4gIHB1cmVQcm94eTcsXG4gIHB1cmVQcm94eTgsXG4gIHB1cmVQcm94eTksXG4gIHB1cmVQcm94eTEwXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X3V0aWxzJztcbmltcG9ydCB7XG4gIHVuaW5pdGlhbGl6ZWQsXG4gIGRldk1vZGVFcXVhbCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBWYWx1ZVVud3JhcHBlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENoYW5nZURldGVjdG9yU3RhdGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5pbXBvcnQge0FwcEVsZW1lbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50JztcbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2VsZW1lbnRfcmVmJztcbmltcG9ydCB7Vmlld0NvbnRhaW5lclJlZn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfY29udGFpbmVyX3JlZic7XG5pbXBvcnQge1JlbmRlcmVyLCBSZW5kZXJDb21wb25lbnRUeXBlLCBSZW5kZXJEZWJ1Z0luZm99IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHtWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEvdmlldyc7XG5pbXBvcnQge1ZpZXdUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdmlld190eXBlJztcbmltcG9ydCB7UXVlcnlMaXN0fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXInO1xuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtUZW1wbGF0ZVJlZiwgVGVtcGxhdGVSZWZffSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdGVtcGxhdGVfcmVmJztcbmltcG9ydCB7TU9EVUxFX1NVRkZJWH0gZnJvbSAnLi91dGlsJztcblxudmFyIEFQUF9WSUVXX01PRFVMRV9VUkwgPSAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci92aWV3JyArIE1PRFVMRV9TVUZGSVg7XG52YXIgVklFV19VVElMU19NT0RVTEVfVVJMID0gJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9saW5rZXIvdmlld191dGlscycgKyBNT0RVTEVfU1VGRklYO1xudmFyIENEX01PRFVMRV9VUkwgPSAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbicgKyBNT0RVTEVfU1VGRklYO1xuXG4vLyBSZWFzc2lnbiB0aGUgaW1wb3J0cyB0byBkaWZmZXJlbnQgdmFyaWFibGVzIHNvIHdlIGNhblxuLy8gZGVmaW5lIHN0YXRpYyB2YXJpYWJsZXMgd2l0aCB0aGUgbmFtZSBvZiB0aGUgaW1wb3J0LlxuLy8gKG9ubHkgbmVlZGVkIGZvciBEYXJ0KS5cbnZhciBpbXBWaWV3VXRpbHMgPSBWaWV3VXRpbHM7XG52YXIgaW1wQXBwVmlldyA9IEFwcFZpZXc7XG52YXIgaW1wRGVidWdBcHBWaWV3ID0gRGVidWdBcHBWaWV3O1xudmFyIGltcERlYnVnQ29udGV4dCA9IERlYnVnQ29udGV4dDtcbnZhciBpbXBBcHBFbGVtZW50ID0gQXBwRWxlbWVudDtcbnZhciBpbXBFbGVtZW50UmVmID0gRWxlbWVudFJlZjtcbnZhciBpbXBWaWV3Q29udGFpbmVyUmVmID0gVmlld0NvbnRhaW5lclJlZjtcbnZhciBpbXBDaGFuZ2VEZXRlY3RvclJlZiA9IENoYW5nZURldGVjdG9yUmVmO1xudmFyIGltcFJlbmRlckNvbXBvbmVudFR5cGUgPSBSZW5kZXJDb21wb25lbnRUeXBlO1xudmFyIGltcFF1ZXJ5TGlzdCA9IFF1ZXJ5TGlzdDtcbnZhciBpbXBUZW1wbGF0ZVJlZiA9IFRlbXBsYXRlUmVmO1xudmFyIGltcFRlbXBsYXRlUmVmXyA9IFRlbXBsYXRlUmVmXztcbnZhciBpbXBWYWx1ZVVud3JhcHBlciA9IFZhbHVlVW53cmFwcGVyO1xudmFyIGltcEluamVjdG9yID0gSW5qZWN0b3I7XG52YXIgaW1wVmlld0VuY2Fwc3VsYXRpb24gPSBWaWV3RW5jYXBzdWxhdGlvbjtcbnZhciBpbXBWaWV3VHlwZSA9IFZpZXdUeXBlO1xudmFyIGltcENoYW5nZURldGVjdGlvblN0cmF0ZWd5ID0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k7XG52YXIgaW1wU3RhdGljTm9kZURlYnVnSW5mbyA9IFN0YXRpY05vZGVEZWJ1Z0luZm87XG52YXIgaW1wUmVuZGVyZXIgPSBSZW5kZXJlcjtcbnZhciBpbXBTaW1wbGVDaGFuZ2UgPSBTaW1wbGVDaGFuZ2U7XG52YXIgaW1wVW5pbml0aWFsaXplZCA9IHVuaW5pdGlhbGl6ZWQ7XG52YXIgaW1wQ2hhbmdlRGV0ZWN0b3JTdGF0ZSA9IENoYW5nZURldGVjdG9yU3RhdGU7XG52YXIgaW1wRmxhdHRlbk5lc3RlZFZpZXdSZW5kZXJOb2RlcyA9IGZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXM7XG52YXIgaW1wRGV2TW9kZUVxdWFsID0gZGV2TW9kZUVxdWFsO1xudmFyIGltcEludGVycG9sYXRlID0gaW50ZXJwb2xhdGU7XG52YXIgaW1wQ2hlY2tCaW5kaW5nID0gY2hlY2tCaW5kaW5nO1xudmFyIGltcENhc3RCeVZhbHVlID0gY2FzdEJ5VmFsdWU7XG5cbmV4cG9ydCBjbGFzcyBJZGVudGlmaWVycyB7XG4gIHN0YXRpYyBWaWV3VXRpbHMgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ1ZpZXdVdGlscycsXG4gICAgbW9kdWxlVXJsOiAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci92aWV3X3V0aWxzJyArIE1PRFVMRV9TVUZGSVgsXG4gICAgcnVudGltZTogaW1wVmlld1V0aWxzXG4gIH0pO1xuICBzdGF0aWMgQXBwVmlldyA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAge25hbWU6ICdBcHBWaWV3JywgbW9kdWxlVXJsOiBBUFBfVklFV19NT0RVTEVfVVJMLCBydW50aW1lOiBpbXBBcHBWaWV3fSk7XG4gIHN0YXRpYyBEZWJ1Z0FwcFZpZXcgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgIHtuYW1lOiAnRGVidWdBcHBWaWV3JywgbW9kdWxlVXJsOiBBUFBfVklFV19NT0RVTEVfVVJMLCBydW50aW1lOiBpbXBEZWJ1Z0FwcFZpZXd9KTtcbiAgc3RhdGljIEFwcEVsZW1lbnQgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ0FwcEVsZW1lbnQnLFxuICAgIG1vZHVsZVVybDogJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9saW5rZXIvZWxlbWVudCcgKyBNT0RVTEVfU1VGRklYLFxuICAgIHJ1bnRpbWU6IGltcEFwcEVsZW1lbnRcbiAgfSk7XG4gIHN0YXRpYyBFbGVtZW50UmVmID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6ICdFbGVtZW50UmVmJyxcbiAgICBtb2R1bGVVcmw6ICdhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvbGlua2VyL2VsZW1lbnRfcmVmJyArIE1PRFVMRV9TVUZGSVgsXG4gICAgcnVudGltZTogaW1wRWxlbWVudFJlZlxuICB9KTtcbiAgc3RhdGljIFZpZXdDb250YWluZXJSZWYgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ1ZpZXdDb250YWluZXJSZWYnLFxuICAgIG1vZHVsZVVybDogJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9saW5rZXIvdmlld19jb250YWluZXJfcmVmJyArIE1PRFVMRV9TVUZGSVgsXG4gICAgcnVudGltZTogaW1wVmlld0NvbnRhaW5lclJlZlxuICB9KTtcbiAgc3RhdGljIENoYW5nZURldGVjdG9yUmVmID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6ICdDaGFuZ2VEZXRlY3RvclJlZicsXG4gICAgbW9kdWxlVXJsOiAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdG9yX3JlZicgKyBNT0RVTEVfU1VGRklYLFxuICAgIHJ1bnRpbWU6IGltcENoYW5nZURldGVjdG9yUmVmXG4gIH0pO1xuICBzdGF0aWMgUmVuZGVyQ29tcG9uZW50VHlwZSA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnUmVuZGVyQ29tcG9uZW50VHlwZScsXG4gICAgbW9kdWxlVXJsOiAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL3JlbmRlci9hcGknICsgTU9EVUxFX1NVRkZJWCxcbiAgICBydW50aW1lOiBpbXBSZW5kZXJDb21wb25lbnRUeXBlXG4gIH0pO1xuICBzdGF0aWMgUXVlcnlMaXN0ID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6ICdRdWVyeUxpc3QnLFxuICAgIG1vZHVsZVVybDogJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9saW5rZXIvcXVlcnlfbGlzdCcgKyBNT0RVTEVfU1VGRklYLFxuICAgIHJ1bnRpbWU6IGltcFF1ZXJ5TGlzdFxuICB9KTtcbiAgc3RhdGljIFRlbXBsYXRlUmVmID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6ICdUZW1wbGF0ZVJlZicsXG4gICAgbW9kdWxlVXJsOiAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci90ZW1wbGF0ZV9yZWYnICsgTU9EVUxFX1NVRkZJWCxcbiAgICBydW50aW1lOiBpbXBUZW1wbGF0ZVJlZlxuICB9KTtcbiAgc3RhdGljIFRlbXBsYXRlUmVmXyA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnVGVtcGxhdGVSZWZfJyxcbiAgICBtb2R1bGVVcmw6ICdhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvbGlua2VyL3RlbXBsYXRlX3JlZicgKyBNT0RVTEVfU1VGRklYLFxuICAgIHJ1bnRpbWU6IGltcFRlbXBsYXRlUmVmX1xuICB9KTtcbiAgc3RhdGljIFZhbHVlVW53cmFwcGVyID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoXG4gICAgICB7bmFtZTogJ1ZhbHVlVW53cmFwcGVyJywgbW9kdWxlVXJsOiBDRF9NT0RVTEVfVVJMLCBydW50aW1lOiBpbXBWYWx1ZVVud3JhcHBlcn0pO1xuICBzdGF0aWMgSW5qZWN0b3IgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgbmFtZTogJ0luamVjdG9yJyxcbiAgICBtb2R1bGVVcmw6IGBhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvZGkvaW5qZWN0b3Ike01PRFVMRV9TVUZGSVh9YCxcbiAgICBydW50aW1lOiBpbXBJbmplY3RvclxuICB9KTtcbiAgc3RhdGljIFZpZXdFbmNhcHN1bGF0aW9uID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6ICdWaWV3RW5jYXBzdWxhdGlvbicsXG4gICAgbW9kdWxlVXJsOiAnYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL21ldGFkYXRhL3ZpZXcnICsgTU9EVUxFX1NVRkZJWCxcbiAgICBydW50aW1lOiBpbXBWaWV3RW5jYXBzdWxhdGlvblxuICB9KTtcbiAgc3RhdGljIFZpZXdUeXBlID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6ICdWaWV3VHlwZScsXG4gICAgbW9kdWxlVXJsOiBgYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci92aWV3X3R5cGUke01PRFVMRV9TVUZGSVh9YCxcbiAgICBydW50aW1lOiBpbXBWaWV3VHlwZVxuICB9KTtcbiAgc3RhdGljIENoYW5nZURldGVjdGlvblN0cmF0ZWd5ID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoe1xuICAgIG5hbWU6ICdDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneScsXG4gICAgbW9kdWxlVXJsOiBDRF9NT0RVTEVfVVJMLFxuICAgIHJ1bnRpbWU6IGltcENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG4gIH0pO1xuICBzdGF0aWMgU3RhdGljTm9kZURlYnVnSW5mbyA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnU3RhdGljTm9kZURlYnVnSW5mbycsXG4gICAgbW9kdWxlVXJsOiBgYXNzZXQ6YW5ndWxhcjIvbGliL3NyYy9jb3JlL2xpbmtlci9kZWJ1Z19jb250ZXh0JHtNT0RVTEVfU1VGRklYfWAsXG4gICAgcnVudGltZTogaW1wU3RhdGljTm9kZURlYnVnSW5mb1xuICB9KTtcbiAgc3RhdGljIERlYnVnQ29udGV4dCA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnRGVidWdDb250ZXh0JyxcbiAgICBtb2R1bGVVcmw6IGBhc3NldDphbmd1bGFyMi9saWIvc3JjL2NvcmUvbGlua2VyL2RlYnVnX2NvbnRleHQke01PRFVMRV9TVUZGSVh9YCxcbiAgICBydW50aW1lOiBpbXBEZWJ1Z0NvbnRleHRcbiAgfSk7XG4gIHN0YXRpYyBSZW5kZXJlciA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnUmVuZGVyZXInLFxuICAgIG1vZHVsZVVybDogJ2Fzc2V0OmFuZ3VsYXIyL2xpYi9zcmMvY29yZS9yZW5kZXIvYXBpJyArIE1PRFVMRV9TVUZGSVgsXG4gICAgcnVudGltZTogaW1wUmVuZGVyZXJcbiAgfSk7XG4gIHN0YXRpYyBTaW1wbGVDaGFuZ2UgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgIHtuYW1lOiAnU2ltcGxlQ2hhbmdlJywgbW9kdWxlVXJsOiBDRF9NT0RVTEVfVVJMLCBydW50aW1lOiBpbXBTaW1wbGVDaGFuZ2V9KTtcbiAgc3RhdGljIHVuaW5pdGlhbGl6ZWQgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgIHtuYW1lOiAndW5pbml0aWFsaXplZCcsIG1vZHVsZVVybDogQ0RfTU9EVUxFX1VSTCwgcnVudGltZTogaW1wVW5pbml0aWFsaXplZH0pO1xuICBzdGF0aWMgQ2hhbmdlRGV0ZWN0b3JTdGF0ZSA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAge25hbWU6ICdDaGFuZ2VEZXRlY3RvclN0YXRlJywgbW9kdWxlVXJsOiBDRF9NT0RVTEVfVVJMLCBydW50aW1lOiBpbXBDaGFuZ2VEZXRlY3RvclN0YXRlfSk7XG4gIHN0YXRpYyBjaGVja0JpbmRpbmcgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgIHtuYW1lOiAnY2hlY2tCaW5kaW5nJywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IGltcENoZWNrQmluZGluZ30pO1xuICBzdGF0aWMgZmxhdHRlbk5lc3RlZFZpZXdSZW5kZXJOb2RlcyA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKHtcbiAgICBuYW1lOiAnZmxhdHRlbk5lc3RlZFZpZXdSZW5kZXJOb2RlcycsXG4gICAgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsXG4gICAgcnVudGltZTogaW1wRmxhdHRlbk5lc3RlZFZpZXdSZW5kZXJOb2Rlc1xuICB9KTtcbiAgc3RhdGljIGRldk1vZGVFcXVhbCA9IG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAge25hbWU6ICdkZXZNb2RlRXF1YWwnLCBtb2R1bGVVcmw6IENEX01PRFVMRV9VUkwsIHJ1bnRpbWU6IGltcERldk1vZGVFcXVhbH0pO1xuICBzdGF0aWMgaW50ZXJwb2xhdGUgPSBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YShcbiAgICAgIHtuYW1lOiAnaW50ZXJwb2xhdGUnLCBtb2R1bGVVcmw6IFZJRVdfVVRJTFNfTU9EVUxFX1VSTCwgcnVudGltZTogaW1wSW50ZXJwb2xhdGV9KTtcbiAgc3RhdGljIGNhc3RCeVZhbHVlID0gbmV3IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEoXG4gICAgICB7bmFtZTogJ2Nhc3RCeVZhbHVlJywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IGltcENhc3RCeVZhbHVlfSk7XG4gIHN0YXRpYyBwdXJlUHJveGllcyA9IFtcbiAgICBudWxsLFxuICAgIG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAgICB7bmFtZTogJ3B1cmVQcm94eTEnLCBtb2R1bGVVcmw6IFZJRVdfVVRJTFNfTU9EVUxFX1VSTCwgcnVudGltZTogcHVyZVByb3h5MX0pLFxuICAgIG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAgICB7bmFtZTogJ3B1cmVQcm94eTInLCBtb2R1bGVVcmw6IFZJRVdfVVRJTFNfTU9EVUxFX1VSTCwgcnVudGltZTogcHVyZVByb3h5Mn0pLFxuICAgIG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAgICB7bmFtZTogJ3B1cmVQcm94eTMnLCBtb2R1bGVVcmw6IFZJRVdfVVRJTFNfTU9EVUxFX1VSTCwgcnVudGltZTogcHVyZVByb3h5M30pLFxuICAgIG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAgICB7bmFtZTogJ3B1cmVQcm94eTQnLCBtb2R1bGVVcmw6IFZJRVdfVVRJTFNfTU9EVUxFX1VSTCwgcnVudGltZTogcHVyZVByb3h5NH0pLFxuICAgIG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAgICB7bmFtZTogJ3B1cmVQcm94eTUnLCBtb2R1bGVVcmw6IFZJRVdfVVRJTFNfTU9EVUxFX1VSTCwgcnVudGltZTogcHVyZVByb3h5NX0pLFxuICAgIG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAgICB7bmFtZTogJ3B1cmVQcm94eTYnLCBtb2R1bGVVcmw6IFZJRVdfVVRJTFNfTU9EVUxFX1VSTCwgcnVudGltZTogcHVyZVByb3h5Nn0pLFxuICAgIG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAgICB7bmFtZTogJ3B1cmVQcm94eTcnLCBtb2R1bGVVcmw6IFZJRVdfVVRJTFNfTU9EVUxFX1VSTCwgcnVudGltZTogcHVyZVByb3h5N30pLFxuICAgIG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAgICB7bmFtZTogJ3B1cmVQcm94eTgnLCBtb2R1bGVVcmw6IFZJRVdfVVRJTFNfTU9EVUxFX1VSTCwgcnVudGltZTogcHVyZVByb3h5OH0pLFxuICAgIG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAgICB7bmFtZTogJ3B1cmVQcm94eTknLCBtb2R1bGVVcmw6IFZJRVdfVVRJTFNfTU9EVUxFX1VSTCwgcnVudGltZTogcHVyZVByb3h5OX0pLFxuICAgIG5ldyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhKFxuICAgICAgICB7bmFtZTogJ3B1cmVQcm94eTEwJywgbW9kdWxlVXJsOiBWSUVXX1VUSUxTX01PRFVMRV9VUkwsIHJ1bnRpbWU6IHB1cmVQcm94eTEwfSksXG4gIF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGlmaWVyVG9rZW4oaWRlbnRpZmllcjogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSk6IENvbXBpbGVUb2tlbk1ldGFkYXRhIHtcbiAgcmV0dXJuIG5ldyBDb21waWxlVG9rZW5NZXRhZGF0YSh7aWRlbnRpZmllcjogaWRlbnRpZmllcn0pO1xufVxuIl19