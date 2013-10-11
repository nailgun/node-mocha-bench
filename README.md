mocha-bench
===========

*mocha.js helpers for benchmarking*

Some rules:

1. You NEED to call 'measure'.
2. You NEED to call 'stop' passed from 'measure'.
3. You MAY pass finalization function to second argument of
   'measure'. In that case you MUST call 'done' in finalization
   function.
4. You MAY call 'stop' or 'done' with argument it there is
   error.
