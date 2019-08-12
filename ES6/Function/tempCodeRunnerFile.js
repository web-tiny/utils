function Fibonacci (n) {
  if (n <= 1) {
    return 1;
  } else {
    return Fibonacci(n - 1) + Fibonacci(n - 2);
  }
}
console.log(Fibonacci(10));
console.log(Fibonacci(100));
console.log(Fibonacci(500));