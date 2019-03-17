---
redirect_from:
  - "/03/1/expressions"
interact_link: content/03/1/Expressions.ipynb
kernel_name: python3
title: 'Expressions'
prev_page:
  url: /03/programming-in-python
  title: 'Programming in Python'
next_page:
  url: /03/2/Names
  title: 'Names'
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---

# 3.1 Expressions
Programming languages are much simpler than human languages. Nonetheless, there are some rules of grammar to learn in any language, and that is where we will begin. In this text, we will use the [Python](https://www.python.org/) programming language. Learning the grammar rules is essential, and the same rules used in the most basic programs are also central to more sophisticated programs.

Programs are made up of *expressions*, which describe to the computer how to combine pieces of data. For example, a multiplication expression consists of a `*` symbol between two numerical expressions. Expressions, such as `3 * 4`, are *evaluated* by the computer. The value (the result of *evaluation*) of the last expression in each cell, `12` in this case, is displayed below the cell.



{:.input_area}
```python
3 * 4
```





{:.output .output_data_text}
```
12
```



The grammar rules of a programming language are rigid. In Python, the `*` symbol cannot appear twice in a row. The computer will not try to interpret an expression that differs from its prescribed expression structures. Instead, it will show a `SyntaxError` error. The *Syntax* of a language is its set of grammar rules, and a `SyntaxError` indicates that an expression structure doesn't match any of the rules of the language.



{:.input_area}
```python
3 * * 4
```


{:.output .output_traceback_line}
```

      File "<ipython-input-4-d90564f70db7>", line 1
        3 * * 4
            ^
    SyntaxError: invalid syntax



```

Small changes to an expression can change its meaning entirely. Below, the space between the `*`'s has been removed. Because `**` appears between two numerical expressions, the expression is a well-formed *exponentiation* expression (the first number raised to the power of the second: 3 times 3 times 3 times 3). The symbols `*` and `**` are called *operators*, and the values they combine are called *operands*.



{:.input_area}
```python
3 ** 4
```





{:.output .output_data_text}
```
81
```



**Common Operators.** Data science often involves combining numerical values, and the set of operators in a programming language are designed to so that expressions can be used to express any sort of arithmetic. In Python, the following operators are essential.

| Expression Type | Operator | Example    | Value     |
|-----------------|----------|------------|-----------|
| Addition        | `+`      | `2 + 3`    | `5`       |
| Subtraction     | `-`      | `2 - 3`    | `-1`      |
| Multiplication  | `*`      | `2 * 3`    | `6`       |
| Division        | `/`      | `7 / 3`    | `2.66667` |
| Remainder       | `%`      | `7 % 3`    | `1`       |
| Exponentiation  | `**`     | `2 ** 0.5` | `1.41421` |

Python expressions obey the same familiar rules of *precedence* as in algebra: multiplication and division occur before addition and subtraction. Parentheses can be used to group together smaller expressions within a larger expression.



{:.input_area}
```python
1 + 2 * 3 * 4 * 5 / 6 ** 3 + 7 + 8 - 9 + 10
```





{:.output .output_data_text}
```
17.555555555555557
```





{:.input_area}
```python
1 + 2 * (3 * 4 * 5 / 6) ** 3 + 7 + 8 - 9 + 10
```





{:.output .output_data_text}
```
2017.0
```



This chapter introduces many types of expressions. Learning to program involves trying out everything you learn in combination, investigating the behavior of the computer. What happens if you divide by zero? What happens if you divide twice in a row? You don't always need to ask an expert (or the Internet); many of these details can be discovered by trying them out yourself. 
