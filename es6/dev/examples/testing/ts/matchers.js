import { expect } from 'angular2/testing';
var value;
var element;
var exception;
class OtherClass {
}
class SomeClass {
}
// #docregion toBePromise
expect(value).toBePromise();
// #enddocregion
// #docregion toBeAnInstanceOf
expect(value).toBeAnInstanceOf(SomeClass);
// #enddocregion
// #docregion toHaveText
expect(element).toHaveText('Hello world!');
// #enddocregion
// #docregion toHaveCssClass
expect(element).toHaveCssClass('current');
// #enddocregion
// #docregion toHaveCssStyle
expect(element).toHaveCssStyle({ width: '100px', height: 'auto' });
// #enddocregion
// #docregion toContainError
expect(exception).toContainError('Failed to load');
// #enddocregion
// #docregion toThrowErrorWith
expect(() => { throw 'Failed to load'; }).toThrowErrorWith('Failed to load');
// #enddocregion
// #docregion toImplement
expect(SomeClass).toImplement(OtherClass);
// #enddocregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTRGT1lUUnFDLnRtcC9hbmd1bGFyMi9leGFtcGxlcy90ZXN0aW5nL3RzL21hdGNoZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sa0JBQWtCO0FBRXZDLElBQUksS0FBVSxDQUFDO0FBQ2YsSUFBSSxPQUFZLENBQUM7QUFDakIsSUFBSSxTQUFjLENBQUM7QUFFbkI7QUFBMkIsQ0FBQztBQUM1QjtBQUFpQixDQUFDO0FBRWxCLHlCQUF5QjtBQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDNUIsZ0JBQWdCO0FBRWhCLDhCQUE4QjtBQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDMUMsZ0JBQWdCO0FBRWhCLHdCQUF3QjtBQUN4QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzNDLGdCQUFnQjtBQUVoQiw0QkFBNEI7QUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxQyxnQkFBZ0I7QUFFaEIsNEJBQTRCO0FBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO0FBQ2pFLGdCQUFnQjtBQUVoQiw0QkFBNEI7QUFDNUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ25ELGdCQUFnQjtBQUVoQiw4QkFBOEI7QUFDOUIsTUFBTSxDQUFDLFFBQVEsTUFBTSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDN0UsZ0JBQWdCO0FBRWhCLHlCQUF5QjtBQUN6QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZXhwZWN0fSBmcm9tICdhbmd1bGFyMi90ZXN0aW5nJztcblxudmFyIHZhbHVlOiBhbnk7XG52YXIgZWxlbWVudDogYW55O1xudmFyIGV4Y2VwdGlvbjogYW55O1xuXG5hYnN0cmFjdCBjbGFzcyBPdGhlckNsYXNzIHt9XG5jbGFzcyBTb21lQ2xhc3Mge31cblxuLy8gI2RvY3JlZ2lvbiB0b0JlUHJvbWlzZVxuZXhwZWN0KHZhbHVlKS50b0JlUHJvbWlzZSgpO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIHRvQmVBbkluc3RhbmNlT2ZcbmV4cGVjdCh2YWx1ZSkudG9CZUFuSW5zdGFuY2VPZihTb21lQ2xhc3MpO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIHRvSGF2ZVRleHRcbmV4cGVjdChlbGVtZW50KS50b0hhdmVUZXh0KCdIZWxsbyB3b3JsZCEnKTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiB0b0hhdmVDc3NDbGFzc1xuZXhwZWN0KGVsZW1lbnQpLnRvSGF2ZUNzc0NsYXNzKCdjdXJyZW50Jyk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gdG9IYXZlQ3NzU3R5bGVcbmV4cGVjdChlbGVtZW50KS50b0hhdmVDc3NTdHlsZSh7d2lkdGg6ICcxMDBweCcsIGhlaWdodDogJ2F1dG8nfSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gdG9Db250YWluRXJyb3JcbmV4cGVjdChleGNlcHRpb24pLnRvQ29udGFpbkVycm9yKCdGYWlsZWQgdG8gbG9hZCcpO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIHRvVGhyb3dFcnJvcldpdGhcbmV4cGVjdCgoKSA9PiB7IHRocm93ICdGYWlsZWQgdG8gbG9hZCc7IH0pLnRvVGhyb3dFcnJvcldpdGgoJ0ZhaWxlZCB0byBsb2FkJyk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gdG9JbXBsZW1lbnRcbmV4cGVjdChTb21lQ2xhc3MpLnRvSW1wbGVtZW50KE90aGVyQ2xhc3MpO1xuLy8gI2VuZGRvY3JlZ2lvblxuIl19