'use strict';"use strict";
var async_1 = require('angular2/src/facade/async');
var Rectangle = (function () {
    function Rectangle(left, top, width, height) {
        this.left = left;
        this.right = left + width;
        this.top = top;
        this.bottom = top + height;
        this.height = height;
        this.width = width;
    }
    return Rectangle;
}());
exports.Rectangle = Rectangle;
var Ruler = (function () {
    function Ruler(domAdapter) {
        this.domAdapter = domAdapter;
    }
    Ruler.prototype.measure = function (el) {
        var clntRect = this.domAdapter.getBoundingClientRect(el.nativeElement);
        // even if getBoundingClientRect is synchronous we use async API in preparation for further
        // changes
        return async_1.PromiseWrapper.resolve(new Rectangle(clntRect.left, clntRect.top, clntRect.width, clntRect.height));
    };
    return Ruler;
}());
exports.Ruler = Ruler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLWhnQ1BmQnZQLnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci9ydWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQTZCLDJCQUEyQixDQUFDLENBQUE7QUFJekQ7SUFPRSxtQkFBWSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQWZZLGlCQUFTLFlBZXJCLENBQUE7QUFFRDtJQUVFLGVBQVksVUFBc0I7UUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUFDLENBQUM7SUFFckUsdUJBQU8sR0FBUCxVQUFRLEVBQWM7UUFDcEIsSUFBSSxRQUFRLEdBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFNUUsMkZBQTJGO1FBQzNGLFVBQVU7UUFDVixNQUFNLENBQUMsc0JBQWMsQ0FBQyxPQUFPLENBQ3pCLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFDSCxZQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSxhQUFLLFFBWWpCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7RG9tQWRhcHRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50X3JlZic7XG5cbmV4cG9ydCBjbGFzcyBSZWN0YW5nbGUge1xuICBsZWZ0O1xuICByaWdodDtcbiAgdG9wO1xuICBib3R0b207XG4gIGhlaWdodDtcbiAgd2lkdGg7XG4gIGNvbnN0cnVjdG9yKGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IGxlZnQgKyB3aWR0aDtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IHRvcCArIGhlaWdodDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJ1bGVyIHtcbiAgZG9tQWRhcHRlcjogRG9tQWRhcHRlcjtcbiAgY29uc3RydWN0b3IoZG9tQWRhcHRlcjogRG9tQWRhcHRlcikgeyB0aGlzLmRvbUFkYXB0ZXIgPSBkb21BZGFwdGVyOyB9XG5cbiAgbWVhc3VyZShlbDogRWxlbWVudFJlZik6IFByb21pc2U8UmVjdGFuZ2xlPiB7XG4gICAgdmFyIGNsbnRSZWN0ID0gPGFueT50aGlzLmRvbUFkYXB0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgLy8gZXZlbiBpZiBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaXMgc3luY2hyb25vdXMgd2UgdXNlIGFzeW5jIEFQSSBpbiBwcmVwYXJhdGlvbiBmb3IgZnVydGhlclxuICAgIC8vIGNoYW5nZXNcbiAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZShcbiAgICAgICAgbmV3IFJlY3RhbmdsZShjbG50UmVjdC5sZWZ0LCBjbG50UmVjdC50b3AsIGNsbnRSZWN0LndpZHRoLCBjbG50UmVjdC5oZWlnaHQpKTtcbiAgfVxufVxuIl19