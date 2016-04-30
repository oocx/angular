import { RouteSegment, Tree, TreeNode, rootNode } from './segments';
import { RoutesMetadata } from './metadata/metadata';
import { isBlank, isPresent, stringify } from 'angular2/src/facade/lang';
import { ListWrapper, StringMapWrapper } from 'angular2/src/facade/collection';
import { PromiseWrapper } from 'angular2/src/facade/promise';
import { BaseException } from 'angular2/src/facade/exceptions';
import { DEFAULT_OUTLET_NAME } from './constants';
import { reflector } from 'angular2/src/core/reflection/reflection';
export function recognize(componentResolver, type, url) {
    let matched = new _MatchResult(type, [url.root], null, rootNode(url).children, []);
    return _constructSegment(componentResolver, matched)
        .then(roots => new Tree(roots[0]));
}
function _recognize(componentResolver, parentType, url) {
    let metadata = _readMetadata(parentType); // should read from the factory instead
    if (isBlank(metadata)) {
        throw new BaseException(`Component '${stringify(parentType)}' does not have route configuration`);
    }
    let match;
    try {
        match = _match(metadata, url);
    }
    catch (e) {
        return PromiseWrapper.reject(e, null);
    }
    let main = _constructSegment(componentResolver, match);
    let aux = _recognizeMany(componentResolver, parentType, match.aux).then(_checkOutletNameUniqueness);
    return PromiseWrapper.all([main, aux]).then(ListWrapper.flatten);
}
function _recognizeMany(componentResolver, parentType, urls) {
    let recognized = urls.map(u => _recognize(componentResolver, parentType, u));
    return PromiseWrapper.all(recognized).then(ListWrapper.flatten);
}
function _constructSegment(componentResolver, matched) {
    return componentResolver.resolveComponent(matched.component)
        .then(factory => {
        let urlOutlet = matched.consumedUrlSegments[0].outlet;
        let segment = new RouteSegment(matched.consumedUrlSegments, matched.parameters, isBlank(urlOutlet) ? DEFAULT_OUTLET_NAME : urlOutlet, matched.component, factory);
        if (matched.leftOverUrl.length > 0) {
            return _recognizeMany(componentResolver, matched.component, matched.leftOverUrl)
                .then(children => [new TreeNode(segment, children)]);
        }
        else {
            return _recognizeLeftOvers(componentResolver, matched.component)
                .then(children => [new TreeNode(segment, children)]);
        }
    });
}
function _recognizeLeftOvers(componentResolver, parentType) {
    return componentResolver.resolveComponent(parentType)
        .then(factory => {
        let metadata = _readMetadata(parentType);
        if (isBlank(metadata)) {
            return [];
        }
        let r = metadata.routes.filter(r => r.path == "" || r.path == "/");
        if (r.length === 0) {
            return PromiseWrapper.resolve([]);
        }
        else {
            return _recognizeLeftOvers(componentResolver, r[0].component)
                .then(children => {
                return componentResolver.resolveComponent(r[0].component)
                    .then(factory => {
                    let segment = new RouteSegment([], null, DEFAULT_OUTLET_NAME, r[0].component, factory);
                    return [new TreeNode(segment, children)];
                });
            });
        }
    });
}
function _match(metadata, url) {
    for (let r of metadata.routes) {
        let matchingResult = _matchWithParts(r, url);
        if (isPresent(matchingResult)) {
            return matchingResult;
        }
    }
    let availableRoutes = metadata.routes.map(r => `'${r.path}'`).join(", ");
    throw new BaseException(`Cannot match any routes. Current segment: '${url.value}'. Available routes: [${availableRoutes}].`);
}
function _matchWithParts(route, url) {
    let path = route.path.startsWith("/") ? route.path.substring(1) : route.path;
    let parts = path.split("/");
    let positionalParams = {};
    let consumedUrlSegments = [];
    let lastParent = null;
    let lastSegment = null;
    let current = url;
    for (let i = 0; i < parts.length; ++i) {
        if (isBlank(current))
            return null;
        let p = parts[i];
        let isLastSegment = i === parts.length - 1;
        let isLastParent = i === parts.length - 2;
        let isPosParam = p.startsWith(":");
        if (!isPosParam && p != current.value.segment)
            return null;
        if (isLastSegment) {
            lastSegment = current;
        }
        if (isLastParent) {
            lastParent = current;
        }
        if (isPosParam) {
            positionalParams[p.substring(1)] = current.value.segment;
        }
        consumedUrlSegments.push(current.value);
        current = ListWrapper.first(current.children);
    }
    if (isPresent(current) && isBlank(current.value.segment)) {
        lastParent = lastSegment;
        lastSegment = current;
    }
    let p = lastSegment.value.parameters;
    let parameters = StringMapWrapper.merge(isBlank(p) ? {} : p, positionalParams);
    let axuUrlSubtrees = isPresent(lastParent) ? lastParent.children.slice(1) : [];
    return new _MatchResult(route.component, consumedUrlSegments, parameters, lastSegment.children, axuUrlSubtrees);
}
function _checkOutletNameUniqueness(nodes) {
    let names = {};
    nodes.forEach(n => {
        let segmentWithSameOutletName = names[n.value.outlet];
        if (isPresent(segmentWithSameOutletName)) {
            let p = segmentWithSameOutletName.stringifiedUrlSegments;
            let c = n.value.stringifiedUrlSegments;
            throw new BaseException(`Two segments cannot have the same outlet name: '${p}' and '${c}'.`);
        }
        names[n.value.outlet] = n.value;
    });
    return nodes;
}
class _MatchResult {
    constructor(component, consumedUrlSegments, parameters, leftOverUrl, aux) {
        this.component = component;
        this.consumedUrlSegments = consumedUrlSegments;
        this.parameters = parameters;
        this.leftOverUrl = leftOverUrl;
        this.aux = aux;
    }
}
function _readMetadata(componentType) {
    let metadata = reflector.annotations(componentType).filter(f => f instanceof RoutesMetadata);
    return ListWrapper.first(metadata);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb2duaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1KZVQ4dXpvOC50bXAvYW5ndWxhcjIvc3JjL2FsdF9yb3V0ZXIvcmVjb2duaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsWUFBWSxFQUFjLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sWUFBWTtPQUN0RSxFQUFDLGNBQWMsRUFBZ0IsTUFBTSxxQkFBcUI7T0FDMUQsRUFBTyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLDBCQUEwQjtPQUNyRSxFQUFDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGdDQUFnQztPQUNyRSxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QjtPQUNuRCxFQUFDLGFBQWEsRUFBQyxNQUFNLGdDQUFnQztPQUVyRCxFQUFDLG1CQUFtQixFQUFDLE1BQU0sYUFBYTtPQUN4QyxFQUFDLFNBQVMsRUFBQyxNQUFNLHlDQUF5QztBQUVqRSwwQkFBMEIsaUJBQW9DLEVBQUUsSUFBVSxFQUNoRCxHQUFxQjtJQUM3QyxJQUFJLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkYsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQztTQUMvQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFlLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUVELG9CQUFvQixpQkFBb0MsRUFBRSxVQUFnQixFQUN0RCxHQUF5QjtJQUMzQyxJQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMs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QUssQ0FBQztBQUNmLENBQUM7QUFFRDtJQUNFLFlBQW1CLFNBQWUsRUFBUyxtQkFBaUMsRUFDekQsVUFBbUMsRUFDbkMsV0FBbUMsRUFBUyxHQUEyQjtRQUZ2RSxjQUFTLEdBQVQsU0FBUyxDQUFNO1FBQVMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFjO1FBQ3pELGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLGdCQUFXLEdBQVgsV0FBVyxDQUF3QjtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQXdCO0lBQUcsQ0FBQztBQUNoRyxDQUFDO0FBRUQsdUJBQXVCLGFBQW1CO0lBQ3hDLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksY0FBYyxDQUFDLENBQUM7SUFDN0YsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Um91dGVTZWdtZW50LCBVcmxTZWdtZW50LCBUcmVlLCBUcmVlTm9kZSwgcm9vdE5vZGV9IGZyb20gJy4vc2VnbWVudHMnO1xuaW1wb3J0IHtSb3V0ZXNNZXRhZGF0YSwgUm91dGVNZXRhZGF0YX0gZnJvbSAnLi9tZXRhZGF0YS9tZXRhZGF0YSc7XG5pbXBvcnQge1R5cGUsIGlzQmxhbmssIGlzUHJlc2VudCwgc3RyaW5naWZ5fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgU3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvcHJvbWlzZSc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0NvbXBvbmVudFJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7REVGQVVMVF9PVVRMRVRfTkFNRX0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNvZ25pemUoY29tcG9uZW50UmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLCB0eXBlOiBUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFRyZWU8VXJsU2VnbWVudD4pOiBQcm9taXNlPFRyZWU8Um91dGVTZWdtZW50Pj4ge1xuICBsZXQgbWF0Y2hlZCA9IG5ldyBfTWF0Y2hSZXN1bHQodHlwZSwgW3VybC5yb290XSwgbnVsbCwgcm9vdE5vZGUodXJsKS5jaGlsZHJlbiwgW10pO1xuICByZXR1cm4gX2NvbnN0cnVjdFNlZ21lbnQoY29tcG9uZW50UmVzb2x2ZXIsIG1hdGNoZWQpXG4gICAgICAudGhlbihyb290cyA9PiBuZXcgVHJlZTxSb3V0ZVNlZ21lbnQ+KHJvb3RzWzBdKSk7XG59XG5cbmZ1bmN0aW9uIF9yZWNvZ25pemUoY29tcG9uZW50UmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLCBwYXJlbnRUeXBlOiBUeXBlLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IFRyZWVOb2RlPFVybFNlZ21lbnQ+KTogUHJvbWlzZTxUcmVlTm9kZTxSb3V0ZVNlZ21lbnQ+W10+IHtcbiAgbGV0IG1ldGFkYXRhID0gX3JlYWRNZXRhZGF0YShwYXJlbnRUeXBlKTsgIC8vIHNob3VsZCByZWFkIGZyb20gdGhlIGZhY3RvcnkgaW5zdGVhZFxuICBpZiAoaXNCbGFuayhtZXRhZGF0YSkpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgYENvbXBvbmVudCAnJHtzdHJpbmdpZnkocGFyZW50VHlwZSl9JyBkb2VzIG5vdCBoYXZlIHJvdXRlIGNvbmZpZ3VyYXRpb25gKTtcbiAgfVxuXG4gIGxldCBtYXRjaDtcbiAgdHJ5IHtcbiAgICBtYXRjaCA9IF9tYXRjaChtZXRhZGF0YSwgdXJsKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5yZWplY3QoZSwgbnVsbCk7XG4gIH1cblxuICBsZXQgbWFpbiA9IF9jb25zdHJ1Y3RTZWdtZW50KGNvbXBvbmVudFJlc29sdmVyLCBtYXRjaCk7XG4gIGxldCBhdXggPVxuICAgICAgX3JlY29nbml6ZU1hbnkoY29tcG9uZW50UmVzb2x2ZXIsIHBhcmVudFR5cGUsIG1hdGNoLmF1eCkudGhlbihfY2hlY2tPdXRsZXROYW1lVW5pcXVlbmVzcyk7XG4gIHJldHVybiBQcm9taXNlV3JhcHBlci5hbGwoW21haW4sIGF1eF0pLnRoZW4oTGlzdFdyYXBwZXIuZmxhdHRlbik7XG59XG5cbmZ1bmN0aW9uIF9yZWNvZ25pemVNYW55KGNvbXBvbmVudFJlc29sdmVyOiBDb21wb25lbnRSZXNvbHZlciwgcGFyZW50VHlwZTogVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybHM6IFRyZWVOb2RlPFVybFNlZ21lbnQ+W10pOiBQcm9taXNlPFRyZWVOb2RlPFJvdXRlU2VnbWVudD5bXT4ge1xuICBsZXQgcmVjb2duaXplZCA9IHVybHMubWFwKHUgPT4gX3JlY29nbml6ZShjb21wb25lbnRSZXNvbHZlciwgcGFyZW50VHlwZSwgdSkpO1xuICByZXR1cm4gUHJvbWlzZVdyYXBwZXIuYWxsKHJlY29nbml6ZWQpLnRoZW4oTGlzdFdyYXBwZXIuZmxhdHRlbik7XG59XG5cbmZ1bmN0aW9uIF9jb25zdHJ1Y3RTZWdtZW50KGNvbXBvbmVudFJlc29sdmVyOiBDb21wb25lbnRSZXNvbHZlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWQ6IF9NYXRjaFJlc3VsdCk6IFByb21pc2U8VHJlZU5vZGU8Um91dGVTZWdtZW50PltdPiB7XG4gIHJldHVybiBjb21wb25lbnRSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50KG1hdGNoZWQuY29tcG9uZW50KVxuICAgICAgLnRoZW4oZmFjdG9yeSA9PiB7XG4gICAgICAgIGxldCB1cmxPdXRsZXQgPSBtYXRjaGVkLmNvbnN1bWVkVXJsU2VnbWVudHNbMF0ub3V0bGV0O1xuICAgICAgICBsZXQgc2VnbWVudCA9IG5ldyBSb3V0ZVNlZ21lbnQobWF0Y2hlZC5jb25zdW1lZFVybFNlZ21lbnRzLCBtYXRjaGVkLnBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0JsYW5rKHVybE91dGxldCkgPyBERUZBVUxUX09VVExFVF9OQU1FIDogdXJsT3V0bGV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZC5jb21wb25lbnQsIGZhY3RvcnkpO1xuXG4gICAgICAgIGlmIChtYXRjaGVkLmxlZnRPdmVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gX3JlY29nbml6ZU1hbnkoY29tcG9uZW50UmVzb2x2ZXIsIG1hdGNoZWQuY29tcG9uZW50LCBtYXRjaGVkLmxlZnRPdmVyVXJsKVxuICAgICAgICAgICAgICAudGhlbihjaGlsZHJlbiA9PiBbbmV3IFRyZWVOb2RlPFJvdXRlU2VnbWVudD4oc2VnbWVudCwgY2hpbGRyZW4pXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF9yZWNvZ25pemVMZWZ0T3ZlcnMoY29tcG9uZW50UmVzb2x2ZXIsIG1hdGNoZWQuY29tcG9uZW50KVxuICAgICAgICAgICAgICAudGhlbihjaGlsZHJlbiA9PiBbbmV3IFRyZWVOb2RlPFJvdXRlU2VnbWVudD4oc2VnbWVudCwgY2hpbGRyZW4pXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfcmVjb2duaXplTGVmdE92ZXJzKGNvbXBvbmVudFJlc29sdmVyOiBDb21wb25lbnRSZXNvbHZlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50VHlwZTogVHlwZSk6IFByb21pc2U8VHJlZU5vZGU8Um91dGVTZWdtZW50PltdPiB7XG4gIHJldHVybiBjb21wb25lbnRSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50KHBhcmVudFR5cGUpXG4gICAgICAudGhlbihmYWN0b3J5ID0+IHtcbiAgICAgICAgbGV0IG1ldGFkYXRhID0gX3JlYWRNZXRhZGF0YShwYXJlbnRUeXBlKTtcbiAgICAgICAgaWYgKGlzQmxhbmsobWV0YWRhdGEpKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHIgPSAoPGFueVtdPm1ldGFkYXRhLnJvdXRlcykuZmlsdGVyKHIgPT4gci5wYXRoID09IFwiXCIgfHwgci5wYXRoID09IFwiL1wiKTtcbiAgICAgICAgaWYgKHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnJlc29sdmUoW10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfcmVjb2duaXplTGVmdE92ZXJzKGNvbXBvbmVudFJlc29sdmVyLCByWzBdLmNvbXBvbmVudClcbiAgICAgICAgICAgICAgLnRoZW4oY2hpbGRyZW4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50KHJbMF0uY29tcG9uZW50KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmYWN0b3J5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VnbWVudCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSb3V0ZVNlZ21lbnQoW10sIG51bGwsIERFRkFVTFRfT1VUTEVUX05BTUUsIHJbMF0uY29tcG9uZW50LCBmYWN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW25ldyBUcmVlTm9kZTxSb3V0ZVNlZ21lbnQ+KHNlZ21lbnQsIGNoaWxkcmVuKV07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9tYXRjaChtZXRhZGF0YTogUm91dGVzTWV0YWRhdGEsIHVybDogVHJlZU5vZGU8VXJsU2VnbWVudD4pOiBfTWF0Y2hSZXN1bHQge1xuICBmb3IgKGxldCByIG9mIG1ldGFkYXRhLnJvdXRlcykge1xuICAgIGxldCBtYXRjaGluZ1Jlc3VsdCA9IF9tYXRjaFdpdGhQYXJ0cyhyLCB1cmwpO1xuICAgIGlmIChpc1ByZXNlbnQobWF0Y2hpbmdSZXN1bHQpKSB7XG4gICAgICByZXR1cm4gbWF0Y2hpbmdSZXN1bHQ7XG4gICAgfVxuICB9XG4gIGxldCBhdmFpbGFibGVSb3V0ZXMgPSBtZXRhZGF0YS5yb3V0ZXMubWFwKHIgPT4gYCcke3IucGF0aH0nYCkuam9pbihcIiwgXCIpO1xuICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgIGBDYW5ub3QgbWF0Y2ggYW55IHJvdXRlcy4gQ3VycmVudCBzZWdtZW50OiAnJHt1cmwudmFsdWV9Jy4gQXZhaWxhYmxlIHJvdXRlczogWyR7YXZhaWxhYmxlUm91dGVzfV0uYCk7XG59XG5cbmZ1bmN0aW9uIF9tYXRjaFdpdGhQYXJ0cyhyb3V0ZTogUm91dGVNZXRhZGF0YSwgdXJsOiBUcmVlTm9kZTxVcmxTZWdtZW50Pik6IF9NYXRjaFJlc3VsdCB7XG4gIGxldCBwYXRoID0gcm91dGUucGF0aC5zdGFydHNXaXRoKFwiL1wiKSA/IHJvdXRlLnBhdGguc3Vic3RyaW5nKDEpIDogcm91dGUucGF0aDtcbiAgbGV0IHBhcnRzID0gcGF0aC5zcGxpdChcIi9cIik7XG4gIGxldCBwb3NpdGlvbmFsUGFyYW1zID0ge307XG4gIGxldCBjb25zdW1lZFVybFNlZ21lbnRzID0gW107XG5cbiAgbGV0IGxhc3RQYXJlbnQ6IFRyZWVOb2RlPFVybFNlZ21lbnQ+ID0gbnVsbDtcbiAgbGV0IGxhc3RTZWdtZW50OiBUcmVlTm9kZTxVcmxTZWdtZW50PiA9IG51bGw7XG5cbiAgbGV0IGN1cnJlbnQgPSB1cmw7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoaXNCbGFuayhjdXJyZW50KSkgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgcCA9IHBhcnRzW2ldO1xuICAgIGxldCBpc0xhc3RTZWdtZW50ID0gaSA9PT0gcGFydHMubGVuZ3RoIC0gMTtcbiAgICBsZXQgaXNMYXN0UGFyZW50ID0gaSA9PT0gcGFydHMubGVuZ3RoIC0gMjtcbiAgICBsZXQgaXNQb3NQYXJhbSA9IHAuc3RhcnRzV2l0aChcIjpcIik7XG5cbiAgICBpZiAoIWlzUG9zUGFyYW0gJiYgcCAhPSBjdXJyZW50LnZhbHVlLnNlZ21lbnQpIHJldHVybiBudWxsO1xuICAgIGlmIChpc0xhc3RTZWdtZW50KSB7XG4gICAgICBsYXN0U2VnbWVudCA9IGN1cnJlbnQ7XG4gICAgfVxuICAgIGlmIChpc0xhc3RQYXJlbnQpIHtcbiAgICAgIGxhc3RQYXJlbnQgPSBjdXJyZW50O1xuICAgIH1cblxuICAgIGlmIChpc1Bvc1BhcmFtKSB7XG4gICAgICBwb3NpdGlvbmFsUGFyYW1zW3Auc3Vic3RyaW5nKDEpXSA9IGN1cnJlbnQudmFsdWUuc2VnbWVudDtcbiAgICB9XG5cbiAgICBjb25zdW1lZFVybFNlZ21lbnRzLnB1c2goY3VycmVudC52YWx1ZSk7XG5cbiAgICBjdXJyZW50ID0gTGlzdFdyYXBwZXIuZmlyc3QoY3VycmVudC5jaGlsZHJlbik7XG4gIH1cblxuICBpZiAoaXNQcmVzZW50KGN1cnJlbnQpICYmIGlzQmxhbmsoY3VycmVudC52YWx1ZS5zZWdtZW50KSkge1xuICAgIGxhc3RQYXJlbnQgPSBsYXN0U2VnbWVudDtcbiAgICBsYXN0U2VnbWVudCA9IGN1cnJlbnQ7XG4gIH1cblxuICBsZXQgcCA9IGxhc3RTZWdtZW50LnZhbHVlLnBhcmFtZXRlcnM7XG4gIGxldCBwYXJhbWV0ZXJzID1cbiAgICAgIDx7W2tleTogc3RyaW5nXTogc3RyaW5nfT5TdHJpbmdNYXBXcmFwcGVyLm1lcmdlKGlzQmxhbmsocCkgPyB7fSA6IHAsIHBvc2l0aW9uYWxQYXJhbXMpO1xuICBsZXQgYXh1VXJsU3VidHJlZXMgPSBpc1ByZXNlbnQobGFzdFBhcmVudCkgPyBsYXN0UGFyZW50LmNoaWxkcmVuLnNsaWNlKDEpIDogW107XG5cbiAgcmV0dXJuIG5ldyBfTWF0Y2hSZXN1bHQocm91dGUuY29tcG9uZW50LCBjb25zdW1lZFVybFNlZ21lbnRzLCBwYXJhbWV0ZXJzLCBsYXN0U2VnbWVudC5jaGlsZHJlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXh1VXJsU3VidHJlZXMpO1xufVxuXG5mdW5jdGlvbiBfY2hlY2tPdXRsZXROYW1lVW5pcXVlbmVzcyhub2RlczogVHJlZU5vZGU8Um91dGVTZWdtZW50PltdKTogVHJlZU5vZGU8Um91dGVTZWdtZW50PltdIHtcbiAgbGV0IG5hbWVzID0ge307XG4gIG5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgbGV0IHNlZ21lbnRXaXRoU2FtZU91dGxldE5hbWUgPSBuYW1lc1tuLnZhbHVlLm91dGxldF07XG4gICAgaWYgKGlzUHJlc2VudChzZWdtZW50V2l0aFNhbWVPdXRsZXROYW1lKSkge1xuICAgICAgbGV0IHAgPSBzZWdtZW50V2l0aFNhbWVPdXRsZXROYW1lLnN0cmluZ2lmaWVkVXJsU2VnbWVudHM7XG4gICAgICBsZXQgYyA9IG4udmFsdWUuc3RyaW5naWZpZWRVcmxTZWdtZW50cztcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBUd28gc2VnbWVudHMgY2Fubm90IGhhdmUgdGhlIHNhbWUgb3V0bGV0IG5hbWU6ICcke3B9JyBhbmQgJyR7Y30nLmApO1xuICAgIH1cbiAgICBuYW1lc1tuLnZhbHVlLm91dGxldF0gPSBuLnZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIG5vZGVzO1xufVxuXG5jbGFzcyBfTWF0Y2hSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50OiBUeXBlLCBwdWJsaWMgY29uc3VtZWRVcmxTZWdtZW50czogVXJsU2VnbWVudFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgcGFyYW1ldGVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgICAgICAgICAgIHB1YmxpYyBsZWZ0T3ZlclVybDogVHJlZU5vZGU8VXJsU2VnbWVudD5bXSwgcHVibGljIGF1eDogVHJlZU5vZGU8VXJsU2VnbWVudD5bXSkge31cbn1cblxuZnVuY3Rpb24gX3JlYWRNZXRhZGF0YShjb21wb25lbnRUeXBlOiBUeXBlKSB7XG4gIGxldCBtZXRhZGF0YSA9IHJlZmxlY3Rvci5hbm5vdGF0aW9ucyhjb21wb25lbnRUeXBlKS5maWx0ZXIoZiA9PiBmIGluc3RhbmNlb2YgUm91dGVzTWV0YWRhdGEpO1xuICByZXR1cm4gTGlzdFdyYXBwZXIuZmlyc3QobWV0YWRhdGEpO1xufSJdfQ==