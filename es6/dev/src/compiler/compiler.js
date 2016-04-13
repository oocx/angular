import { RuntimeCompiler_ } from "./runtime_compiler";
export { TemplateCompiler } from './template_compiler';
export { CompileDirectiveMetadata, CompileTypeMetadata, CompileTemplateMetadata } from './directive_metadata';
export { SourceModule, SourceWithImports } from './source_module';
export { PLATFORM_DIRECTIVES, PLATFORM_PIPES } from 'angular2/src/core/platform_directives_and_pipes';
export * from 'angular2/src/compiler/template_ast';
export { TEMPLATE_TRANSFORMS } from 'angular2/src/compiler/template_parser';
import { assertionsEnabled, CONST_EXPR } from 'angular2/src/facade/lang';
import { Provider } from 'angular2/src/core/di';
import { TemplateParser } from 'angular2/src/compiler/template_parser';
import { HtmlParser } from 'angular2/src/compiler/html_parser';
import { TemplateNormalizer } from 'angular2/src/compiler/template_normalizer';
import { RuntimeMetadataResolver } from 'angular2/src/compiler/runtime_metadata';
import { ChangeDetectionCompiler } from 'angular2/src/compiler/change_detector_compiler';
import { StyleCompiler } from 'angular2/src/compiler/style_compiler';
import { ViewCompiler } from 'angular2/src/compiler/view_compiler';
import { ProtoViewCompiler } from 'angular2/src/compiler/proto_view_compiler';
import { TemplateCompiler } from 'angular2/src/compiler/template_compiler';
import { ChangeDetectorGenConfig } from 'angular2/src/core/change_detection/change_detection';
import { Compiler } from 'angular2/src/core/linker/compiler';
import { RuntimeCompiler } from 'angular2/src/compiler/runtime_compiler';
import { ElementSchemaRegistry } from 'angular2/src/compiler/schema/element_schema_registry';
import { DomElementSchemaRegistry } from 'angular2/src/compiler/schema/dom_element_schema_registry';
import { UrlResolver, DEFAULT_PACKAGE_URL_PROVIDER } from 'angular2/src/compiler/url_resolver';
import { Parser, Lexer } from 'angular2/src/core/change_detection/change_detection';
function _createChangeDetectorGenConfig() {
    return new ChangeDetectorGenConfig(assertionsEnabled(), false, true);
}
/**
 * A set of providers that provide `RuntimeCompiler` and its dependencies to use for
 * template compilation.
 */
export const COMPILER_PROVIDERS = CONST_EXPR([
    Lexer,
    Parser,
    HtmlParser,
    TemplateParser,
    TemplateNormalizer,
    RuntimeMetadataResolver,
    DEFAULT_PACKAGE_URL_PROVIDER,
    StyleCompiler,
    ProtoViewCompiler,
    ViewCompiler,
    ChangeDetectionCompiler,
    new Provider(ChangeDetectorGenConfig, { useFactory: _createChangeDetectorGenConfig, deps: [] }),
    TemplateCompiler,
    new Provider(RuntimeCompiler, { useClass: RuntimeCompiler_ }),
    new Provider(Compiler, { useExisting: RuntimeCompiler }),
    DomElementSchemaRegistry,
    new Provider(ElementSchemaRegistry, { useExisting: DomElementSchemaRegistry }),
    UrlResolver
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTRGT1lUUnFDLnRtcC9hbmd1bGFyMi9zcmMvY29tcGlsZXIvY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9CQUFvQjtBQUNuRCxTQUFRLGdCQUFnQixRQUFPLHFCQUFxQixDQUFDO0FBQ3JELFNBQ0Usd0JBQXdCLEVBQ3hCLG1CQUFtQixFQUNuQix1QkFBdUIsUUFDbEIsc0JBQXNCLENBQUM7QUFDOUIsU0FBUSxZQUFZLEVBQUUsaUJBQWlCLFFBQU8saUJBQWlCLENBQUM7QUFDaEUsU0FBUSxtQkFBbUIsRUFBRSxjQUFjLFFBQU8saURBQWlELENBQUM7QUFDcEcsY0FBYyxvQ0FBb0MsQ0FBQztBQUNuRCxTQUFRLG1CQUFtQixRQUFPLHVDQUF1QyxDQUFDO09BQ25FLEVBQUMsaUJBQWlCLEVBQVEsVUFBVSxFQUFDLE1BQU0sMEJBQTBCO09BQ3JFLEVBQVUsUUFBUSxFQUFDLE1BQU0sc0JBQXNCO09BQy9DLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUNBQXVDO09BQzdELEVBQUMsVUFBVSxFQUFDLE1BQU0sbUNBQW1DO09BQ3JELEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwyQ0FBMkM7T0FDckUsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QztPQUN2RSxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZ0RBQWdEO09BQy9FLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0NBQXNDO09BQzNELEVBQUMsWUFBWSxFQUFDLE1BQU0scUNBQXFDO09BQ3pELEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwyQ0FBMkM7T0FDcEUsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlDQUF5QztPQUNqRSxFQUFDLHVCQUF1QixFQUFDLE1BQU0scURBQXFEO09BQ3BGLEVBQUMsUUFBUSxFQUFDLE1BQU0sbUNBQW1DO09BQ25ELEVBQUMsZUFBZSxFQUFDLE1BQU0sd0NBQXdDO09BQy9ELEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzREFBc0Q7T0FDbkYsRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDBEQUEwRDtPQUMxRixFQUFDLFdBQVcsRUFBRSw0QkFBNEIsRUFBQyxNQUFNLG9DQUFvQztPQUNyRixFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsTUFBTSxxREFBcUQ7QUFFakY7SUFDRSxNQUFNLENBQUMsSUFBSSx1QkFBdUIsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsT0FBTyxNQUFNLGtCQUFrQixHQUFtQyxVQUFVLENBQUM7SUFDM0UsS0FBSztJQUNMLE1BQU07SUFDTixVQUFVO0lBQ1YsY0FBYztJQUNkLGtCQUFrQjtJQUNsQix1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixJQUFJLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxFQUFDLFVBQVUsRUFBRSw4QkFBOEIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7SUFDN0YsZ0JBQWdCO0lBQ2hCLElBQUksUUFBUSxDQUFDLGVBQWUsRUFBRSxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDO0lBQzNELElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUMsQ0FBQztJQUN0RCx3QkFBd0I7SUFDeEIsSUFBSSxRQUFRLENBQUMscUJBQXFCLEVBQUUsRUFBQyxXQUFXLEVBQUUsd0JBQXdCLEVBQUMsQ0FBQztJQUM1RSxXQUFXO0NBQ1osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSdW50aW1lQ29tcGlsZXJffSBmcm9tIFwiLi9ydW50aW1lX2NvbXBpbGVyXCI7XG5leHBvcnQge1RlbXBsYXRlQ29tcGlsZXJ9IGZyb20gJy4vdGVtcGxhdGVfY29tcGlsZXInO1xuZXhwb3J0IHtcbiAgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICBDb21waWxlVHlwZU1ldGFkYXRhLFxuICBDb21waWxlVGVtcGxhdGVNZXRhZGF0YVxufSBmcm9tICcuL2RpcmVjdGl2ZV9tZXRhZGF0YSc7XG5leHBvcnQge1NvdXJjZU1vZHVsZSwgU291cmNlV2l0aEltcG9ydHN9IGZyb20gJy4vc291cmNlX21vZHVsZSc7XG5leHBvcnQge1BMQVRGT1JNX0RJUkVDVElWRVMsIFBMQVRGT1JNX1BJUEVTfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9wbGF0Zm9ybV9kaXJlY3RpdmVzX2FuZF9waXBlcyc7XG5leHBvcnQgKiBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdGVtcGxhdGVfYXN0JztcbmV4cG9ydCB7VEVNUExBVEVfVFJBTlNGT1JNU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX3BhcnNlcic7XG5pbXBvcnQge2Fzc2VydGlvbnNFbmFibGVkLCBUeXBlLCBDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtwcm92aWRlLCBQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtUZW1wbGF0ZVBhcnNlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX3BhcnNlcic7XG5pbXBvcnQge0h0bWxQYXJzZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9odG1sX3BhcnNlcic7XG5pbXBvcnQge1RlbXBsYXRlTm9ybWFsaXplcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX25vcm1hbGl6ZXInO1xuaW1wb3J0IHtSdW50aW1lTWV0YWRhdGFSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3J1bnRpbWVfbWV0YWRhdGEnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25Db21waWxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2NoYW5nZV9kZXRlY3Rvcl9jb21waWxlcic7XG5pbXBvcnQge1N0eWxlQ29tcGlsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zdHlsZV9jb21waWxlcic7XG5pbXBvcnQge1ZpZXdDb21waWxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3ZpZXdfY29tcGlsZXInO1xuaW1wb3J0IHtQcm90b1ZpZXdDb21waWxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3Byb3RvX3ZpZXdfY29tcGlsZXInO1xuaW1wb3J0IHtUZW1wbGF0ZUNvbXBpbGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdGVtcGxhdGVfY29tcGlsZXInO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZ30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7Q29tcGlsZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9jb21waWxlcic7XG5pbXBvcnQge1J1bnRpbWVDb21waWxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3J1bnRpbWVfY29tcGlsZXInO1xuaW1wb3J0IHtFbGVtZW50U2NoZW1hUmVnaXN0cnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zY2hlbWEvZWxlbWVudF9zY2hlbWFfcmVnaXN0cnknO1xuaW1wb3J0IHtEb21FbGVtZW50U2NoZW1hUmVnaXN0cnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zY2hlbWEvZG9tX2VsZW1lbnRfc2NoZW1hX3JlZ2lzdHJ5JztcbmltcG9ydCB7VXJsUmVzb2x2ZXIsIERFRkFVTFRfUEFDS0FHRV9VUkxfUFJPVklERVJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci91cmxfcmVzb2x2ZXInO1xuaW1wb3J0IHtQYXJzZXIsIExleGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb24nO1xuXG5mdW5jdGlvbiBfY3JlYXRlQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcoKSB7XG4gIHJldHVybiBuZXcgQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcoYXNzZXJ0aW9uc0VuYWJsZWQoKSwgZmFsc2UsIHRydWUpO1xufVxuXG4vKipcbiAqIEEgc2V0IG9mIHByb3ZpZGVycyB0aGF0IHByb3ZpZGUgYFJ1bnRpbWVDb21waWxlcmAgYW5kIGl0cyBkZXBlbmRlbmNpZXMgdG8gdXNlIGZvclxuICogdGVtcGxhdGUgY29tcGlsYXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBDT01QSUxFUl9QUk9WSURFUlM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPiA9IENPTlNUX0VYUFIoW1xuICBMZXhlcixcbiAgUGFyc2VyLFxuICBIdG1sUGFyc2VyLFxuICBUZW1wbGF0ZVBhcnNlcixcbiAgVGVtcGxhdGVOb3JtYWxpemVyLFxuICBSdW50aW1lTWV0YWRhdGFSZXNvbHZlcixcbiAgREVGQVVMVF9QQUNLQUdFX1VSTF9QUk9WSURFUixcbiAgU3R5bGVDb21waWxlcixcbiAgUHJvdG9WaWV3Q29tcGlsZXIsXG4gIFZpZXdDb21waWxlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uQ29tcGlsZXIsXG4gIG5ldyBQcm92aWRlcihDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZywge3VzZUZhY3Rvcnk6IF9jcmVhdGVDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZywgZGVwczogW119KSxcbiAgVGVtcGxhdGVDb21waWxlcixcbiAgbmV3IFByb3ZpZGVyKFJ1bnRpbWVDb21waWxlciwge3VzZUNsYXNzOiBSdW50aW1lQ29tcGlsZXJffSksXG4gIG5ldyBQcm92aWRlcihDb21waWxlciwge3VzZUV4aXN0aW5nOiBSdW50aW1lQ29tcGlsZXJ9KSxcbiAgRG9tRWxlbWVudFNjaGVtYVJlZ2lzdHJ5LFxuICBuZXcgUHJvdmlkZXIoRWxlbWVudFNjaGVtYVJlZ2lzdHJ5LCB7dXNlRXhpc3Rpbmc6IERvbUVsZW1lbnRTY2hlbWFSZWdpc3RyeX0pLFxuICBVcmxSZXNvbHZlclxuXSk7XG4iXX0=