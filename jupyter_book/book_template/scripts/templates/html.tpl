{% extends 'basic.tpl' %}

<!-- Remove input cells if they're empty -->
{% block input %}
{%- if cell.source != '' %}
{{- super() -}}
{% endif %}
{% endblock input %}