---
title: Variables and Assignment
teaching: 10
exercises: 10
---

## Variables and Assignment

:::{admonition} Objectives
:class: tip

- Write programs that assign scalar values to variables and perform calculations with those values.
- Correctly trace value changes in programs that use scalar assignment.

:::

:::{admonition} Questions
:class: question

- How can I store data in programs?

::::::::::::::::::::::::::::::::::::::::::::::::::

## Use variables to store values.

- **Variables** are names for values.

- Variable names
  
  - can **only** contain letters, digits, and underscore `_` (typically used to separate words in long variable names)
  - cannot start with a digit
  - are **case sensitive** (age, Age and AGE are three different variables)

- The name should also be meaningful so you or another programmer know what it is

- Variable names that start with underscores like `__alistairs_real_age` have a special meaning
  so we won't do that until we understand the convention.

- In Python the `=` symbol assigns the value on the right to the name on the left.

- The variable is created when a value is assigned to it.

- Here, Python assigns an age to a variable `age`
  and a name in quotes to a variable `first_name`.
  
  ```python
  age = 42
  first_name = 'Ahmed'
  ```

## Use `print` to display values.

- Python has a built-in function called `print` that prints things as text.
- Call the function (i.e., tell Python to run it) by using its name.
- Provide values to the function (i.e., the things to print) in parentheses.
- To add a string to the printout, wrap the string in single or double quotes.
- The values passed to the function are called **arguments**

```python
print(first_name, 'is', age, 'years old')
```

```output
Ahmed is 42 years old
```

- `print` automatically puts a single space between items to separate them.
- And wraps around to a new line at the end.

## Variables must be created before they are used.

- If a variable doesn't exist yet, or if the name has been mis-spelled,
  Python reports an error. (Unlike some languages, which "guess" a default value.)

```python
print(last_name)
```

```error
---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
<ipython-input-1-c1fbb4e96102> in <module>()
----> 1 print(last_name)

NameError: name 'last_name' is not defined
```

- The last line of an error message is usually the most informative.
- We will look at error messages in detail [later](17-scope.md#reading-error-messages).

:::::::::::::::::::::::::::::::::::::::::  callout

## Variables Persist Between Cells

Be aware that it is the *order* of execution of cells that is important in a Jupyter notebook, not the order
in which they appear. Python will remember *all* the code that was run previously, including any variables you have
defined, irrespective of the order in the notebook. Therefore if you define variables lower down the notebook and then
(re)run cells further up, those defined further down will still be present. As an example, create two cells with the
following content, in this order:

```python
print(myval)
```

```python
myval = 1
```

If you execute this in order, the first cell will give an error. However, if you run the first cell *after* the second
cell it will print out `1`. To prevent confusion, it can be helpful to use the `Kernel` -> `Restart & Run All` option which
clears the interpreter and runs everything from a clean slate going top to bottom.


::::::::::::::::::::::::::::::::::::::::::::::::::

## Variables can be used in calculations.

- We can use variables in calculations just as if they were values.
  - Remember, we assigned the value `42` to `age` a few lines ago.

```python
age = age + 3
print('Age in three years:', age)
```

```output
Age in three years: 45
```

## Use an index to get a single character from a string.

- The characters (individual letters, numbers, and so on) in a string are
  ordered. For example, the string `'AB'` is not the same as `'BA'`. Because of
  this ordering, we can treat the string as a list of characters.
- Each position in the string (first, second, etc.) is given a number. This
  number is called an **index** or sometimes a subscript.
- Indices are numbered from 0.
- Use the position's index in square brackets to get the character at that
  position.

![A line of Python code, print(atom\_name[0]), demonstrates that using the zero index will output just the initial letter, in this case 'h' for helium.](fig/2_indexing.svg)

```python
atom_name = 'helium'
print(atom_name[0])
```

```output
h
```

## Use a slice to get a substring.

- A part of a string is called a **substring**. A substring can be as short as a
  single character.
- An item in a list is called an element. Whenever we treat a string as if it
  were a list, the string's elements are its individual characters.
- A slice is a part of a string (or, more generally, a part of any list-like thing).
- We take a slice with the notation `[start:stop]`, where `start` is the integer
  index of the first element we want and `stop` is the integer index of
  the element *just after* the last element we want.
- The difference between `stop` and `start` is the slice's length.
- Taking a slice does not change the contents of the original string. Instead,
  taking a slice returns a copy of part of the original string.

```python
atom_name = 'sodium'
print(atom_name[0:3])
```

```output
sod
```

## Use the built-in function `len` to find the length of a string.

```python
print(len('helium'))
```

```output
6
```

- Nested functions are evaluated from the inside out,
  like in mathematics.

## Python is case-sensitive.

- Python thinks that upper- and lower-case letters are different,
  so `Name` and `name` are different variables.
- There are conventions for using upper-case letters at the start of variable names so we will use lower-case letters for now.

## Use meaningful variable names.

- Python doesn't care what you call variables as long as they obey the rules
  (alphanumeric characters and the underscore).

```python
flabadab = 42
ewr_422_yY = 'Ahmed'
print(ewr_422_yY, 'is', flabadab, 'years old')
```

- Use meaningful variable names to help other people understand what the program does.
- The most important "other person" is your future self.

:::::::::::::::::::::::::::::::::::::::  challenge

## Swapping Values

Fill the table showing the values of the variables in this program
*after* each statement is executed.

```python
# Command  # Value of x   # Value of y   # Value of swap #
x = 1.0    #              #              #               #
y = 3.0    #              #              #               #
swap = x   #              #              #               #
x = y      #              #              #               #
y = swap   #              #              #               #
```

:::::::::::::::  solution

## Solution

```output
# Command  # Value of x   # Value of y   # Value of swap #
x = 1.0    # 1.0          # not defined  # not defined   #
y = 3.0    # 1.0          # 3.0          # not defined   #
swap = x   # 1.0          # 3.0          # 1.0           #
x = y      # 3.0          # 3.0          # 1.0           #
y = swap   # 3.0          # 1.0          # 1.0           #
```

These three lines exchange the values in `x` and `y` using the `swap`
variable for temporary storage. This is a fairly common programming idiom.



:::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::

:::::::::::::::::::::::::::::::::::::::  challenge

## Predicting Values

What is the final value of `position` in the program below?
(Try to predict the value without running the program,
then check your prediction.)

```python
initial = 'left'
position = initial
initial = 'right'
```

:::::::::::::::  solution

## Solution

```python
print(position)
```

```output
left
```

The `initial` variable is assigned the value `'left'`.
In the second line, the `position` variable also receives
the string value `'left'`. In third line, the `initial` variable is given the
value `'right'`, but the `position` variable retains its string value
of `'left'`.



:::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::

:::::::::::::::::::::::::::::::::::::::  challenge

## Challenge

If you assign `a = 123`,
what happens if you try to get the second digit of `a` via `a[1]`?

:::::::::::::::  solution

## Solution

Numbers are not strings or sequences and Python will raise an error if you try to perform an index operation on a
number. In the [next lesson on types and type conversion](03-types-conversion.md)
we will learn more about types and how to convert between different types. If you want the Nth digit of a number you
can convert it into a string using the `str` built-in function and then perform an index operation on that string.

```python
a = 123
print(a[1])
```

```error
TypeError: 'int' object is not subscriptable
```

```python
a = str(123)
print(a[1])
```

```output
2
```

:::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::

:::::::::::::::::::::::::::::::::::::::  challenge

## Choosing a Name

Which is a better variable name, `m`, `min`, or `minutes`?
Why?
Hint: think about which code you would rather inherit
from someone who is leaving the lab:

1. `ts = m * 60 + s`
2. `tot_sec = min * 60 + sec`
3. `total_seconds = minutes * 60 + seconds`

:::::::::::::::  solution

## Solution

`minutes` is better because `min` might mean something like "minimum"
(and actually is an existing built-in function in Python that we will cover later).



:::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::

:::::::::::::::::::::::::::::::::::::::  challenge

## Slicing practice

What does the following program print?

```python
atom_name = 'carbon'
print('atom_name[1:3] is:', atom_name[1:3])
```

:::::::::::::::  solution

## Solution

```output
atom_name[1:3] is: ar
```

:::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::

:::::::::::::::::::::::::::::::::::::::  challenge

## Slicing concepts

Given the following string:

```python
species_name = "Acacia buxifolia"
```

What would these expressions return?

1. `species_name[2:8]`
2. `species_name[11:]` (without a value after the colon)
3. `species_name[:4]` (without a value before the colon)
4. `species_name[:]` (just a colon)
5. `species_name[11:-3]`
6. `species_name[-5:-3]`
7. What happens when you choose a `stop` value which is out of range? (i.e., try `species_name[0:20]` or `species_name[:103]`)

:::::::::::::::  solution

## Solutions

1. `species_name[2:8]` returns the substring `'acia b'`
2. `species_name[11:]` returns the substring `'folia'`, from position 11 until the end
3. `species_name[:4]` returns the substring `'Acac'`, from the start up to but not including position 4
4. `species_name[:]` returns the entire string `'Acacia buxifolia'`
5. `species_name[11:-3]` returns the substring `'fo'`, from the 11th position to the third last position
6. `species_name[-5:-3]` also returns the substring `'fo'`, from the fifth last position to the third last
7. If a part of the slice is out of range, the operation does not fail. `species_name[0:20]` gives the same result as `species_name[0:]`, and `species_name[:103]` gives the same result as `species_name[:]`
  
  

:::::::::::::::::::::::::

::::::::::::::::::::::::::::::::::::::::::::::::::

:::::::::::::::::::::::::::::::::::::::: keypoints

- Use variables to store values.
- Use `print` to display values.
- Variables persist between cells.
- Variables must be created before they are used.
- Variables can be used in calculations.
- Use an index to get a single character from a string.
- Use a slice to get a substring.
- Use the built-in function `len` to find the length of a string.
- Python is case-sensitive.
- Use meaningful variable names.

::::::::::::::::::::::::::::::::::::::::::::::::::

