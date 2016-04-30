export const $EOF = 0;
export const $TAB = 9;
export const $LF = 10;
export const $VTAB = 11;
export const $FF = 12;
export const $CR = 13;
export const $SPACE = 32;
export const $BANG = 33;
export const $DQ = 34;
export const $HASH = 35;
export const $$ = 36;
export const $PERCENT = 37;
export const $AMPERSAND = 38;
export const $SQ = 39;
export const $LPAREN = 40;
export const $RPAREN = 41;
export const $STAR = 42;
export const $PLUS = 43;
export const $COMMA = 44;
export const $MINUS = 45;
export const $PERIOD = 46;
export const $SLASH = 47;
export const $COLON = 58;
export const $SEMICOLON = 59;
export const $LT = 60;
export const $EQ = 61;
export const $GT = 62;
export const $QUESTION = 63;
export const $0 = 48;
export const $9 = 57;
export const $A = 65;
export const $E = 69;
export const $Z = 90;
export const $LBRACKET = 91;
export const $BACKSLASH = 92;
export const $RBRACKET = 93;
export const $CARET = 94;
export const $_ = 95;
export const $a = 97;
export const $e = 101;
export const $f = 102;
export const $n = 110;
export const $r = 114;
export const $t = 116;
export const $u = 117;
export const $v = 118;
export const $z = 122;
export const $LBRACE = 123;
export const $BAR = 124;
export const $RBRACE = 125;
export const $NBSP = 160;
export const $PIPE = 124;
export const $TILDA = 126;
export const $AT = 64;
export function isWhitespace(code) {
    return (code >= $TAB && code <= $SPACE) || (code == $NBSP);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUplVDh1em84LnRtcC9hbmd1bGFyMi9zcmMvY29tcGlsZXIvY2hhcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLElBQUksR0FBc0IsQ0FBQyxDQUFDO0FBQ3pDLE9BQU8sTUFBTSxJQUFJLEdBQXNCLENBQUMsQ0FBQztBQUN6QyxPQUFPLE1BQU0sR0FBRyxHQUFzQixFQUFFLENBQUM7QUFDekMsT0FBTyxNQUFNLEtBQUssR0FBc0IsRUFBRSxDQUFDO0FBQzNDLE9BQU8sTUFBTSxHQUFHLEdBQXNCLEVBQUUsQ0FBQztBQUN6QyxPQUFPLE1BQU0sR0FBRyxHQUFzQixFQUFFLENBQUM7QUFDekMsT0FBTyxNQUFNLE1BQU0sR0FBc0IsRUFBRSxDQUFDO0FBQzVDLE9BQU8sTUFBTSxLQUFLLEdBQXNCLEVBQUUsQ0FBQztBQUMzQyxPQUFPLE1BQU0sR0FBRyxHQUFzQixFQUFFLENBQUM7QUFDekMsT0FBTyxNQUFNLEtBQUssR0FBc0IsRUFBRSxDQUFDO0FBQzNDLE9BQU8sTUFBTSxFQUFFLEdBQXNCLEVBQUUsQ0FBQztBQUN4QyxPQUFPLE1BQU0sUUFBUSxHQUFzQixFQUFFLENBQUM7QUFDOUMsT0FBTyxNQUFNLFVBQVUsR0FBc0IsRUFBRSxDQUFDO0FBQ2hELE9BQU8sTUFBTSxHQUFHLEdBQXNCLEVBQUUsQ0FBQztBQUN6QyxPQUFPLE1BQU0sT0FBTyxHQUFzQixFQUFFLENBQUM7QUFDN0MsT0FBTyxNQUFNLE9BQU8sR0FBc0IsRUFBRSxDQUFDO0FBQzdDLE9BQU8sTUFBTSxLQUFLLEdBQXNCLEVBQUUsQ0FBQztBQUMzQyxPQUFPLE1BQU0sS0FBSyxHQUFzQixFQUFFLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0sR0FBc0IsRUFBRSxDQUFDO0FBQzVDLE9BQU8sTUFBTSxNQUFNLEdBQXNCLEVBQUUsQ0FBQztBQUM1QyxPQUFPLE1BQU0sT0FBTyxHQUFzQixFQUFFLENBQUM7QUFDN0MsT0FBTyxNQUFNLE1BQU0sR0FBc0IsRUFBRSxDQUFDO0FBQzVDLE9BQU8sTUFBTSxNQUFNLEdBQXNCLEVBQUUsQ0FBQztBQUM1QyxPQUFPLE1BQU0sVUFBVSxHQUFzQixFQUFFLENBQUM7QUFDaEQsT0FBTyxNQUFNLEdBQUcsR0FBc0IsRUFBRSxDQUFDO0FBQ3pDLE9BQU8sTUFBTSxHQUFHLEdBQXNCLEVBQUUsQ0FBQztBQUN6QyxPQUFPLE1BQU0sR0FBRyxHQUFzQixFQUFFLENBQUM7QUFDekMsT0FBTyxNQUFNLFNBQVMsR0FBc0IsRUFBRSxDQUFDO0FBRS9DLE9BQU8sTUFBTSxFQUFFLEdBQXNCLEVBQUUsQ0FBQztBQUN4QyxPQUFPLE1BQU0sRUFBRSxHQUFzQixFQUFFLENBQUM7QUFFeEMsT0FBTyxNQUFNLEVBQUUsR0FBc0IsRUFBRSxDQUFDO0FBQ3hDLE9BQU8sTUFBTSxFQUFFLEdBQXNCLEVBQUUsQ0FBQztBQUN4QyxPQUFPLE1BQU0sRUFBRSxHQUFzQixFQUFFLENBQUM7QUFFeEMsT0FBTyxNQUFNLFNBQVMsR0FBc0IsRUFBRSxDQUFDO0FBQy9DLE9BQU8sTUFBTSxVQUFVLEdBQXNCLEVBQUUsQ0FBQztBQUNoRCxPQUFPLE1BQU0sU0FBUyxHQUFzQixFQUFFLENBQUM7QUFDL0MsT0FBTyxNQUFNLE1BQU0sR0FBc0IsRUFBRSxDQUFDO0FBQzVDLE9BQU8sTUFBTSxFQUFFLEdBQXNCLEVBQUUsQ0FBQztBQUV4QyxPQUFPLE1BQU0sRUFBRSxHQUFzQixFQUFFLENBQUM7QUFDeEMsT0FBTyxNQUFNLEVBQUUsR0FBc0IsR0FBRyxDQUFDO0FBQ3pDLE9BQU8sTUFBTSxFQUFFLEdBQXNCLEdBQUcsQ0FBQztBQUN6QyxPQUFPLE1BQU0sRUFBRSxHQUFzQixHQUFHLENBQUM7QUFDekMsT0FBTyxNQUFNLEVBQUUsR0FBc0IsR0FBRyxDQUFDO0FBQ3pDLE9BQU8sTUFBTSxFQUFFLEdBQXNCLEdBQUcsQ0FBQztBQUN6QyxPQUFPLE1BQU0sRUFBRSxHQUFzQixHQUFHLENBQUM7QUFDekMsT0FBTyxNQUFNLEVBQUUsR0FBc0IsR0FBRyxDQUFDO0FBQ3pDLE9BQU8sTUFBTSxFQUFFLEdBQXNCLEdBQUcsQ0FBQztBQUV6QyxPQUFPLE1BQU0sT0FBTyxHQUFzQixHQUFHLENBQUM7QUFDOUMsT0FBTyxNQUFNLElBQUksR0FBc0IsR0FBRyxDQUFDO0FBQzNDLE9BQU8sTUFBTSxPQUFPLEdBQXNCLEdBQUcsQ0FBQztBQUM5QyxPQUFPLE1BQU0sS0FBSyxHQUFzQixHQUFHLENBQUM7QUFFNUMsT0FBTyxNQUFNLEtBQUssR0FBc0IsR0FBRyxDQUFDO0FBQzVDLE9BQU8sTUFBTSxNQUFNLEdBQXNCLEdBQUcsQ0FBQztBQUM3QyxPQUFPLE1BQU0sR0FBRyxHQUFzQixFQUFFLENBQUM7QUFFekMsNkJBQTZCLElBQVk7SUFDdkMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUM7QUFDN0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCAkRU9GID0gLypAdHMyZGFydF9jb25zdCovIDA7XG5leHBvcnQgY29uc3QgJFRBQiA9IC8qQHRzMmRhcnRfY29uc3QqLyA5O1xuZXhwb3J0IGNvbnN0ICRMRiA9IC8qQHRzMmRhcnRfY29uc3QqLyAxMDtcbmV4cG9ydCBjb25zdCAkVlRBQiA9IC8qQHRzMmRhcnRfY29uc3QqLyAxMTtcbmV4cG9ydCBjb25zdCAkRkYgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gMTI7XG5leHBvcnQgY29uc3QgJENSID0gLypAdHMyZGFydF9jb25zdCovIDEzO1xuZXhwb3J0IGNvbnN0ICRTUEFDRSA9IC8qQHRzMmRhcnRfY29uc3QqLyAzMjtcbmV4cG9ydCBjb25zdCAkQkFORyA9IC8qQHRzMmRhcnRfY29uc3QqLyAzMztcbmV4cG9ydCBjb25zdCAkRFEgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gMzQ7XG5leHBvcnQgY29uc3QgJEhBU0ggPSAvKkB0czJkYXJ0X2NvbnN0Ki8gMzU7XG5leHBvcnQgY29uc3QgJCQgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gMzY7XG5leHBvcnQgY29uc3QgJFBFUkNFTlQgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gMzc7XG5leHBvcnQgY29uc3QgJEFNUEVSU0FORCA9IC8qQHRzMmRhcnRfY29uc3QqLyAzODtcbmV4cG9ydCBjb25zdCAkU1EgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gMzk7XG5leHBvcnQgY29uc3QgJExQQVJFTiA9IC8qQHRzMmRhcnRfY29uc3QqLyA0MDtcbmV4cG9ydCBjb25zdCAkUlBBUkVOID0gLypAdHMyZGFydF9jb25zdCovIDQxO1xuZXhwb3J0IGNvbnN0ICRTVEFSID0gLypAdHMyZGFydF9jb25zdCovIDQyO1xuZXhwb3J0IGNvbnN0ICRQTFVTID0gLypAdHMyZGFydF9jb25zdCovIDQzO1xuZXhwb3J0IGNvbnN0ICRDT01NQSA9IC8qQHRzMmRhcnRfY29uc3QqLyA0NDtcbmV4cG9ydCBjb25zdCAkTUlOVVMgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gNDU7XG5leHBvcnQgY29uc3QgJFBFUklPRCA9IC8qQHRzMmRhcnRfY29uc3QqLyA0NjtcbmV4cG9ydCBjb25zdCAkU0xBU0ggPSAvKkB0czJkYXJ0X2NvbnN0Ki8gNDc7XG5leHBvcnQgY29uc3QgJENPTE9OID0gLypAdHMyZGFydF9jb25zdCovIDU4O1xuZXhwb3J0IGNvbnN0ICRTRU1JQ09MT04gPSAvKkB0czJkYXJ0X2NvbnN0Ki8gNTk7XG5leHBvcnQgY29uc3QgJExUID0gLypAdHMyZGFydF9jb25zdCovIDYwO1xuZXhwb3J0IGNvbnN0ICRFUSA9IC8qQHRzMmRhcnRfY29uc3QqLyA2MTtcbmV4cG9ydCBjb25zdCAkR1QgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gNjI7XG5leHBvcnQgY29uc3QgJFFVRVNUSU9OID0gLypAdHMyZGFydF9jb25zdCovIDYzO1xuXG5leHBvcnQgY29uc3QgJDAgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gNDg7XG5leHBvcnQgY29uc3QgJDkgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gNTc7XG5cbmV4cG9ydCBjb25zdCAkQSA9IC8qQHRzMmRhcnRfY29uc3QqLyA2NTtcbmV4cG9ydCBjb25zdCAkRSA9IC8qQHRzMmRhcnRfY29uc3QqLyA2OTtcbmV4cG9ydCBjb25zdCAkWiA9IC8qQHRzMmRhcnRfY29uc3QqLyA5MDtcblxuZXhwb3J0IGNvbnN0ICRMQlJBQ0tFVCA9IC8qQHRzMmRhcnRfY29uc3QqLyA5MTtcbmV4cG9ydCBjb25zdCAkQkFDS1NMQVNIID0gLypAdHMyZGFydF9jb25zdCovIDkyO1xuZXhwb3J0IGNvbnN0ICRSQlJBQ0tFVCA9IC8qQHRzMmRhcnRfY29uc3QqLyA5MztcbmV4cG9ydCBjb25zdCAkQ0FSRVQgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gOTQ7XG5leHBvcnQgY29uc3QgJF8gPSAvKkB0czJkYXJ0X2NvbnN0Ki8gOTU7XG5cbmV4cG9ydCBjb25zdCAkYSA9IC8qQHRzMmRhcnRfY29uc3QqLyA5NztcbmV4cG9ydCBjb25zdCAkZSA9IC8qQHRzMmRhcnRfY29uc3QqLyAxMDE7XG5leHBvcnQgY29uc3QgJGYgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gMTAyO1xuZXhwb3J0IGNvbnN0ICRuID0gLypAdHMyZGFydF9jb25zdCovIDExMDtcbmV4cG9ydCBjb25zdCAkciA9IC8qQHRzMmRhcnRfY29uc3QqLyAxMTQ7XG5leHBvcnQgY29uc3QgJHQgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gMTE2O1xuZXhwb3J0IGNvbnN0ICR1ID0gLypAdHMyZGFydF9jb25zdCovIDExNztcbmV4cG9ydCBjb25zdCAkdiA9IC8qQHRzMmRhcnRfY29uc3QqLyAxMTg7XG5leHBvcnQgY29uc3QgJHogPSAvKkB0czJkYXJ0X2NvbnN0Ki8gMTIyO1xuXG5leHBvcnQgY29uc3QgJExCUkFDRSA9IC8qQHRzMmRhcnRfY29uc3QqLyAxMjM7XG5leHBvcnQgY29uc3QgJEJBUiA9IC8qQHRzMmRhcnRfY29uc3QqLyAxMjQ7XG5leHBvcnQgY29uc3QgJFJCUkFDRSA9IC8qQHRzMmRhcnRfY29uc3QqLyAxMjU7XG5leHBvcnQgY29uc3QgJE5CU1AgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gMTYwO1xuXG5leHBvcnQgY29uc3QgJFBJUEUgPSAvKkB0czJkYXJ0X2NvbnN0Ki8gMTI0O1xuZXhwb3J0IGNvbnN0ICRUSUxEQSA9IC8qQHRzMmRhcnRfY29uc3QqLyAxMjY7XG5leHBvcnQgY29uc3QgJEFUID0gLypAdHMyZGFydF9jb25zdCovIDY0O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gKGNvZGUgPj0gJFRBQiAmJiBjb2RlIDw9ICRTUEFDRSkgfHwgKGNvZGUgPT0gJE5CU1ApO1xufVxuIl19