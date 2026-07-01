# d-for

`d-for` repeats an element for each item in a collection. The element it is declared on
(and its children) is the template that gets rendered once per item.

```html
<ul>
    <li d-for="item in items">{{item.Name}}</li>
</ul>
```

The loop variable (`item` above) is scoped to the template and can be used in mustache
bindings (`{{item.Property}}`), in other `d-*` attributes, and in event handlers on the
repeated element.

## Iterating arrays

```html
<div d-datakey="users" d-datatype="array" d-dataurlget="~/api/users"></div>

<ul>
    <li d-for="user in users">{{user.Name}} - {{user.Email}}</li>
</ul>
```

## Iterating objects / dictionaries

```html
<tr d-for="entry in dictionary">
    <td>{{entry.Key}}</td>
    <td>{{entry.Value}}</td>
</tr>
```

## Ranges

`d-for` supports numeric ranges with the `start..end` syntax inside parentheses. The
bounds can be literals, data values, or expressions:

```html
<!-- literal range -->
<span d-for="item in (0..10)">{{item}} </span>

<!-- range from data -->
<span d-for="item in (0..{{items.Count}})">{{item}} </span>

<!-- range built from expressions (e.g. pagination windows) -->
<a d-for="index in ({{page.Current}}-{{page.Offset}}..{{page.Current}}+{{page.Offset}})">
    {{index}}
</a>
```

## Nested loops

Loops can be nested; each inner loop has access to its own item and the outer items.

```html
<table>
    <tr d-for="row in rows">
        <td d-for="cell in row">{{cell.Value}}</td>
    </tr>
</table>
```

You can also iterate a child collection of the current item:

```html
<li d-for="child in item.Children">{{child.Name}}</li>
```

## Indexed access

Collections can be addressed by index inside a path, for example iterating the children
of a specific element:

```html
<li d-for="item in data.[1].Children">{{item.Name}}</li>
```

## Placement among siblings

A `d-for` loop can be placed **anywhere** among its parent's children — it does not have
to be the last child. Two or more loops can be declared consecutively under the same
parent, and a loop may be followed by static content. Each loop renders and re-renders
only the items it produced and never disturbs its siblings:

```html
<ul>
    <!-- two consecutive loops, each independent -->
    <li d-for="a in listA">{{a.Name}}</li>
    <li d-for="b in listB">{{b.Name}}</li>
    <!-- static content after a loop is preserved -->
    <li class="footer-row">Total: {{listA.Count}}</li>
</ul>
```

## Combining with other attributes

`d-for` composes with the rest of the attribute model — conditional rendering, dynamic
classes, two-way binding, and events all work on the repeated element:

```html
<li d-for="todo in todos"
    d-if="{{todo.visible}}"
    d-class="{completed:{{todo.completed}}}">
    <input type="checkbox" d-model="{{todo.completed}}">
    <span>{{todo.text}}</span>
    <button d-on-click="RemoveDataItem(todos,todo)">Delete</button>
</li>
```

## See also

- [API reference — Control Flow](../README.md#-api-reference)
- [architecture.md](architecture.md) — where control flow is implemented
  (`DrapoControlFlow`)
