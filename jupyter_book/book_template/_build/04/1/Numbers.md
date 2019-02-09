---
redirect_from:
  - "/04/1/numbers"
interact_link: content/04/1/Numbers.ipynb
kernel_name: Python [Root]
title: 'Numbers'
prev_page:
  url: /04/Types
  title: 'Data Types'
next_page:
  url: /04/2/Strings
  title: 'Strings'
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---

Computers are designed to perform numerical calculations, but there are some important details about working with numbers that every programmer working with quantitative data should know. Python (and most other programming languages) distinguishes between two different types of numbers:

* Integers are called `int` values in the Python language. They can only represent whole numbers (negative, zero, or positive) that don't have a fractional component
* Real numbers are called `float` values (or *floating point values*) in the Python language. They can represent whole or fractional numbers but have some limitations.

The type of a number is evident from the way it is displayed: `int` values have no decimal point and `float` values always have a decimal point. 



{:.input_area}
```python
# Some int values
2
```





{:.output .output_data_text}
```
2
```





{:.input_area}
```python
1 + 3
```





{:.output .output_data_text}
```
4
```





{:.input_area}
```python
-1234567890000000000
```





{:.output .output_data_text}
```
-1234567890000000000
```





{:.input_area}
```python
# Some float values
1.2
```





{:.output .output_data_text}
```
1.2
```





{:.input_area}
```python
3.0
```





{:.output .output_data_text}
```
3.0
```



When a `float` value is combined with an `int` value using some arithmetic operator, then the result is always a `float` value. In most cases, two integers combine to form another integer, but any number (`int` or `float`) divided by another will be a `float` value. Very large or very small `float` values are displayed using scientific notation.



{:.input_area}
```python
1.5 + 2
```





{:.output .output_data_text}
```
3.5
```





{:.input_area}
```python
3 / 1
```





{:.output .output_data_text}
```
3.0
```





{:.input_area}
```python
-12345678900000000000.0
```





{:.output .output_data_text}
```
-1.23456789e+19
```



The `type` function can be used to find the type of any number.



{:.input_area}
```python
type(3)
```





{:.output .output_data_text}
```
int
```





{:.input_area}
```python
type(3 / 1)
```





{:.output .output_data_text}
```
float
```



The `type` of an expression is the type of its final value. So, the `type` function will never indicate that the type of an expression is a name, because names are always evaluated to their assigned values.



{:.input_area}
```python
x = 3
type(x) # The type of x is an int, not a name
```





{:.output .output_data_text}
```
int
```





{:.input_area}
```python
type(x + 2.5)
```





{:.output .output_data_text}
```
float
```



## More About Float Values

Float values are very flexible, but they do have limits. 

1. A `float` can represent extremely large and extremely small numbers. There are limits, but you will rarely encounter them.
2. A `float` only represents 15 or 16 significant digits for any number; the remaining precision is lost. This limited precision is enough for the vast majority of applications.
3. After combining `float` values with arithmetic, the last few digits may be incorrect. Small rounding errors are often confusing when first encountered.

The first limit can be observed in two ways. If the result of a computation is a very large number, then it is represented as infinite. If the result is a very small number, then it is represented as zero.



{:.input_area}
```python
2e306 * 10
```





{:.output .output_data_text}
```
2e+307
```





{:.input_area}
```python
2e306 * 100
```





{:.output .output_data_text}
```
inf
```





{:.input_area}
```python
2e-322 / 10
```





{:.output .output_data_text}
```
2e-323
```





{:.input_area}
```python
2e-322 / 100
```





{:.output .output_data_text}
```
0.0
```



The second limit can be observed by an expression that involves numbers with more than 15 significant digits. These extra digits are discarded before any arithmetic is carried out.



{:.input_area}
```python
0.6666666666666666 - 0.6666666666666666123456789
```





{:.output .output_data_text}
```
0.0
```



The third limit can be observed when taking the difference between two expressions that should be equivalent. For example, the expression `2 ** 0.5` computes the square root of 2, but squaring this value does not exactly recover 2.



{:.input_area}
```python
2 ** 0.5
```





{:.output .output_data_text}
```
1.4142135623730951
```





{:.input_area}
```python
(2 ** 0.5) * (2 ** 0.5)
```





{:.output .output_data_text}
```
2.0000000000000004
```





{:.input_area}
```python
(2 ** 0.5) * (2 ** 0.5) - 2
```





{:.output .output_data_text}
```
4.440892098500626e-16
```



The final result above is `0.0000000000000004440892098500626`, a number that is very close to zero. The correct answer to this arithmetic expression is 0, but a small error in the final significant digit appears very different in scientific notation. This behavior appears in almost all programming languages because it is the result of the standard way that arithmetic is carried out on computers. 

Although `float` values are not always exact, they are certainly reliable and work the same way across all different kinds of computers and programming languages. 
