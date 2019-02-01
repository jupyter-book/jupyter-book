---
redirect_from:
  - "/03/4/introduction-to-tables"
interact_link: content/03/4/Introduction_to_Tables.ipynb
kernel_name: Python [Root]
title: 'Introduction to Tables'
prev_page:
  url: /03/3/Calls
  title: 'Call Expressions'
next_page:
  url: /04/Types
  title: 'Data Types'
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---

We can now apply Python to analyze data. We will work with data stored in Table structures.

Tables are a fundamental way of representing data sets. A table can be viewed in two ways:
* a sequence of named columns that each describe a single attribute of all entries in a data set, or
* a sequence of rows that each contain all information about a single individual in a data set.

We will study tables in great detail in the next several chapters. For now, we will just introduce a few methods without going into technical details. 

The table `cones` has been imported for us; later we will see how, but here we will just work with it. First, let's take a look at it.



{:.input_area}
```python
cones
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Flavor</th> <th>Color</th> <th>Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>strawberry</td> <td>pink       </td> <td>3.55 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>light brown</td> <td>4.75 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>dark brown </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>strawberry</td> <td>pink       </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>dark brown </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>bubblegum </td> <td>pink       </td> <td>4.75 </td>
        </tr>
    </tbody>
</table>
</div>



The table has six rows. Each row corresponds to one ice cream cone. The ice cream cones are the *individuals*.

Each cone has three attributes: flavor, color, and price. Each column contains the data on one of these attributes, and so all the entries of any single column are of the same kind. Each column has a label. We will refer to columns by their labels.

A table method is just like a function, but it must operate on a table. So the call looks like

`name_of_table.method(arguments)`

For example, if you want to see just the first two rows of a table, you can use the table method `show`.



{:.input_area}
```python
cones.show(2)
```



<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Flavor</th> <th>Color</th> <th>Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>strawberry</td> <td>pink       </td> <td>3.55 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>light brown</td> <td>4.75 </td>
        </tr>
    </tbody>
</table>
<p>... (4 rows omitted)</p>
</div>


You can replace 2 by any number of rows. If you ask for more than six, you will only get six, because `cones` only has six rows.

### Choosing Sets of Columns
The method `select` creates a new table consisting of only the specified columns.



{:.input_area}
```python
cones.select('Flavor')
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Flavor</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>strawberry</td>
        </tr>
        <tr>
            <td>chocolate </td>
        </tr>
        <tr>
            <td>chocolate </td>
        </tr>
        <tr>
            <td>strawberry</td>
        </tr>
        <tr>
            <td>chocolate </td>
        </tr>
        <tr>
            <td>bubblegum </td>
        </tr>
    </tbody>
</table>
</div>



This leaves the original table unchanged.



{:.input_area}
```python
cones
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Flavor</th> <th>Color</th> <th>Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>strawberry</td> <td>pink       </td> <td>3.55 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>light brown</td> <td>4.75 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>dark brown </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>strawberry</td> <td>pink       </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>dark brown </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>bubblegum </td> <td>pink       </td> <td>4.75 </td>
        </tr>
    </tbody>
</table>
</div>



You can select more than one column, by separating the column labels by commas.



{:.input_area}
```python
cones.select('Flavor', 'Price')
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Flavor</th> <th>Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>strawberry</td> <td>3.55 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>4.75 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>strawberry</td> <td>5.25 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>bubblegum </td> <td>4.75 </td>
        </tr>
    </tbody>
</table>
</div>



You can also *drop* columns you don't want. The table above can be created by dropping the `Color` column.



{:.input_area}
```python
cones.drop('Color')
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Flavor</th> <th>Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>strawberry</td> <td>3.55 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>4.75 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>strawberry</td> <td>5.25 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>bubblegum </td> <td>4.75 </td>
        </tr>
    </tbody>
</table>
</div>



You can name this new table and look at it again by just typing its name.



{:.input_area}
```python
no_colors = cones.drop('Color')

no_colors
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Flavor</th> <th>Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>strawberry</td> <td>3.55 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>4.75 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>strawberry</td> <td>5.25 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>bubblegum </td> <td>4.75 </td>
        </tr>
    </tbody>
</table>
</div>



Like `select`, the `drop` method creates a smaller table and leaves the original table unchanged. In order to explore your data, you can create any number of smaller tables by using choosing or dropping columns. It will do no harm to your original data table.

### Sorting Rows

The `sort` method creates a new table by arranging the rows of the original table in ascending order of the values in the specified column. Here the `cones` table has been sorted in ascending order of the price of the cones.



{:.input_area}
```python
cones.sort('Price')
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Flavor</th> <th>Color</th> <th>Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>strawberry</td> <td>pink       </td> <td>3.55 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>light brown</td> <td>4.75 </td>
        </tr>
        <tr>
            <td>bubblegum </td> <td>pink       </td> <td>4.75 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>dark brown </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>strawberry</td> <td>pink       </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>dark brown </td> <td>5.25 </td>
        </tr>
    </tbody>
</table>
</div>



To sort in descending order, you can use an *optional* argument to `sort`. As the name implies, optional arguments don't have to be used, but they can be used if you want to change the default behavior of a method. 

By default, `sort` sorts in increasing order of the values in the specified column. To sort in decreasing order, use the optional argument `descending=True`.



{:.input_area}
```python
cones.sort('Price', descending=True)
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Flavor</th> <th>Color</th> <th>Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>chocolate </td> <td>dark brown </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>strawberry</td> <td>pink       </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>dark brown </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>bubblegum </td> <td>pink       </td> <td>4.75 </td>
        </tr>
        <tr>
            <td>chocolate </td> <td>light brown</td> <td>4.75 </td>
        </tr>
        <tr>
            <td>strawberry</td> <td>pink       </td> <td>3.55 </td>
        </tr>
    </tbody>
</table>
</div>



Like `select` and `drop`, the `sort` method leaves the original table unchanged.

### Selecting Rows that Satisfy a Condition
The `where` method creates a new table consisting only of the rows that satisfy a given condition. In this section we will work with a very simple condition, which is that the value in a specified column must be equal to a value that we also specify. Thus the `where` method has two arguments.

The code in the cell below creates a table consisting only of the rows corresponding to chocolate cones.



{:.input_area}
```python
cones.where('Flavor', 'chocolate')
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Flavor</th> <th>Color</th> <th>Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>chocolate</td> <td>light brown</td> <td>4.75 </td>
        </tr>
        <tr>
            <td>chocolate</td> <td>dark brown </td> <td>5.25 </td>
        </tr>
        <tr>
            <td>chocolate</td> <td>dark brown </td> <td>5.25 </td>
        </tr>
    </tbody>
</table>
</div>



The arguments, separated by a comma, are the label of the column and the value we are looking for in that column. The `where` method can also be used when the condition that the rows must satisfy is more complicated. In those situations the call will be a little more complicated as well.

It is important to provide the value exactly. For example, if we specify `Chocolate` instead of `chocolate`, then `where` correctly finds no rows where the flavor is `Chocolate`.



{:.input_area}
```python
cones.where('Flavor', 'Chocolate')
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Flavor</th> <th>Color</th> <th>Price</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
</div>



Like all the other table methods in this section, `where` leaves the original table unchanged.

### Example: Salaries in the NBA

"The NBA is the highest paying professional sports league in the world," [reported CNN](http://edition.cnn.com/2015/12/04/sport/gallery/highest-paid-nba-players/) in March 2016. The table `nba` contains the [salaries of all National Basketball Association players](https://www.statcrunch.com/app/index.php?dataid=1843341) in 2015-2016.

Each row represents one player. The columns are:

| **Column Label**   | Description                                         |
|--------------------|-----------------------------------------------------|
| `PLAYER`           | Player's name                                       |
| `POSITION`         | Player's position on team                           |
| `TEAM`             | Team name                                           |
|`SALARY`    | Player's salary in 2015-2016, in millions of dollars|
 
The code for the positions is PG (Point Guard), SG (Shooting Guard), PF (Power Forward), SF (Small Forward), and C (Center). But what follows doesn't involve details about how basketball is played.

The first row shows that Paul Millsap, Power Forward for the Atlanta Hawks, had a salary of almost $\$18.7$ million in 2015-2016.



{:.input_area}
```python
nba
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>PLAYER</th> <th>POSITION</th> <th>TEAM</th> <th>SALARY</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Paul Millsap    </td> <td>PF      </td> <td>Atlanta Hawks</td> <td>18.6717</td>
        </tr>
        <tr>
            <td>Al Horford      </td> <td>C       </td> <td>Atlanta Hawks</td> <td>12     </td>
        </tr>
        <tr>
            <td>Tiago Splitter  </td> <td>C       </td> <td>Atlanta Hawks</td> <td>9.75625</td>
        </tr>
        <tr>
            <td>Jeff Teague     </td> <td>PG      </td> <td>Atlanta Hawks</td> <td>8      </td>
        </tr>
        <tr>
            <td>Kyle Korver     </td> <td>SG      </td> <td>Atlanta Hawks</td> <td>5.74648</td>
        </tr>
        <tr>
            <td>Thabo Sefolosha </td> <td>SF      </td> <td>Atlanta Hawks</td> <td>4      </td>
        </tr>
        <tr>
            <td>Mike Scott      </td> <td>PF      </td> <td>Atlanta Hawks</td> <td>3.33333</td>
        </tr>
        <tr>
            <td>Kent Bazemore   </td> <td>SF      </td> <td>Atlanta Hawks</td> <td>2      </td>
        </tr>
        <tr>
            <td>Dennis Schroder </td> <td>PG      </td> <td>Atlanta Hawks</td> <td>1.7634 </td>
        </tr>
        <tr>
            <td>Tim Hardaway Jr.</td> <td>SG      </td> <td>Atlanta Hawks</td> <td>1.30452</td>
        </tr>
    </tbody>
</table>
<p>... (407 rows omitted)</p>
</div>



Fans of Stephen Curry can find his row by using `where`.



{:.input_area}
```python
nba.where('PLAYER', 'Stephen Curry')
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>PLAYER</th> <th>POSITION</th> <th>TEAM</th> <th>SALARY</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Stephen Curry</td> <td>PG      </td> <td>Golden State Warriors</td> <td>11.3708</td>
        </tr>
    </tbody>
</table>
</div>



We can also create a new table called `warriors` consisting of just the data for the Golden State Warriors.



{:.input_area}
```python
warriors = nba.where('TEAM', 'Golden State Warriors')
warriors
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>PLAYER</th> <th>POSITION</th> <th>TEAM</th> <th>SALARY</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Klay Thompson    </td> <td>SG      </td> <td>Golden State Warriors</td> <td>15.501 </td>
        </tr>
        <tr>
            <td>Draymond Green   </td> <td>PF      </td> <td>Golden State Warriors</td> <td>14.2609</td>
        </tr>
        <tr>
            <td>Andrew Bogut     </td> <td>C       </td> <td>Golden State Warriors</td> <td>13.8   </td>
        </tr>
        <tr>
            <td>Andre Iguodala   </td> <td>SF      </td> <td>Golden State Warriors</td> <td>11.7105</td>
        </tr>
        <tr>
            <td>Stephen Curry    </td> <td>PG      </td> <td>Golden State Warriors</td> <td>11.3708</td>
        </tr>
        <tr>
            <td>Jason Thompson   </td> <td>PF      </td> <td>Golden State Warriors</td> <td>7.00847</td>
        </tr>
        <tr>
            <td>Shaun Livingston </td> <td>PG      </td> <td>Golden State Warriors</td> <td>5.54373</td>
        </tr>
        <tr>
            <td>Harrison Barnes  </td> <td>SF      </td> <td>Golden State Warriors</td> <td>3.8734 </td>
        </tr>
        <tr>
            <td>Marreese Speights</td> <td>C       </td> <td>Golden State Warriors</td> <td>3.815  </td>
        </tr>
        <tr>
            <td>Leandro Barbosa  </td> <td>SG      </td> <td>Golden State Warriors</td> <td>2.5    </td>
        </tr>
    </tbody>
</table>
<p>... (4 rows omitted)</p>
</div>



By default, the first 10 lines of a table are displayed. You can use `show` to display more or fewer. To display the entire table, use `show` with no argument in the parentheses.



{:.input_area}
```python
warriors.show()
```



<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>PLAYER</th> <th>POSITION</th> <th>TEAM</th> <th>SALARY</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Klay Thompson    </td> <td>SG      </td> <td>Golden State Warriors</td> <td>15.501  </td>
        </tr>
        <tr>
            <td>Draymond Green   </td> <td>PF      </td> <td>Golden State Warriors</td> <td>14.2609 </td>
        </tr>
        <tr>
            <td>Andrew Bogut     </td> <td>C       </td> <td>Golden State Warriors</td> <td>13.8    </td>
        </tr>
        <tr>
            <td>Andre Iguodala   </td> <td>SF      </td> <td>Golden State Warriors</td> <td>11.7105 </td>
        </tr>
        <tr>
            <td>Stephen Curry    </td> <td>PG      </td> <td>Golden State Warriors</td> <td>11.3708 </td>
        </tr>
        <tr>
            <td>Jason Thompson   </td> <td>PF      </td> <td>Golden State Warriors</td> <td>7.00847 </td>
        </tr>
        <tr>
            <td>Shaun Livingston </td> <td>PG      </td> <td>Golden State Warriors</td> <td>5.54373 </td>
        </tr>
        <tr>
            <td>Harrison Barnes  </td> <td>SF      </td> <td>Golden State Warriors</td> <td>3.8734  </td>
        </tr>
        <tr>
            <td>Marreese Speights</td> <td>C       </td> <td>Golden State Warriors</td> <td>3.815   </td>
        </tr>
        <tr>
            <td>Leandro Barbosa  </td> <td>SG      </td> <td>Golden State Warriors</td> <td>2.5     </td>
        </tr>
        <tr>
            <td>Festus Ezeli     </td> <td>C       </td> <td>Golden State Warriors</td> <td>2.00875 </td>
        </tr>
        <tr>
            <td>Brandon Rush     </td> <td>SF      </td> <td>Golden State Warriors</td> <td>1.27096 </td>
        </tr>
        <tr>
            <td>Kevon Looney     </td> <td>SF      </td> <td>Golden State Warriors</td> <td>1.13196 </td>
        </tr>
        <tr>
            <td>Anderson Varejao </td> <td>PF      </td> <td>Golden State Warriors</td> <td>0.289755</td>
        </tr>
    </tbody>
</table>
</div>


The `nba` table is sorted in alphabetical order of the team names. To see how the players were paid in 2015-2016, it is useful to sort the data by salary. Remember that by default, the sorting is in increasing order.



{:.input_area}
```python
nba.sort('SALARY')
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>PLAYER</th> <th>POSITION</th> <th>TEAM</th> <th>SALARY</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Thanasis Antetokounmpo</td> <td>SF      </td> <td>New York Knicks     </td> <td>0.030888</td>
        </tr>
        <tr>
            <td>Jordan McRae          </td> <td>SG      </td> <td>Phoenix Suns        </td> <td>0.049709</td>
        </tr>
        <tr>
            <td>Cory Jefferson        </td> <td>PF      </td> <td>Phoenix Suns        </td> <td>0.049709</td>
        </tr>
        <tr>
            <td>Elliot Williams       </td> <td>SG      </td> <td>Memphis Grizzlies   </td> <td>0.055722</td>
        </tr>
        <tr>
            <td>Orlando Johnson       </td> <td>SG      </td> <td>Phoenix Suns        </td> <td>0.055722</td>
        </tr>
        <tr>
            <td>Phil Pressey          </td> <td>PG      </td> <td>Phoenix Suns        </td> <td>0.055722</td>
        </tr>
        <tr>
            <td>Keith Appling         </td> <td>PG      </td> <td>Orlando Magic       </td> <td>0.061776</td>
        </tr>
        <tr>
            <td>Sean Kilpatrick       </td> <td>SG      </td> <td>Denver Nuggets      </td> <td>0.099418</td>
        </tr>
        <tr>
            <td>Erick Green           </td> <td>PG      </td> <td>Utah Jazz           </td> <td>0.099418</td>
        </tr>
        <tr>
            <td>Jeff Ayres            </td> <td>PF      </td> <td>Los Angeles Clippers</td> <td>0.111444</td>
        </tr>
    </tbody>
</table>
<p>... (407 rows omitted)</p>
</div>



These figures are somewhat difficult to compare as some of these players changed teams during the season and received salaries from more than one team; only the salary from the last team appears in the table.  

The CNN report is about the other end of the salary scale – the players who are among the highest paid in the world. To identify these players we can sort in descending order of salary and look at the top few rows.



{:.input_area}
```python
nba.sort('SALARY', descending=True)
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>PLAYER</th> <th>POSITION</th> <th>TEAM</th> <th>SALARY</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Kobe Bryant    </td> <td>SF      </td> <td>Los Angeles Lakers   </td> <td>25     </td>
        </tr>
        <tr>
            <td>Joe Johnson    </td> <td>SF      </td> <td>Brooklyn Nets        </td> <td>24.8949</td>
        </tr>
        <tr>
            <td>LeBron James   </td> <td>SF      </td> <td>Cleveland Cavaliers  </td> <td>22.9705</td>
        </tr>
        <tr>
            <td>Carmelo Anthony</td> <td>SF      </td> <td>New York Knicks      </td> <td>22.875 </td>
        </tr>
        <tr>
            <td>Dwight Howard  </td> <td>C       </td> <td>Houston Rockets      </td> <td>22.3594</td>
        </tr>
        <tr>
            <td>Chris Bosh     </td> <td>PF      </td> <td>Miami Heat           </td> <td>22.1927</td>
        </tr>
        <tr>
            <td>Chris Paul     </td> <td>PG      </td> <td>Los Angeles Clippers </td> <td>21.4687</td>
        </tr>
        <tr>
            <td>Kevin Durant   </td> <td>SF      </td> <td>Oklahoma City Thunder</td> <td>20.1586</td>
        </tr>
        <tr>
            <td>Derrick Rose   </td> <td>PG      </td> <td>Chicago Bulls        </td> <td>20.0931</td>
        </tr>
        <tr>
            <td>Dwyane Wade    </td> <td>SG      </td> <td>Miami Heat           </td> <td>20     </td>
        </tr>
    </tbody>
</table>
<p>... (407 rows omitted)</p>
</div>



Kobe Bryant, since retired, was the highest earning NBA player in 2015-2016.
